import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const residences = (process.env.PUBLIC_URL || "") + "/images/residences.webp";


const RESIDENCES = [
  {
    key: "2bhk",
    numeral: "II",
    subtitle: "BHK Residences",
  },
  {
    key: "3bhk",
    numeral: "III",
    subtitle: "BHK Residences",
  },
];

export default function Configurations() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const imgYDesktop = useTransform(scrollYProgress, [0, 1], [-65, 65]);
  const imgYMobile = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const imgY = isMobile ? imgYMobile : imgYDesktop;

  return (
    <section id="residences" ref={ref} data-testid="configurations-section" className="relative bg-[color:var(--skye-paper)] py-14 sm:py-18 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-end mb-10 sm:mb-14 md:mb-20">
          <div className="col-span-12 lg:col-span-5">
            <div className="eyebrow mb-4">03 — Residences</div>
            <p className="font-sans text-sm text-[color:var(--skye-muted)] max-w-[450px]"> Two configurations. Both engineered by Mivan precision, dressed in natural marble and lit by the sky. </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <h2 className="font-display text-[color:var(--skye-ink)] leading-[1.22] sm:leading-[1.15] tracking-tighter text-[32px] sm:text-[34px] md:text-[44px] lg:text-[52px]"> Two <span className="italic text-[color:var(--skye-sky-3)]">layouts. <br /> </span> One infinite <span className="italic text-[color:var(--skye-sky-3)]">horizon.</span></h2>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="col-span-12 lg:col-span-5 relative">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }} className="relative overflow-hidden aspect-[4/3] rounded-sm shadow-xl">
              <motion.img style={{ y: imgY }} src={residences} alt="Residences" className="absolute inset-x-0 -top-[15%] w-full h-[130%] object-cover" />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/20 to-transparent" />
              <span className="absolute bottom-2 right-3 text-[9px] sm:text-[10px] tracking-widest text-white/90 font-sans z-10 pointer-events-none">AI Generated | Representational Image</span>
              <div className="absolute top-6 left-6 eyebrow !text-white drop-shadow-md z-10">Residences</div>
            </motion.div>
          </div>
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between items-center lg:items-start">
            <div className="w-full grid grid-cols-2 gap-2 sm:gap-8 mb-8 sm:mb-14">
              {RESIDENCES.map((res) => (
                <div key={res.key} className="flex flex-col items-center text-center justify-center px-1">
                  <div className="numeral text-[40px] sm:text-[76px] md:text-[90px] leading-[0.9] text-[color:var(--skye-sky-3)]">
                    {res.numeral}
                  </div>
                  <div className="font-sans text-[10px] xs:text-[11px] sm:text-lg uppercase text-[color:var(--skye-muted)] font-medium tracking-wider sm:tracking-widest mt-1.5 sm:mt-3 leading-tight">
                    {res.subtitle}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 sm:pt-4 w-full flex justify-center">
              <button
                onClick={() => {
                  if (window.openEnquiryModal) {
                    window.openEnquiryModal("Request Floor Plan");
                  } else {
                    const el = document.getElementById("enquiry");
                    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -40 });
                    else el?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                data-testid="config-cta-common" id="request-floor-plan" className="skye-btn">
                <span className="arrow-dot" />Request Floor Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
