// ───────────────────────────────
// Contact Server Action
// 역할: Contact 폼 데이터 받아서 Resend로 이메일 전송
// ───────────────────────────────
"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // 빈 값 체크
  if (!name || !email || !message) {
    return {
      success: false,
      message: "모든 항목을 입력해라, 인간.",
    };
  }

  try {
    await resend.emails.send({
      from: "Z-cat Blog <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `[Z-cat 관찰 보고서] ${name}의 메시지`,
      html: `
        <p><strong>보낸 이:</strong> ${name}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>내용:</strong></p>
        <p>${message}</p>
      `,
    });

    return {
      success: true,
      message: "전송 완료. 메시지를 보냈다.",
    };
  } catch (error: unknown) {
    // 한도 초과 에러 분기
    // resend 에러는 타입 에러로 한번의 처리가 어려워 하나하나 확인해야함
    if (
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      (error as { statusCode: number }).statusCode === 429
    ) {
      return {
        success: false,
        message: "편지 할당량 초과. 이 정도 인기는 예상 못 했다, 집사야.",
      };
    }

    return {
      success: false,
      message: "[ERROR] 전송 실패. 집사 탓이다.",
    };
  }
}
