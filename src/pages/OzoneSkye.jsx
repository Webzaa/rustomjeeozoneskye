import React from "react";
import Header from "@/components/skye/Header";
import Hero from "@/components/skye/Hero";
import LegacyStrip from "@/components/skye/LegacyStrip";
import Manifesto from "@/components/skye/Manifesto";
import Configurations from "@/components/skye/Configurations";
import SkyClubhouse from "@/components/skye/SkyClubhouse";
import EditorialMarquee from "@/components/skye/EditorialMarquee";
import Location from "@/components/skye/Location";
import Specifications from "@/components/skye/Specifications";
import Gallery from "@/components/skye/Gallery";
import EnquiryForm from "@/components/skye/EnquiryForm";
import Footer from "@/components/skye/Footer";
import StickyCTA from "@/components/skye/StickyCTA";
import EnquiryModal from "@/components/skye/EnquiryModal";

export default function OzoneSkye() {
  return (
    <main data-testid="ozone-skye-landing" className="relative">
      <Header />
      <Hero />
      <LegacyStrip />
      <EditorialMarquee />
      <Manifesto />
      <Configurations />
      <SkyClubhouse />
      <Location />
      <Specifications />
      <Gallery />
      <EnquiryForm />
      <Footer />
      <StickyCTA />
      <EnquiryModal />
    </main>
  );
}
