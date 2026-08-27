import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMAGES } from "./images";
const amenitieImg = (process.env.PUBLIC_URL || "") + "/images/amenities.webp";
const AMENITIES = [
  { n: "01", name: "Gymnasium", floor: "49", axis: "wellness" },
  { n: "02", name: "Indoor Games", floor: "49", axis: "leisure" },
  { n: "03", name: "Banquet Hall", floor: "49", axis: "gather" },
  { n: "04", name: "Outdoor Fitness Deck", floor: "49", axis: "wellness" },
  { n: "05", name: "Outdoor Theatre", floor: "50", axis: "leisure" },
  { n: "06", name: "Event Seating", floor: "50", axis: "gather" },
  { n: "07", name: "Play Area", floor: "GF", axis: "arrival" },
  { n: "08", name: "Walking Track", floor: "GF", axis: "arrival" },
  { n: "09", name: "Lush Greenery", floor: "PODIUM", axis: "nature" },
];

export default function SkyClubhouse() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const imgYDesktop = useTransform(scrollYProgress, [0, 1], [-65, 65]);
  const imgYMobile = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const imgY = isMobile ? imgYMobile : imgYDesktop;

  return (
    <section ref={ref} id="sky-clubhouse" data-testid="sky-clubhouse-section" className="relative bg-[#d8e0e6] text-[color:var(--skye-ink)] overflow-hidden py-14 sm:py-18 md:py-20">
      <div className="grain absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-end mb-10 sm:mb-16 md:mb-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }} className="col-span-12 lg:col-span-6">
            <div className="eyebrow text-[color:var(--skye-ochre-deep)] mb-4">
              04 — Sky Clubhouse
            </div>
            <h2 className="font-display leading-[1.22] sm:leading-[1.15] tracking-tighter text-[32px] sm:text-[44px] md:text-[52px] lg:text-[52px] text-[color:var(--skye-ink)]">
              Amenities that live{" "}
              <span className="italic text-[color:var(--skye-ochre-deep)]">
                closer to the clouds.
              </span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, delay: 0.15 }} className="col-span-12 lg:col-span-5 lg:col-start-8">
            <p className="font-sans text-[14px] sm:text-[15px] leading-[1.75] text-[color:var(--skye-ink)]/70 max-w-[420px]">
              Floors 49 &amp; 50 are given entirely to living well — a sky-clubhouse of ten amenities that begin at the treetops and end where the horizon does.
            </p>
          </motion.div>
        </div>
        {/* Featured image + list */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-6 relative">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }} className="relative overflow-hidden w-full h-[320px] sm:h-[450px] lg:h-[680px] rounded-sm shadow-xl">
              <motion.img style={{ y: imgY }} src={amenitieImg} alt="Indoor Games" className="absolute inset-x-0 -top-[15%] w-full h-[130%] object-cover will-change-transform" />
              <div className="absolute inset-0 spotlight pointer-events-none" />
              <span className="absolute bottom-1 right-2 sm:bottom-2 sm:right-3 text-[8px] sm:text-[10px] tracking-widest text-white/80 font-sans z-10 pointer-events-none">Artist's Impression</span>
              <div className="absolute bottom-5 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between text-white z-10">
                <div>
                  <div className="eyebrow text-[color:var(--skye-sky-2)] mb-2">Featured</div>
                  <div className="font-display italic text-2xl sm:text-3xl">Indoor Games</div>
                </div>
                {/* <div className="numeral text-3xl sm:text-4xl pb-1 sm:pb-0">49 / 50</div> */}
              </div>
            </motion.div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <ul className="divide-y divide-[color:var(--skye-ink)]/15 border-t border-[color:var(--skye-ink)]/15">
              {AMENITIES.map((a, i) => (
                <motion.li key={a.n} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.7, delay: i * 0.05, ease: [0.19, 1, 0.22, 1], }} data-testid={`amenity-${a.n}`} className="group flex items-center justify-between gap-2 sm:gap-5 py-3.5 sm:py-5 relative">
                  <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1 pr-1 sm:pr-2">
                    <span className="numeral text-xl sm:text-2xl text-[color:var(--skye-ochre-deep)] w-6 sm:w-8 shrink-0">{a.n}</span>
                    <span className="font-display text-[13px] xs:text-[15px] sm:text-2xl md:text-2xl tracking-tight text-[color:var(--skye-ink)] group-hover:italic transition-all truncate">{a.name}</span>
                  </div>
                  <span className="font-sans text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-wider text-[color:var(--skye-ink)]/60 whitespace-nowrap shrink-0 ml-1.5">Floor {a.floor}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
