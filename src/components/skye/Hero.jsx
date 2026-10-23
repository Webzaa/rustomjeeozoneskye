import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const HeroDesktop = process.env.PUBLIC_URL + "/images/slider/desktop23-09-26.webp";
const HeroMobile = process.env.PUBLIC_URL + "/images/slider/mobile23-09-26.webp";
const QRImage = process.env.PUBLIC_URL + "/images/qr.png";
export default function Hero() {
  const [isMahaReraOpen, setIsMahaReraOpen] = useState(false);
  const { scrollY } = useScroll();

  const skyY = useTransform(
    scrollY,
    [0, 900],
    [0, 100]
  );

  const overlayOpacity = useTransform(
    scrollY,
    [0, 500],
    [0.35, 0.6]
  );

  return (
    <section id="top" data-testid="hero-section" className="relative mt-[61px] w-full overflow-hidden bg-[color:var(--skye-ink)] lg:mt-[69px]">
      <div className="relative w-full">
        <motion.img src={HeroDesktop} alt="Rustomjee Ozone Skye" style={{ y: skyY }} className="hidden w-full h-auto lg:block" />
        <motion.img src={HeroMobile} alt="Rustomjee Ozone Skye" style={{ y: skyY }} className="block w-full h-auto lg:hidden" />
        {/* ================= MAHARERA BUTTON ================= */}
        <button type="button" onClick={() => setIsMahaReraOpen(true)} className="absolute top-0 right-0 z-8 cursor-pointer bg-[#33333363] px-[17px] py-3 text-[12px] font-normal text-white backdrop-blur-[40px] transition-all duration-300 hover:bg-[#33333390]">
          MAHARERA DETAILS
        </button>

        {/* ================= MAHARERA PANEL ================= */}
        <AnimatePresence>
          {isMahaReraOpen && (
            <motion.div 
            // initial={{ opacity: 0,y: 40,scale: 0.95,}}
            //   animate={{ opacity: 1,y: 0,scale: 1,}}
            //   exit={{ opacity: 0,y: 40,scale: 0.95,}}
              // transition={{ duration: 5,ease: "easeOut",}}
              className="absolute top-0 right-0 z-[9] h-[284px] w-[236px] bg-[#4b4b4b79] px-5 py-[30px] text-center text-white backdrop-blur-[40px] max-md:top-[0] max-md:left-0 max-md:right-auto max-md:h-[290px] max-md:w-full max-md:bg-[#05050579]" >
              <button type="button" onClick={() => setIsMahaReraOpen(false)} className="absolute right-[15px] top-0 z-10 cursor-pointer border-0 bg-transparent p-0 text-[24px] leading-none text-white" aria-label="Close MahaRERA details"> × </button>
              <h4 className="m-0 p-0 text-[12px] font-normal text-white">RUSTOMJEE OZONE SKYE</h4>
              <div className="relative mt-[7px] overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15,
                    duration: 0.35,
                  }} >
                  <img src={QRImage} alt="Rustomjee Ozone Skye MahaRERA QR Code" className="mx-auto mt-[15px] w-[100px] bg-white p-1" />
                  <p className="m-1 pt-[5px] text-[10px] leading-5 text-white">
                    <span className="text-[11px] uppercase leading-5 block">RERA registration number</span>
                    PR1170002501979
                    <br /> Rustomjee Ozone Skye
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}