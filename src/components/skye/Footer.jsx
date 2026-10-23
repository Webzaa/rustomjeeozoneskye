import React from "react";
import { Link } from "react-router-dom";

const qrImg = (process.env.PUBLIC_URL || "") + "/images/qr.png";

export default function Footer() {
  return (
    <>
        <div className="fixed bottom-0 left-0 right-0 z-[99] block bg-white shadow-[0_-3px_15px_rgba(0,0,0,0.15)] md:hidden">
        <button onClick={() => { if (window.openEnquiryModal) { window.openEnquiryModal("Enquire Now"); } }} className="skye-btn-footer skye-btn-shine flex w-full items-center justify-center" data-testid="cta-enquire-now-mobile">
          {/* <span className="arrow-dot animate-pulse z-10" /> */}
          <span className="relative z-10">Book a Site Visit </span>
        </button>
    </div>

      <footer data-testid="skye-footer" className="relative bg-[#d8e0e6] text-[color:var(--skye-ink)] pt-10 sm:pt-14 pb-6 sm:pb-8 overflow-hidden border-t border-black/5">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-12 gap-6 lg:gap-12 items-center border-t border-black/10 pt-6 sm:pt-8">
            <div className="col-span-12 lg:col-span-9 order-2 lg:order-1">
              <div className="eyebrow mb-3">Disclaimer</div>
              <p className="font-sans text-[11px] sm:text-xs leading-[1.7] text-[color:var(--skye-muted)]">
               This brochure does not constitute an offer and/or acceptance and/or contract and/or agreement and/or transaction and/or any intention thereof and/or a disclosure under any statute of any nature whatsoever. The pictorial/other representations herein are merely creative imagination and an Architect’s impression and are only indicative, actual product may vary/differ from what is indicated herein. The photographs contained herein are actual photos from site and/or stock/standard photography and/or rendered images which have been modified and/or enhanced and/or touched up/airbrushed for display and marketing purposes and are used to indicate a conceptual lifestyle. The view showed in some of the pictures are not the actual aerial views from the site. The connectivity map is a selective representation of certain elements present/that may be present in and around the Project. The landmarks/locations/existing infrastructure/upcoming infrastructure may be subject to change from time to time. No representation or warranty is made or intended as to the accuracy or completeness of information under this brochure or as to its suitability or adequacy for any purpose. The furniture, fixtures, fittings and other features depicted in the flats/unit/s in this brochure are only indicative and are used to demonstrate the possible layout of the unit/s and the same, do not form part of the offering. Minor variations (+/- 3%) or as may be prescribed under applicable laws, in actual carpet areas may occur as a result of design/construction variances/finishing tolerances and column projections. Before making a decision to purchase, you are requested to independently, either directly or through your legal/financial consultants, thoroughly verify all details/documents pertaining to the respective project as available on <a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noreferrer" className="text-[color:var(--skye-ochre-deep)] underline hover:opacity-80 transition-opacity">
                  maharera.mahaonline.gov.in
                </a>. The project is mortgaged and financed by ICICI Bank LTD. 
              </p>
            </div>
            <div className="col-span-12 lg:col-span-3 order-1 lg:order-2 flex flex-col items-center justify-center text-center self-center my-auto">
              <div className="font-sans text-[12px] leading-[1.7] text-[color:var(--skye-muted)] flex flex-col items-center text-center gap-1">
                <img src={qrImg} alt="MahaRERA QR Code" className="w-28 h-28 sm:w-32 sm:h-32 object-contain bg-white p-1.5 rounded-sm border border-black/10 mb-1.5 lg:mb-3 mx-auto shadow-sm"/>
                <div className="font-medium text-[color:var(--skye-ink)] text-center text-xs">MahaRERA · PR1180002601227</div>
                <a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noreferrer" className="text-[11px] font-medium text-[color:var(--skye-ochre-deep)] hover:underline block tracking-wider text-center">maharera.mahaonline.gov.in</a>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="eyebrow text-[color:var(--skye-muted)]">© {new Date().getFullYear()} Rustomjee Group · Crafted for the sky</div>
            <div className="flex items-center gap-6 eyebrow text-[color:var(--skye-muted)] uppercase">
              <Link to="/privacy-policy" id="privacy-policy" className="hover:text-[color:var(--skye-ink)] transition-colors uppercase">PRIVACY</Link>
              <Link to="/terms-conditions" id="terms-conditions" className="hover:text-[color:var(--skye-ink)] transition-colors uppercase">TERMS &amp; CONDITIONS</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}