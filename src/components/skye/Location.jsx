import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMAGES } from "./images";

const locationMapImg = (process.env.PUBLIC_URL || "") + "/images/location-map.jpg";

const ROADWAYS_LEFT = [
  { label: "Goregaon-Mulund Link Road (GMLR)", value: "15–20 mins" },
  { label: "Versova-Dahisar Coastal Road (VDCR)", value: "7–10 mins" },
  { label: "Western Express Highway (WEH)", value: "12–15 mins" },
];

const ROADWAYS_RIGHT = [
  { label: "JVLR (Jogeshwari-Vikhroli Link Road)", value: "10–12 mins" },
  { label: "Eastern Express Highway (EEH)", value: "35–55 mins" },
  { label: "Proposed Airoli-Katai Naka Freeway", value: "25–30 mins" },
];

const RAIL_METRO_LEFT = [
  { label: "Goregaon Railway Station", value: "8–10 mins" },
  { label: "Andheri Railway Station", value: "16–28 mins" },
  { label: "Borivali Railway Station", value: "25–30 mins" },
];

const RAIL_METRO_RIGHT = [
  { label: "Metro Line 2A (DNH)", value: "5–8 mins" },
  { label: "Proposed Metro Line 6", value: "Upcoming" },
  { label: "Upcoming Connectivity (Lokhandwala-Vikhroli)", value: "Upcoming" },
];

const AIRPORTS_LEFT = [
  { label: "Domestic", value: "18–35 mins" },
  { label: "International", value: "22–40 mins" },
];

const AIRPORTS_RIGHT = [
  { label: "Proposed Navi Mumbai International Airport", value: "1 Hr 30 mins" },
];

const LANDMARKS = [
  "Infiniti Mall",
  "Orbit Mall",
  "Oshiwara District Centre",
  "S.V. Road",
  "New Link Road",
  "Veer Savarkar Flyover",
];

