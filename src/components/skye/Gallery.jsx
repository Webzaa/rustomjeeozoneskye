import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const gallery1Img = (process.env.PUBLIC_URL || "") + "/images/gallery/01.webp";
const gallery2Img = (process.env.PUBLIC_URL || "") + "/images/gallery/02.webp";
const gallery4Img = (process.env.PUBLIC_URL || "") + "/images/gallery/03.webp";
const gallery5Img = (process.env.PUBLIC_URL || "") + "/images/gallery/04.webp";
const gallery6Img = (process.env.PUBLIC_URL || "") + "/images/gallery/06.webp";


const TILES = [
  { src: gallery1Img, span: "col-span-12 md:col-span-8 md:row-span-2", h: "h-[280px] sm:h-[400px] md:h-[520px]", caption: "Actual View", type: "Shot At Location" },
  { src: gallery2Img, span: "col-span-6 sm:col-span-6 md:col-span-4 md:row-span-1", h: "h-[200px] sm:h-[220px] md:h-[250px]", caption: "Elevation", type: "Artist's Impression" },
  { src: gallery4Img, span: "col-span-6 sm:col-span-6 md:col-span-4 md:row-span-1", h: "h-[200px] sm:h-[230px] md:h-[260px]", caption: "Grand Entrance Plaza", type: "Artist's Impression" },
  { src: gallery5Img, span: "col-span-12 sm:col-span-6 md:col-span-5 md:row-span-1", h: "h-[240px] sm:h-[300px] md:h-[380px]", caption: "Yoga Deck", type: "Artist's Impression" },
  { src: gallery6Img, span: "col-span-12 sm:col-span-6 md:col-span-7 md:row-span-1", h: "h-[240px] sm:h-[300px] md:h-[380px]", caption: "Gymnasium", type: "Artist's Impression" },
];

export default function Gallery() {
  const ref = useRef(null);
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

  const y1Desktop = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2Desktop = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y1Mobile = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const y2Mobile = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  const y1 = isMobile ? y1Mobile : y1Desktop;
  const y2 = isMobile ? y2Mobile : y2Desktop;

  return (
    <section id="gallery" ref={ref} data-testid="gallery-section" className="relative bg-[#d7dfe5] py-14 sm:py-18 md:py-20">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="eyebrow mb-4">06 — Gallery</div>
            <h2 className="font-display text-[color:var(--skye-ink)] leading-[1.22] sm:leading-[1.15] tracking-tighter text-[32px] sm:text-[34px] md:text-[42px] lg:text-[52px]">Some of Mumbai’s most loved addresses.<span className="italic text-[color:var(--skye-sky-3)]"> <br /> Home to generations of memories.</span></h2>
          </div>
          {/* <div className="font-sans text-sm text-[color:var(--skye-muted)] max-w-[340px]">Photography from a Rustomjee property and representative interiors. Renders indicative.</div> */}
        </div>
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {TILES.map((t, i) => (
            <div key={i} className={`${t.span}`} data-testid={`gallery-tile-${i}`}>
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 1, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }} className={`relative overflow-hidden group rounded-sm ${t.h}`}>
                <motion.img style={{ y: i % 2 === 0 ? y1 : y2 }} src={t.src} alt="" className="absolute inset-x-0 -top-[15%] w-full h-[130%] object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"/>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-1 right-2 sm:bottom-2 sm:right-3 text-[8px] sm:text-[9px] tracking-widest text-white/80 font-sans z-10 pointer-events-none">
                  {t.type}
                </span>
                <div className="absolute bottom-4 left-3 right-3 sm:left-4 sm:right-4 flex items-end justify-between text-white z-10">
                  <span className="eyebrow !text-white opacity-95 drop-shadow-sm !text-[9px] sm:!text-[11px] max-w-[70%]">{t.caption}</span>
                  <span className="numeral text-xl sm:text-2xl !text-white opacity-95 drop-shadow-sm pb-1 sm:pb-0">0{i + 1}</span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
