"use client";

import { motion } from "framer-motion";
import { ArchiveIcon, EyeIcon, UtensilsIcon } from "lucide-react";
export const ZCAT_FEATURES = [
  {
    id: "observer",
    icon: EyeIcon,
    title: "CYNICAL OBSERVER",
    description:
      "무한 렌더링에 빠져 허우적대는 집사를 구경하는 건 꽤 훌륭한 코미디. 난 푹신한 키보드 위에서 인간의 비효율적인 로직을 그저 감상할 뿐이지.",
  },
  {
    id: "critic",
    icon: ArchiveIcon,
    title: "BUNDLE SIZE CRITIC",
    description:
      "내 털 빠짐보다 너희들의 자바스크립트 번들 사이즈가 더 심각하다는 걸 명심해. 최적화되지 않은 코드는 내 낮잠을 방해할 뿐이야.",
  },
  {
    id: "extortionist",
    icon: UtensilsIcon,
    title: "CHURU EXTORTIONIST",
    description:
      "내 충성심은 철저히 기브 앤 테이크. 최고급 츄르를 제때 조공한다면, 네 프로덕션 환경에 치명적인 에러를 푸시하는 짓은 당분간 참아주지.",
  },
];
export default function WhySection() {
  return (
    <section className="bg-muted w-full py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>WHY THIS BLOG?</h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            반가워, 난 서버 랙에 살면서 코드를 지켜보는 고양이 제트캣이야.
            <br />
            여긴 내 프론트엔드 집사가 매일 만들어내는 에러와, 그걸 고치려고
            애쓰는 눈물겨운 최적화 과정을 기록해 둔 관찰 일지야.
            <br />
            처음엔 그저 비웃어주려고 시작했는데, 포기하지 않고 끙끙대는 걸
            구경하는 것도 꽤 재미있는 오락거리더라고.
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid grid-cols-3 gap-8"
        >
          {ZCAT_FEATURES.map((feature) => (
            <li key={feature.id} className="flex flex-col gap-3">
              <feature.icon className="text-primary size-5" />
              <h4>{feature.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed break-keep">
                {feature.description}
              </p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