export default function Location() {
  const [activeSection, setActiveSection] = React.useState("roadways");
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const mapY = useTransform(scrollYProgress, [0, 1], [35, -35]);

  const toggleSection = (key) => {
    setActiveSection((prev) => (prev === key ? null : key));
  };

  return (
    <section id="location" ref={sectionRef} data-testid="location-section" className="relative bg-[color:var(--skye-paper)] py-14 sm:py-18 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-end mb-10 sm:mb-14 md:mb-20">
          <div className="col-span-12 lg:col-span-4">
            <div className="eyebrow mb-4">05 — Location</div>
            <p className="font-sans text-sm text-[color:var(--skye-muted)] max-w-[400px]">
              From schools and business hubs to hospitals, shopping and
              entertainment, everything your family needs is close at hand.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <h2 className="font-display text-[color:var(--skye-ink)] leading-[1.22] sm:leading-[1.15] tracking-tight text-[32px] sm:text-[34px] md:text-[42px] lg:text-[52px]">
              <span className="text-[color:var(--skye-ink)]">
                When the commute
                <br />
                shrinks,
              </span>{" "}
              <span className="italic text-[color:var(--skye-sky-3)]">
                life expands.
              </span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between">
            <motion.div style={{ y: mapY }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }} className="relative overflow-hidden aspect-[16/12] bg-[color:var(--skye-ink)] rounded-sm">
              <img src={locationMapImg} alt="Rustomjee Ozone Skye Location Map" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--skye-ink)]/70 via-[color:var(--skye-ink)]/20 to-transparent" />
              <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 90 }} className="absolute left-[46%] top-[38%]">
              </motion.div>
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-[color:var(--skye-paper)]/90">
                <div className="eyebrow text-xs">Goregaon West · MMR</div>
              </div>
            </motion.div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="mb-10">
              <button onClick={() => toggleSection("roadways")} className="w-full flex items-center justify-between text-left eyebrow text-[color:var(--skye-ochre-deep)] pb-3 border-b border-black/15 mb-3 font-semibold hover:opacity-80 transition cursor-pointer">
                <span>ROADWAYS</span>
                <span className="text-xs transition-transform duration-300">
                  {activeSection === "roadways" ? "▲" : "▼"}
                </span>
              </button>
              {activeSection === "roadways" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-1 gap-x-8">
                  <div>
                    {ROADWAYS_LEFT.map((r) => (
                      <div key={r.label} className="flex items-baseline justify-between gap-2 sm:gap-4 py-3 border-b border-black/5 font-sans">
                        <span className="text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] text-[color:var(--skye-ink)]/80 truncate">
                          {r.label}
                        </span>
                        <span className="text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-semibold text-[color:var(--skye-ochre-deep)] shrink-0 ml-1 sm:ml-2 whitespace-nowrap">
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div>
                    {ROADWAYS_RIGHT.map((r) => (
                      <div
                        key={r.label}
                        className="flex items-baseline justify-between gap-2 sm:gap-4 py-3 border-b border-black/5 font-sans"
                      >
                        <span className="text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] text-[color:var(--skye-ink)]/80 truncate">
                          {r.label}
                        </span>
                        <span className="text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-semibold text-[color:var(--skye-ochre-deep)] shrink-0 ml-1 sm:ml-2 whitespace-nowrap">
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* RAIL & METRO */}
            <div className="mb-10">
              <button
                onClick={() => toggleSection("rail_metro")}
                className="w-full flex items-center justify-between text-left eyebrow text-[color:var(--skye-ochre-deep)] pb-3 border-b border-black/15 mb-3 font-semibold hover:opacity-80 transition cursor-pointer"
              >
                <span>RAIL &amp; METRO</span>
                <span className="text-xs transition-transform duration-300">
                  {activeSection === "rail_metro" ? "▲" : "▼"}
                </span>
              </button>
              {activeSection === "rail_metro" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-1 gap-x-8"
                >
                  <div>
                    {RAIL_METRO_LEFT.map((r) => (
                      <div
                        key={r.label}
                        className="flex items-baseline justify-between gap-2 sm:gap-4 py-3 border-b border-black/5 font-sans"
                      >
                        <span className="text-[12px] sm:text-[13px] md:text-[14px] text-[color:var(--skye-ink)]/80 truncate">
                          {r.label}
                        </span>
                        <span className="text-[12px] sm:text-[13px] md:text-[14px] font-semibold text-[color:var(--skye-ochre-deep)] shrink-0 ml-2 whitespace-nowrap">
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div>
                    {RAIL_METRO_RIGHT.map((r) => (
                      <div
                        key={r.label}
                        className="flex items-baseline justify-between gap-2 sm:gap-4 py-3 border-b border-black/5 font-sans"
                      >
                        <span className="text-[12px] sm:text-[13px] md:text-[14px] text-[color:var(--skye-ink)]/80 truncate">
                          {r.label}
                        </span>
                        <span className="text-[12px] sm:text-[13px] md:text-[14px] font-semibold text-[color:var(--skye-ochre-deep)] shrink-0 ml-2 whitespace-nowrap">
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* AIRPORTS */}
            <div>
              <button
                onClick={() => toggleSection("airports")}
                className="w-full flex items-center justify-between text-left eyebrow text-[color:var(--skye-ochre-deep)] pb-3 border-b border-black/15 mb-3 font-semibold hover:opacity-80 transition cursor-pointer"
              >
                <span>AIRPORTS</span>
                <span className="text-xs transition-transform duration-300">
                  {activeSection === "airports" ? "▲" : "▼"}
                </span>
              </button>
              {activeSection === "airports" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-1 gap-x-8"
                >
                  <div>
                    {AIRPORTS_LEFT.map((r) => (
                      <div
                        key={r.label}
                        className="flex items-baseline justify-between gap-2 sm:gap-4 py-3 border-b border-black/5 font-sans"
                      >
                        <span className="text-[12px] sm:text-[13px] md:text-[14px] text-[color:var(--skye-ink)]/80 truncate">
                          {r.label}
                        </span>
                        <span className="text-[12px] sm:text-[13px] md:text-[14px] font-semibold text-[color:var(--skye-ochre-deep)] shrink-0 ml-2 whitespace-nowrap">
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div>
                    {AIRPORTS_RIGHT.map((r) => (
                      <div
                        key={r.label}
                        className="flex items-baseline justify-between gap-2 sm:gap-4 py-3 border-b border-black/5 font-sans"
                      >
                        <span className="text-[12px] sm:text-[13px] md:text-[14px] text-[color:var(--skye-ink)]/80 truncate">
                          {r.label}
                        </span>
                        <span className="text-[12px] sm:text-[13px] md:text-[14px] font-semibold text-[color:var(--skye-ochre-deep)] shrink-0 ml-2 whitespace-nowrap">
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            {/* <div className="mt-8">
              <div className="eyebrow mb-4">Nearby Landmarks</div>
              <div className="flex flex-wrap gap-2">
                {LANDMARKS.map((l) => (
                  <span
                    key={l}
                    className="px-4 py-2 border border-black/15 rounded-full text-[12px] tracking-wide font-sans text-[color:var(--skye-ink)]/80 hover:bg-[color:var(--skye-ink)] hover:text-[color:var(--skye-paper)] transition"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div> */}
          </div>


        </div>
      </div>
    </section>
  );
}

