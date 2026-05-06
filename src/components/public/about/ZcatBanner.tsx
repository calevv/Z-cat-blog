"use client";

import { useRef } from "react";
import { easeInOut, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ZcatBanner() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "center center"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["70%", "100%"], {
    ease: easeInOut,
  });

  const borderRadius = useTransform(scrollYProgress, [0, 1], ["24px", "0px"], {
    ease: easeInOut,
  });

  return (
    <div
      ref={ref}
      className="relative flex w-full justify-center overflow-hidden"
    >
      <motion.section
        style={{ width, borderRadius }}
        className="bg-primary flex flex-col items-center justify-center overflow-hidden py-8"
      >
        <p className="font-space text-primary-foreground/60 text-xs tracking-widest uppercase">
          [ Z-CAT ]
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <Image
            src="/about-hero-zcat.png"
            alt="Z-cat"
            width={512}
            height={624}
            className="my-8 h-auto w-lg object-contain"
            priority
          />
        </motion.div>
        <div className="flex gap-4">
          <Link
            href="/diary"
            className="bg-primary-foreground text-primary font-space rounded px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-opacity hover:opacity-90"
          >
            ARCHIVES
          </Link>
          <Link
            href="/contact"
            className="border-primary-foreground/40 text-primary-foreground font-space rounded border px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors hover:bg-white/10"
          >
            CONNECT
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
