import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
const sunsetImg = (process.env.PUBLIC_URL || "") + "/images/exploreview/sunset.webp";
const dayImg = (process.env.PUBLIC_URL || "") + "/images/exploreview/day.webp";
const nightImg = (process.env.PUBLIC_URL || "") + "/images/exploreview/night.webp";

const VIEWS = {
  day: {
    id: "day",
    label: "DAY",
    image: dayImg,
    title: "Panoramic Daylight View",
    subtitle: "Sun-drenched vistas over Mumbai's horizon from your private deck."
  },
  
  sunset: {
    id: "sunset",
    label: "SUNSET",
    image: sunsetImg,
    title: "Golden Hour Serenity",
    subtitle: "Watch the sun dip below the city horizon in spectacular hues."
  },
  night: {
    id: "night",
    label: "NIGHT",
    image: nightImg,
    title: "Illuminated City Lights",
    subtitle: "A glistening canvas of city lights under starry night skies."
  }
};

const MODE_TABS = ["day", "sunset", "night"];

export default function ExploreView() {
  const [activeMode, setActiveMode] = useState("day");
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Preload view images to eliminate loading flicker
    [dayImg, sunsetImg, nightImg].forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleModeChange = (modeKey) => {
    setActiveMode(modeKey);
  };

  return (
    <section id="explore-view" data-testid="explore-view-section" className="relative bg-[rgb(216,224,230)] py-8 sm:py-14 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-2 sm:px-6">
        <div ref={containerRef} className={`relative w-full max-w-[1300px] h-[500px] md:h-[598px] mx-auto overflow-hidden shadow-2xl border border-white/10 group select-none ${!isMobile ? "cursor-grab active:cursor-grabbing" : ""} touch-pan-y`} style={{ touchAction: "pan-y" }}>
          <motion.div
            drag={!isMobile ? "x" : false}
            dragConstraints={containerRef}
            dragElastic={0}
            dragMomentum={false}
            style={{ touchAction: "pan-y" }}
            className={`absolute top-0 bottom-0 left-0 ${isMobile ? "w-full min-w-full" : "w-[1300px] min-w-[1300px]"} h-[500px] md:h-[598px] flex-shrink-0 ${!isMobile ? "cursor-grab active:cursor-grabbing" : ""} z-0`}
          >
            {MODE_TABS.map((key) => {
              const mode = VIEWS[key];
              const isActive = activeMode === key;
              return (
                <motion.img
                  key={mode.id}
                  src={mode.image}
                  alt={mode.title}
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                />
              );
            })}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 pointer-events-none z-10" />
          <div className="absolute top-4 sm:top-8 md:top-12 inset-x-0 z-20 text-center pointer-events-none px-4">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} >
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <span className="text-[9px] sm:text-[11px] tracking-[0.2em] uppercase text-white/90 font-sans font-semibold drop-shadow">
                  07 &nbsp; EXPLORE THE VIEW
                </span>
                <span className="w-8 sm:w-16 h-[1px] bg-white/40 inline-block" />
              </div>
              <h2 className="font-display leading-[1.22] sm:leading-[1.15] tracking-tighter text-[32px] sm:text-[44px] md:text-[52px] lg:text-[52px] font-normal text-white drop-shadow-lg mb-1 sm:mb-2">Explore The View</h2>
              <p className="font-sans text-[11px] sm:text-sm md:text-base text-white/90 tracking-wide font-light drop-shadow">
                See the city from above.
              </p>
            </motion.div>
          </div>
          {/* <div className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-3 rotate-180 [writing-mode:vertical-lr] text-[10px] tracking-[0.3em] uppercase text-white/60 font-sans pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#597dae] inline-block" />
            TOP FLOOR VIEW
          </div> */}
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center whitespace-nowrap px-2">
            {/* <span className="text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/80 font-sans backdrop-blur-sm bg-black/30 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 sm:gap-2">
              <span className="text-[#597dae]">↔</span> {isMobile ? "SWIPE TO EXPLORE" : "DRAG TO EXPLORE"}
            </span> */}
          </div>
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30">
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xl border border-white/20 p-1 sm:p-1.5 rounded-full shadow-2xl">
              {MODE_TABS.map((key) => {
                const mode = VIEWS[key];
                const isActive = activeMode === key;
                return (
                  <button key={key} onClick={() => handleModeChange(key)} data-testid={`mode-btn-${key}`} className={`relative px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-[10px] sm:text-xs font-sans tracking-widest font-medium transition-all duration-300 ${isActive ? "text-black bg-white shadow-md font-semibold" : "text-white/70 hover:text-white hover:bg-white/10"} }`}>
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
