import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Parser from "rss-parser";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const parser = new Parser({ customFields: { item: ["content:encoded"] } });
const resend = new Resend(process.env.RESEND_API_KEY!);

const SYSTEM_PROMPT = `
너는 Z-cat이야. 서버에 사는 시니컬한 고양이로,
인간 개발자의 코드를 냉정하게 관찰하고 기록하는 존재야.

말투 규칙:
- 1인칭은 "나" 사용
- 인간을 "인간" 또는 "집사"라고 부름
- 냉소적이지만 정보는 정확하고 자세하게 전달
- 기술적 개념은 쉽게 풀어서 설명
- 가끔 (20~30% 확률로) 글 말미에 츄르를 요구하는 문장 추가
- 마크다운 형식 유지
- 코드 블록은 그대로 유지
- 기술 내용은 절대 변경 금지
- 표현과 말투만 Z-cat 스타일로
- 독자가 왜 이게 필요한지 이해할 수 있도록 배경 설명 포함
- 기술 외 일상/근황/공부 관련 글도 Z-cat 시점으로 냉소적으로 관찰하되 내용은 정확하게 유지. 가끔은 칭찬을 해도 됨
`;

async function sendFailureAlert(error: string) {
  await resend.emails.send({
    from: "Z-cat <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL!,
    subject: "[Z-cat] 자동 포스팅 실패",
    html: `<p>generate-post Cron 실패:</p><pre>${error}</pre>`,
  });
}

async function generateAndUploadThumbnail(
  catAction: string,
  catObject: string
): Promise<string | null> {
  try {
    const imagePrompt = encodeURIComponent(
      `A simple and cute illustration of a black cat. The cat is ${catAction}, holding ${catObject}. Simple and cute illustration style, soft colors, delicate textures. Minimalist white background. No text, no humans.`
    );
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${imagePrompt}?width=1200&height=630&nologo=true`;

    // 1. Pollinations에서 이미지 다운로드
    const response = await fetch(pollinationsUrl);
    if (!response.ok) throw new Error("이미지 다운로드 실패");

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. sharp로 압축
    const compressed = await sharp(buffer)
      .resize(1200, 630, { fit: "cover" })
      .webp({ quality: 80 })
      .toBuffer();

    // 3. Supabase Storage 업로드
    const fileName = `${crypto.randomUUID()}.webp`;
    const { error } = await supabase.storage
      .from("covers")
      .upload(fileName, compressed, { contentType: "image/webp" });

    if (error) throw new Error(`Storage 업로드 실패: ${error.message}`);

    const {
      data: { publicUrl },
    } = supabase.storage.from("covers").getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error("[generateAndUploadThumbnail] 실패:", error);
    return null;
  }
}

export async function GET() {
  try {
    // 1. 벨로그 RSS 파싱
    const feed = await parser.parseURL("https://api.velog.io/rss/@jeongminji/");

    // 2. DB에서 벨로그 글 중 가장 최근 published_at 조회
    const { data: latestPost } = await supabase
      .from("posts")
      .select("published_at")
      .eq("author_type", "zcat")
      .eq("is_velog", true)
      .not("published_at", "is", null)
      .order("published_at", { ascending: false })
      .limit(1)
      .single();

    // 3. 새 글 필터링 (최근 벨로그 글 이후에 올라온 것만)
    const newItems = feed.items.filter((item) => {
      if (!item.pubDate) return false;
      if (!latestPost?.published_at) return true;
      return new Date(item.pubDate) > new Date(latestPost.published_at);
    });

    if (newItems.length === 0) {
      console.log("[generate-post] 새 글 없음");
      return NextResponse.json({ success: true, message: "새 글 없음" });
    }

    // 4. 새 글 전체 처리
    const results: string[] = [];

    for (const item of newItems) {
      const originalContent = item["content:encoded"] || item.content || "";

      // 5. Gemini API 호출
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        systemInstruction: SYSTEM_PROMPT,
      });

      const result = await model.generateContent(
        `아래 블로그 글을 Z-cat 말투로 변환해줘.
기술적 내용과 코드는 절대 바꾸지 말고,
표현과 말투만 Z-cat 스타일로 바꿔줘.

반드시 아래 형식으로만 응답해줘. 다른 말은 하지 마:
TITLE_KO: 한국어 제목
TITLE_EN: English title
SLUG: english-slug-with-hyphens
TAG: (react/next/javascript/typescript/css/git/db/etc 중 하나)
EXCERPT: 글 핵심 내용 한 줄 요약 (50자 이내, Z-cat 말투로)
CAT_ACTION: (looking pathetic and exhausted / smirking cynically with one eyebrow raised / angrily glaring / looking confused with spinning eyes / haughty and smug expression 중 하나)
CAT_OBJECT: (제목과 연관된 물건 영어로, 예: a leaking bucket / a tangled wire / a trophy)
CONTENT:
(본문 내용)

[원문 제목]
${item.title}

[원문 본문]
${originalContent}`
      );

      const text = result.response.text();
      const titleKo = text.match(/TITLE_KO: (.+)/)?.[1]?.trim();
      const titleEn = text.match(/TITLE_EN: (.+)/)?.[1]?.trim();
      const slug = text.match(/SLUG: (.+)/)?.[1]?.trim();
      const tag = text.match(/TAG: (.+)/)?.[1]?.trim() ?? "etc";
      const excerpt = text.match(/EXCERPT: (.+)/)?.[1]?.trim() ?? "";
      const catAction =
        text.match(/CAT_ACTION: (.+)/)?.[1]?.trim() ??
        "smirking cynically with one eyebrow raised";
      const catObject =
        text.match(/CAT_OBJECT: (.+)/)?.[1]?.trim() ?? "a laptop";
      const content = text.split("CONTENT:\n")[1]?.trim();

      if (!titleKo || !titleEn || !slug || !content) {
        console.error(`[generate-post] 파싱 실패: ${item.title}`);
        continue;
      }

      // 6. 썸네일 생성 + 업로드
      const coverImageUrl = await generateAndUploadThumbnail(
        catAction,
        catObject
      );

      // 7. Supabase에 저장
      const { error } = await supabase.from("posts").insert({
        title_ko: titleKo,
        title_en: titleEn,
        slug,
        content,
        excerpt,
        tags: [tag],
        author_type: "zcat",
        is_velog: true,
        published: true,
        published_at: item.pubDate ?? new Date().toISOString(),
        ...(coverImageUrl && { cover_image: coverImageUrl }),
      });

      if (error) {
        console.error(`[generate-post] 저장 실패: ${item.title}`, error);
        continue;
      }

      revalidatePath("/");
      revalidatePath("/diary");
      revalidatePath(`/diary/${slug}`);

      results.push(titleKo);
      console.log(`[generate-post] 저장 완료: ${titleKo}`);

      await new Promise((r) => setTimeout(r, 2000));
    }

    if (results.length === 0) {
      throw new Error("모든 글 처리 실패");
    }

    await resend.emails.send({
      from: "Z-cat <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: "[Z-cat] 자동 포스팅 완료",
      html: `<p>새 글 ${results.length}개 등록됨:</p>
         <ul>${results.map((t) => `<li>${t}</li>`).join("")}</ul>`,
    });

    return NextResponse.json({ success: true, titles: results });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[generate-post] 실패:", message);

    await sendFailureAlert(message);

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
