"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HeroSection() {
  return (
    <section className="bg-background w-full py-20">
      <div className="mx-auto flex max-w-6xl items-end justify-between px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="font-heading text-6xl leading-14 font-bold text-zinc-900"
        >
          <motion.span variants={item} className="block">
            A developer's
          </motion.span>
          <motion.span variants={item} className="block">
            errors,
          </motion.span>
          <motion.span variants={item} className="block">
            archived by
          </motion.span>
          <motion.span variants={item} className="block text-orange-700">
            a cat.
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="font-serif text-sm leading-6 font-normal text-zinc-500"
        >
          당신의 코드는 Z-cat의 감시 하에 있습니다.
          <br />
          모든 버그와 실수는 기록되며, 비웃음의 대상이 됩니다.
          <p className="font-space text-xs leading-4 font-normal tracking-widest text-orange-700 uppercase">
            [OBSERVATION_ACTIVE]
          </p>
        </motion.div>
      </div>
    </section>
  );
}
