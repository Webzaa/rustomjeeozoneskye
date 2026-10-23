import React from "react";
import { motion } from "framer-motion";

export default function LegacyStrip() {
  return (
    <section data-testid="legacy-strip" className="relative bg-[color:var(--skye-paper)] py-10 sm:py-14 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }} className="col-span-12 lg:col-span-3 flex flex-col justify-between pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-black/10 pb-8 lg:pb-0">
            <div>
              <div className="eyebrow text-[color:var(--skye-sky-3)] mb-4">The Legacy</div>
              <div className="numeral text-[48px] sm:text-[64px] md:text-[76px] lg:text-[85px] leading-none text-[color:var(--skye-sky-3)] select-none">
                1996
              </div>
            </div>
            <div className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-[color:var(--skye-muted)]">
              Three decades of luxury real estate in Mumbai.
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.1, delay: 0.1, ease: [0.19, 1, 0.22, 1] }} className="col-span-12 lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 border-black/10 pb-8 lg:pb-0">
            <div className="my-auto flex items-center justify-center">
              <h2 className="font-display text-[color:var(--skye-ink)] leading-[1.22] sm:leading-[1.15] text-[26px] sm:text-[30px] md:text-[32px] lg:text-[32px] tracking-tight text-center">
                Three decades of thinking about family.
                <br />
                One legacy of{" "}
                <span className="italic text-[color:var(--skye-sky-3)]">
                  thoughtful living.
                </span>
              </h2>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, delay: 0.2, ease: [0.19, 1, 0.22, 1] }} className="col-span-12 lg:col-span-4 flex flex-col justify-center">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-5 sm:gap-y-1 font-sans">
              <LegacyLine k="Years" v="30+" />
              <LegacyLine k="Happy Families" v="19,000+" />
              <LegacyLine k="Sq. Ft. Delivered" v="29+mn" />
              <LegacyLine k="Sq. Ft. In The Pipeline" v="46+mn" />
            </div>
          </motion.div>
        </div>
        <div className="hairline mt-8 lg:mt-10" />
      </div>
    </section>
  );
}

const LegacyLine = ({ k, v }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-1 sm:gap-4 border-b border-black/10 pb-3 sm:pb-4">
    <span className="eyebrow text-[color:var(--skye-muted)] text-[8.5px] min-[380px]:text-[10px] sm:text-xs md:text-sm font-medium tracking-wider sm:tracking-[0.2em] leading-tight">{k}</span>
    <span className="font-display text-[color:var(--skye-sky-3)] text-[20px] sm:text-[22px] md:text-[26px] leading-none select-none font-normal mt-0.5 sm:mt-0">{v}</span>
  </div>
);




