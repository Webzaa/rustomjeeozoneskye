import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      const doc = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(y > window.innerHeight * 0.7 && y < doc - 400);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const jump = () => {
    if (window.openEnquiryModal) {
      window.openEnquiryModal("Book a Site Visit");
    } else {
      const el = document.getElementById("enquiry");
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -40 });
      else el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }} onClick={jump} data-testid="sticky-book-site-visit" className="fixed z-30 bottom-4 right-4 sm:bottom-6 sm:right-6 skye-btn shadow-[0_18px_50px_rgba(10,17,40,0.35)]">
          <span className="arrow-dot" /> Book a Site Visit
        </motion.button>
      )}
    </AnimatePresence>
  );
}
