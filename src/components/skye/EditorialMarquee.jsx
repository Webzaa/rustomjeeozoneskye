import React from "react";
import { motion } from "framer-motion";

export default function EditorialMarquee() {
  return (
    <section data-testid="editorial-marquee" className="relative pt-12 sm:py-16 md:py-0 bg-[color:var(--skye-bg)] overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10 mt-8 sm:mt-10 md:mt-12">
        <div className="grid grid-cols-12 gap-6 items-center pb-8">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow  text-[color:var(--skye-ochre-deep)]">— Boman Rustom Irani</div>
            <div className="font-sans text-[color:var(--skye-muted)] text-base sm:text-lg">Chairman & Managing Director, Rustomjee</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <p className="font-sans text-[color:var(--skye-muted)] text-xl sm:text-2xl md:text-[1.8rem] leading-relaxed">
              “The true measure of a home is:
              how often it brings family together.”
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
