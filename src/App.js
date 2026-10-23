import { useEffect, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import OzoneSkye from "@/pages/OzoneSkye";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import ThankYou from "@/pages/ThankYou";
import { captureMarketingParams } from "@/lib/marketing";
import { Toaster } from "@/components/ui/sonner";
// -----------------------------------------
// gtm connection in call page and home page 
// ----------------------------------------- 
function GTMPageTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "page_view",
      page_path: pathname,
      page_title: document.title,
    });

    console.log("GTM Page View:", pathname);
  }, [pathname]);

  return null;
}
// -----------------------------------------

// ----------------------------------------- 
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
      window.__lenis.resize();
    }

    const t1 = setTimeout(() => {
      window.scrollTo(0, 0);
      if (window.__lenis) {
        window.__lenis.resize();
      }
      window.dispatchEvent(new Event("scroll"));
      window.dispatchEvent(new Event("resize"));
    }, 50);

    const t2 = setTimeout(() => {
      if (window.__lenis) {
        window.__lenis.resize();
      }
      window.dispatchEvent(new Event("scroll"));
    }, 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    captureMarketingParams();
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) =>
        Math.min(
          1,
          1.001 - Math.pow(2, -10 * t)
        ),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.3,
    });

    lenisRef.current = lenis;

    let raf;

    function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
      <GTMPageTracker />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<OzoneSkye />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center" richColors={false} />
    </div>
  );
}

export default App;