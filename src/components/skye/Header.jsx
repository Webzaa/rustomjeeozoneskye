import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const logoImg = (process.env.PUBLIC_URL || "") + "/images/logo.png";

const NAV = [
  { id: "manifesto", label: "Manifesto" },
  { id: "residences", label: "Residences" },
  { id: "sky-clubhouse", label: "Sky Clubhouse" },
  { id: "location", label: "Location" },
  { id: "gallery", label: "Gallery" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const jump = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 });
    else el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.header data-testid="skye-header"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5, ease: [0.77, 0, 0.18, 1] }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${open
        ? "bg-[#dce4ea] border-b border-black/5 shadow-sm"
        : scrolled
          ? "backdrop-blur-xl bg-black/50 border-b border-white/10 shadow-lg"
          : "bg-[#dce4ea]"
      }`}>
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10 h-[60px] sm:h-[68px] flex items-center justify-between gap-3">
        <button onClick={() => jump("top")} data-testid="skye-header-logo" className="flex items-center gap-1.5 sm:gap-2 group min-w-0 shrink">
          <img src={logoImg} alt="Rustomjee Ozone Skye" className={`h-8 sm:h-10 w-auto object-contain transition-all ${scrolled && !open ? "brightness-0 invert" : ""}`} />
        </button>
        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => jump(n.id)} data-testid={`nav-${n.id}`} className={`text-[12px] tracking-[0.18em] uppercase transition-colors link-underline ${scrolled ? "text-white/80 hover:text-white" : "text-[color:var(--skye-ink)]/80 hover:text-[color:var(--skye-ink)]"}`}>
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden lg:block">
            <button data-testid="cta-book-site-visit-header" onClick={() => window.openEnquiryModal ? window.openEnquiryModal("Book a Site Visit") : jump("enquiry")} className={`skye-btn ${scrolled ? "!bg-[#597dae] !text-white hover:!bg-[#486996]" : ""}`}>
              <span className="arrow-dot" />Book a Site Visit
            </button>
          </div>
          <button data-testid="menu-toggle" onClick={() => setOpen((v) => !v)} className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]" aria-label="Menu">
            <span className={`block h-[1px] w-6 transition-all ${open ? "bg-[color:var(--skye-ink)] translate-y-[3px] rotate-45" : scrolled ? "bg-white" : "bg-[color:var(--skye-ink)]"}`} />
            <span className={`block h-[1px] w-6 transition-all ${open ? "bg-[color:var(--skye-ink)] -translate-y-[3px] -rotate-45" : scrolled ? "bg-white" : "bg-[color:var(--skye-ink)]"}`} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.77, 0, 0.18, 1] }} className="lg:hidden overflow-hidden bg-[#dce4ea] border-t border-black/10 shadow-xl" data-testid="mobile-menu">
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => jump(n.id)} className="text-left font-sans text-xl text-[color:var(--skye-ink)] hover:text-[color:var(--skye-ochre-deep)] transition-colors" data-testid={`mnav-${n.id}`} >{n.label}</button>
              ))}
              <button onClick={() => { setOpen(false); if (window.openEnquiryModal) window.openEnquiryModal("Book a Site Visit"); else jump("enquiry"); }} className="skye-btn self-start mt-3" data-testid="cta-book-site-visit-mobile">
                <span className="arrow-dot" /> Book a Site Visit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
