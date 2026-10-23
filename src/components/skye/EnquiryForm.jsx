<<<<<<< HEAD
import React, { useRef, useState } from "react";
=======
import React, { useState } from "react";
>>>>>>> 1351584ad7b6009b0d9656a989636f49d17e4a4c
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import PhoneInput from "react-phone-input-2";
import { getMarketingData } from "@/lib/marketing";
<<<<<<< HEAD
import { FORMS, pushLeadSubmitted, useLeadFormTracking } from "@/lib/moengage";
=======
>>>>>>> 1351584ad7b6009b0d9656a989636f49d17e4a4c

import "react-phone-input-2/lib/style.css";

const CONFIGS = [
  { label: "2 BHK", id: "config-2-bhk" },
  { label: "3 BHK", id: "config-3-bhk" },
  { label: "Explore Both", id: "config-explore-both" },
];


const API_URL = "https://rustomjeeozoneskye.in/api/api.php";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  config: "2 BHK",
  message: "",
  consent: true,
};
export default function EnquiryForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

<<<<<<< HEAD
  // MoEngage: lead_form_started / lead_form_abandoned
  const formRef = useRef(null);
  const { onBlurCapture, markSubmitted } = useLeadFormTracking({
    values: form,
    getMeta: () => FORMS.section,
    observeRef: formRef,
  });

