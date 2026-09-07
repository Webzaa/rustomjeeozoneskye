import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMAGES } from "./images";
const chapter1Img = (process.env.PUBLIC_URL || "") + "/images/chapter/01.webp";
const chapter2Img = (process.env.PUBLIC_URL || "") + "/images/chapter/02.webp";


const CHAPTERS = [
  {
    n: "01",
    label: "The Landmark",
    heading: (
      <>
        Built around the best part of your day.{" "}
        <span className="italic text-[color:var(--skye-sky-3)]">
          Coming back home to family.
        </span>
      </>
    ),
    body:
      "The city will always move fast. But home should move at the pace of the people you love. Welcome to a landmark designed around both.",
    image: chapter1Img,
    tag: "Panoramic City Views",
    type: "Shot at a Rustomjee Property",
  },
  {
    n: "02",
    label: "The Address",
    heading: (
      <>
        Fifty storeys up.{" "}
        <span className="italic text-[color:var(--skye-ochre-deep)]">
          Countless family memories ahead.
        </span>
      </>
    ),
    body:
      "Some landmarks transform a skyline. The rare ones transform the way people live. Rising nearly fifty storeys above Goregaon West, Ozone Skye combines expansive residences, breathtaking views and a rooftop lifestyle unlike anything else in the neighbourhood. A thoughtfully designed address where family life feels fuller.",
    image: chapter2Img,
    tag: "Fifty Storey Landmark Tower",
    type: "AI Generated | Representational Image",
    highlights: [
      { k: "50 STOREY", v: "LANDMARK TOWER" },
      { k: "DOUBLE HEIGHT", v: "LOBBY" },
      { k: "2 & 3 BED", v: "RESIDENCES" },
      { k: "MULTILEVEL AMENITIES", v: "49TH & 50TH FLOORS" },
      { k: "GRAND ENTRANCE", v: "PLAZA" },
    ],
  },
];

const Chapter = ({ chapter, index }) => {
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

  const yDesktop = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imgYDesktop = useTransform(scrollYProgress, [0, 1], [-65, 65]);
  const yMobile = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const imgYMobile = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const y = isMobile ? yMobile : yDesktop;
  const imgY = isMobile ? imgYMobile : imgYDesktop;
  const reversed = index % 2 === 1;

  return (
    <div ref={ref} className="relative py-4 sm:py-12 md:pt-20" data-testid={`manifesto-chapter-${chapter.n}`}>
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10">
        <div className={`grid grid-cols-12 gap-8 lg:gap-12 items-center ${reversed ? "lg:[direction:rtl]" : ""}`}>
          <div className={`col-span-12 lg:col-span-7 relative ${reversed ? "lg:[direction:ltr]" : ""}`}>
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }} className="relative overflow-hidden rounded-sm w-full h-[280px] sm:h-[420px] lg:h-[640px] shadow-lg">
              <motion.img style={{ y: imgY }} src={chapter.image} alt="" className="absolute inset-x-0 -top-[15%] w-full h-[130%] object-cover will-change-transform" />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <span className="absolute bottom-1 right-2 sm:bottom-2 sm:right-3 text-[8px] sm:text-[10px] tracking-widest text-white/80 font-sans z-10 pointer-events-none">{chapter.type || "Artist's Impression"}</span>
              <div className="absolute bottom-5 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between text-white z-10">
                <span className="eyebrow !text-white drop-shadow-sm !text-[9px] sm:!text-[11px] tracking-[0.14em] sm:tracking-[0.16em] max-w-[65%] sm:max-w-none">{chapter.tag}</span>
                <span className="numeral text-2xl sm:text-3xl !text-white drop-shadow-sm pb-1 sm:pb-0">
                  0{index + 1}
                </span>
              </div>
            </motion.div>
          </div>
          <motion.div style={{ y }} className={`col-span-12 lg:col-span-5 ${reversed ? "lg:[direction:ltr]" : ""}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="numeral text-[54px] sm:text-[80px] md:text-[100px] leading-[0.8] text-[color:var(--skye-ochre)]/80">
                {chapter.n}
              </div>
              <div className="flex-1">
                <div className="eyebrow">Chapter {chapter.n}</div>
                <div className="font-sans text-sm text-[color:var(--skye-muted)]">
                  {chapter.label}
                </div>
              </div>
            </div>
            <h3 className="font-display text-[color:var(--skye-ink)] leading-[1.22] sm:leading-[1.15] tracking-tighter text-[28px] sm:text-[36px] md:text-[52px]">{chapter.heading}</h3>
            <p className="mt-5 sm:mt-8 font-sans text-[14px] sm:text-[15px] leading-[1.75] text-[color:var(--skye-muted)] max-w-[440px]">{chapter.body}</p>
            {chapter.highlights && (
              <div className="mt-8 pt-6 border-t border-black/10 grid grid-cols-2 gap-x-3 xs:gap-x-6 gap-y-4 font-sans max-w-[460px]">
                {chapter.highlights.map((h, idx) => (
                  <div key={idx} className="border-b border-black/5 pb-2">
                    <div className="eyebrow !text-[9px] xs:!text-[10px] sm:!text-[11px] text-[color:var(--skye-muted)] font-medium tracking-[0.12em] sm:tracking-[0.16em] break-words">{h.k}</div>
                    {h.v ? (
                      <div className="font-sans text-[11px] xs:text-xs sm:text-[13px] text-[color:var(--skye-ink)] uppercase font-semibold tracking-wide mt-0.5 break-words">{h.v}</div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-10 h-px w-16 bg-[color:var(--skye-ink)]/40" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default function Manifesto() {
  return (
    <section id="manifesto" data-testid="manifesto-section" className="relative bg-[color:var(--skye-bg)] pt-6 pb-4 sm:py-18 md:pt-20 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-6 md:px-10 pt-8 sm:pt-10 md:pt-12">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-3 my-auto">
            <div className="eyebrow mb-4">The Manifesto</div>
            <div className="font-sans text-[color:var(--skye-muted)] text-base sm:text-lg">
              Two chapters on how the sky changes  what home means.
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <h2 className="font-display text-[color:var(--skye-ink)] tracking-tighter leading-[1.22] sm:leading-[1.15] text-[32px] sm:text-[34px] md:text-[44px] lg:text-[52px]">
              The next chapter of a Goregaon success story. {" "}
              <span className="italic text-[color:var(--skye-sky-3)]">Thoughtfully written for your family.</span>
            </h2>
          </div>
        </div>
        <div className="hairline mt-14" />
      </div>
      {CHAPTERS.map((c, i) => (
        <Chapter key={c.n} chapter={c} index={i} />
      ))}
    </section>
  );
}