=======
>>>>>>> 1351584ad7b6009b0d9656a989636f49d17e4a4c
  const update = (key) => (event) => {
    setForm((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem("lead_session_id");

    if (!sessionId) {
      sessionId = crypto.randomUUID();

      sessionStorage.setItem("lead_session_id", sessionId);
    }

    return sessionId;
  };

  const validateForm = () => {
    const newErrors = {};

    // Trim values
    const nameTrimmed = form.name?.trim() || "";
    const phoneTrimmed = form.phone?.trim() || "";
    const emailTrimmed = form.email?.trim() || "";

    // =========================
    // NAME VALIDATION
    // =========================
    if (!nameTrimmed) {
      newErrors.name = "Full name is required.";
    } else if (nameTrimmed.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (!/^[a-zA-Z\s'.]+$/.test(nameTrimmed)) {
      newErrors.name = "Please enter a valid name.";
    }

    // =========================
    // PHONE VALIDATION
    // =========================
    if (!phoneTrimmed) {
      newErrors.phone = "Phone number is required.";
    } else {
      // Remove spaces, brackets, hyphens, + etc.
      const phoneDigits = phoneTrimmed.replace(/\D/g, "");

      // Remove India country code 91
      let indianPhone = phoneDigits;

      if (indianPhone.startsWith("91") && indianPhone.length === 12) {
        indianPhone = indianPhone.substring(2);
      }

      // Check exactly 10 digits
      if (indianPhone.length !== 10) {
        newErrors.phone = "Please enter a valid 10-digit phone number.";
      }
      // Indian mobile numbers should start from 6-9
      else if (!/^[6-9]\d{9}$/.test(indianPhone)) {
        newErrors.phone = "Please enter a valid Indian phone number.";
      }
    }

    // =========================
    // EMAIL VALIDATION
    // =========================
    if (!emailTrimmed) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailTrimmed)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // =========================
<<<<<<< HEAD
    // CONSENT VALIDATION
    // =========================
    if (!form.consent) {
      newErrors.consent = "Please agree to the authorization terms to proceed.";
    }

    // =========================
=======
>>>>>>> 1351584ad7b6009b0d9656a989636f49d17e4a4c
    // SET ERRORS
    // =========================
    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => {
    const marketing = getMarketingData() || {};

    return {
      // Lead details
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: form.phone.replace(/\D/g, ""),
      countrycode: "+91",
      countryname: "India",

      // Project
      projectSelectValues: "Rustomjee Ozone Skye",
      configuration: form.config,

      // API required fields
      configInterestValues: [form.config],
      configTypeValues: [form.config],
      purposeValues: [""],
      visitdayValues: [""],
      favdestinationValues: [""],

      // Form details
      formname: "Rustomjee Ozone Enquiry",
      form_id: "",
      leadgen_id: "",
      page_id: "",
      ad_id: "",

      // EXACT MARKETING PARAMETERS
      utm_source: marketing.utm_source || "",
      utm_sub_source: marketing.utm_sub_source || "",
      utm_medium: marketing.utm_medium || "",
      campaigncode: marketing.campaigncode || "",
      campaignname: marketing.campaignname || "",
      Lead_Keyword: marketing.Lead_Keyword || "",
      utm_adset: marketing.utm_adset || "",
      utm_adname: marketing.utm_adname || "",
      Lead_Placement: marketing.Lead_Placement || "",
      Lead_Device: marketing.Lead_Device || "",
      gad_source: marketing.gad_source || "",
      gad_campaignid: marketing.gad_campaignid || "",
      gbraid: marketing.gbraid || "",
      gclid: marketing.gclid || "",
      // Website
      websitename: window.location.hostname,
    };
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = buildPayload();

      console.log("Submitting lead:", payload);

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();

      console.log("API Response:", result);

      /*
       * Your PHP API returns:
       *
       * {
       *   "status": 1,
       *   "msg": "Lead added"
       * }
       */

      if (Number(result.status) !== 1) {
        throw new Error(result.msg || "Lead submission failed.");
      }

<<<<<<< HEAD
      // MoEngage: backend confirmed the save (no OTP step on this page)
      markSubmitted();
      pushLeadSubmitted({ form, formMeta: FORMS.section, result });

=======
>>>>>>> 1351584ad7b6009b0d9656a989636f49d17e4a4c
      toast.success(
        "Thank you — a Rustomjee relationship manager will call you within 24 hours.",
      );

      // Reset form
      setForm(INITIAL_FORM);

      // React Router navigation
      navigate("/thank-you");
    } catch (error) {
      console.error("Lead submission failed:", error);

      toast.error(
        error?.message || "Unable to submit your enquiry. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="enquiry" data-testid="enquiry-section" className="relative bg-[#fff] text-[color:var(--skye-ink)] py-14 sm:py-18 md:py-20 overflow-hidden"
    >
      <div className="grain absolute inset-0 opacity-15" />
      <div className="absolute -left-40 -top-40 w-[520px] h-[520px] rounded-full bg-[color:var(--skye-ochre-deep)]/10 blur-3xl" />
      <div className="absolute -right-40 -bottom-40 w-[520px] h-[520px] rounded-full bg-[color:var(--skye-ochre-deep)]/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="col-span-12 lg:col-span-5 my-auto"
          >
            <div className="eyebrow text-[color:var(--skye-ochre-deep)] mb-4">
              08 — Reserve a Preview
            </div>
            <h2 className="font-display leading-[1.22] sm:leading-[1.15] tracking-tighter text-[32px] sm:text-[44px] md:text-[52px] lg:text-[52px] text-[color:var(--skye-ink)]">
              {" "}
              Come see it,{" "}
              <span className="italic text-[color:var(--skye-ochre-deep)]">
                before it belongs to someone else.
              </span>
            </h2>
            <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-5">
              <ContactLine label="Site" value="Goregaon (West), Mumbai" />
            </div>
          </motion.div>
          <motion.form
<<<<<<< HEAD
            ref={formRef}
            onSubmit={onSubmit}
            onBlurCapture={onBlurCapture}
=======
            onSubmit={onSubmit}
>>>>>>> 1351584ad7b6009b0d9656a989636f49d17e4a4c
            noValidate
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.15 }}
            className="col-span-12 lg:col-span-7 p-2 sm:p-4 md:p-6 lg:p-8"
            data-testid="enquiry-form"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
              <div className="col-span-2 relative pb-4">
                <label className="eyebrow block text-[10px] text-[color:var(--skye-ochre-deep)] mb-2 tracking-widest">
                  Full Name *
                </label>
                <input
                  data-testid="input-name"
<<<<<<< HEAD
                  name="name"
=======
>>>>>>> 1351584ad7b6009b0d9656a989636f49d17e4a4c
                  className={`skye-input !text-[color:var(--skye-ink)] !opacity-100 !border-b ${errors.name ? "!border-b-red-500 focus:!border-b-red-600" : "!border-b-[color:var(--skye-ink)]/30 focus:!border-b-[color:var(--skye-ochre-deep)]"} placeholder:text-[color:var(--skye-ink)]/40 text-base`}
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={update("name")}
                />
                {errors.name && (
                  <span className="text-[11px] absolute text-red-600 font-sans block">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1 relative pb-4">
                <label className="eyebrow block text-[10px] text-[color:var(--skye-ochre-deep)] mb-2 tracking-widest">
                  Email Address *
                </label>
                <input
                  data-testid="input-email"
<<<<<<< HEAD
                  name="email"
=======
>>>>>>> 1351584ad7b6009b0d9656a989636f49d17e4a4c
                  type="email"
                  className={`skye-input !text-[color:var(--skye-ink)] !opacity-100 !border-b ${errors.email ? "!border-b-red-500 focus:!border-b-red-600" : "!border-b-[color:var(--skye-ink)]/30 focus:!border-b-[color:var(--skye-ochre-deep)]"} placeholder:text-[color:var(--skye-ink)]/40 text-base`}
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={update("email")}
                />
                {errors.email && (
                  <span className="text-[11px] absolute text-red-600 font-sans block">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1 relative pb-4">
                <label className="eyebrow block text-[10px] text-[color:var(--skye-ochre-deep)] mb-2 tracking-widest">
                  Phone Number *
                </label>
                <div className="relative">
                  <PhoneInput
                    country="in"
                    disableCountryGuess
                    countryCodeEditable={false}
                    value={form.phone}
                    onChange={(phone) => {
                      setForm((s) => ({ ...s, phone }));
                      if (errors.phone) {
                        setErrors((prev) => ({ ...prev, phone: "" }));
                      }
                    }}
                    inputProps={{
                      name: "phone",
                      required: true,
                      "data-testid": "input-phone",
                    }}
                    enableSearch
                    containerClass="phone-input-container !w-full"
                    inputClass={`phone-input !w-full ${errors.phone ? "phone-input-error" : ""}`}
                  />
                  {(!form.phone || form.phone.replace(/\D/g, "") === "91") && (
                    <span className="absolute left-[83px] top-[15px] pointer-events-none text-[#000]/55 font-sans text-sm italic select-none">
                      Enter your number
                    </span>
                  )}
                </div>
                {errors.phone && (
                  <span className="text-[11px] absolute text-red-600 font-sans block">
                    {errors.phone}
                  </span>
                )}
              </div>
<<<<<<< HEAD
              <div className="col-span-2 relative pt-1">
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    data-testid="input-consent"
                    checked={form.consent}
                    onChange={(e) => {
                      setForm((s) => ({ ...s, consent: e.target.checked }));
                      if (errors.consent) {
                        setErrors((prev) => ({ ...prev, consent: "" }));
                      }
                    }}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-[#597dae] accent-[#597dae] cursor-pointer shrink-0"
                  />
                  <span className="text-[10px] sm:text-[11px] leading-snug text-[color:var(--skye-ink)]/70 font-sans">
                    I agree and authorize team to contact me. This will override the registry with DNC / NDNC also contact me via email, sms, whatsapp and call
                  </span>
                </label>
                {errors.consent && (
                  <span className="text-[11px] text-red-600 font-sans block mt-1">
                    {errors.consent}
                  </span>
                )}
              </div>
=======
>>>>>>> 1351584ad7b6009b0d9656a989636f49d17e4a4c
              <div className="col-span-2 mt-2 pt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                <div>
                  <label className="eyebrow block text-[10px] text-[color:var(--skye-ochre-deep)] mb-3 tracking-widest">
                    Interested In
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                   {CONFIGS.map((c) => (
                    <button
                      key={c.id}
                      id={c.id}
                      type="button"
                      data-testid={`config-choice-${c.label.replace(/\s+/g, "-")}`}
                      onClick={() => setForm((s) => ({ ...s, config: c.label }))}
                      className={`px-5 py-2.5 rounded-full text-[11px] sm:text-[12px] tracking-wider uppercase font-sans transition-all duration-300 border ${
                        form.config === c.label
                          ? "bg-[#597dae] text-white border-[#597dae] shadow-lg shadow-[#597dae]/20"
                          : "border-[#597dae] text-[#597dae] hover:bg-[#597dae]/10"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting} 
                  data-testid="submit-enquiry" id="send-enquiry-button"
                  className="w-full sm:w-auto inline-flex items-center gap-3 px-8 py-3.5 bg-[#597dae] hover:bg-[#486996] text-white font-sans font-medium text-xs tracking-[0.2em] uppercase rounded-full transition-all duration-300 shadow-lg shadow-[#597dae]/25 shrink-0 justify-center cursor-pointer border-none"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  {submitting ? "Sending…" : "Send Enquiry"}
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

const ContactLine = ({ label, value, href }) => (
  <div className="flex items-baseline gap-4 sm:gap-6 border-b border-[color:var(--skye-ink)]/15 pb-3 sm:pb-4">
    <span className="eyebrow text-[color:var(--skye-ink)]/60 w-16 sm:w-24 shrink-0">
      {label}
    </span>
    {href ? (
      <a
        href={href}
        className="font-display italic text-lg sm:text-2xl md:text-3xl text-[color:var(--skye-ink)] tracking-tight hover:text-[color:var(--skye-ochre-deep)] transition-colors"
      >
        {value}
      </a>
    ) : (
      <span className="font-display italic text-lg sm:text-2xl md:text-3xl text-[color:var(--skye-ink)] tracking-tight">
        {value}
      </span>
    )}
  </div>
);
