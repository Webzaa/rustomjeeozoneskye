import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getMarketingData } from "@/lib/marketing";
import {
  FORMS,
  FLOOR_PLAN_MODAL_TITLE,
  pushFloorPlanDownloaded,
  pushLeadSubmitted,
  useLeadFormTracking,
} from "@/lib/moengage";

const API_URL = "https://rustomjeeozoneskye.in/api/api.php";

const CONFIGS = ["2 BHK", "3 BHK", "Explore Both"];

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  config: "2 BHK",
  message: "",
  consent: true,
};

export default function EnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Reserve a Preview");

  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // MoEngage: the popup is used for two forms, told apart by its title
  const isFloorPlan = modalTitle === FLOOR_PLAN_MODAL_TITLE;
  const formMeta = isFloorPlan ? FORMS.floorPlan : FORMS.popup;
  const { onBlurCapture, markSubmitted } = useLeadFormTracking({
    values: form,
    getMeta: () => formMeta,
    active: isOpen,
  });

  // =========================================================
  // COMMON INPUT CHANGE HANDLER
  // =========================================================
  const handleChange = (field) => (event) => {
    const value = event.target.value;

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Remove error as soon as user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // =========================================================
  // OPEN MODAL EVENT
  // =========================================================
  useEffect(() => {
    const handleOpen = (event) => {
      const title = event.detail?.title;
      const config = event.detail?.config;

      if (title) {
        setModalTitle(title);
      } else {
        setModalTitle("Reserve a Preview");
      }

      if (config) {
        setForm((prev) => ({
          ...prev,
          config,
        }));
      }

      setErrors({});
      setIsOpen(true);
    };

    window.addEventListener("open-enquiry-modal", handleOpen);

    window.openEnquiryModal = (title, config) => {
      window.dispatchEvent(
        new CustomEvent("open-enquiry-modal", {
          detail: {
            title,
            config,
          },
        }),
      );
    };

    return () => {
      window.removeEventListener("open-enquiry-modal", handleOpen);
      delete window.openEnquiryModal;
    };
  }, []);

  // =========================================================
  // PHONE NUMBER NORMALIZER
  // =========================================================
  const getIndianPhoneNumber = (phone) => {
    if (!phone) {
      return "";
    }
    let digits = phone.replace(/\D/g, "");

    if (digits.startsWith("91") && digits.length === 12) {
      digits = digits.substring(2);
    }

    return digits;
  };

  // =========================================================
  // FORM VALIDATION
  // =========================================================
  const validateForm = () => {
    const newErrors = {};

    const nameTrimmed = form.name?.trim() || "";
    const phoneTrimmed = form.phone?.trim() || "";
    const emailTrimmed = form.email?.trim() || "";

    // -------------------------------------------------------
    // NAME VALIDATION
    // -------------------------------------------------------
    if (!nameTrimmed) {
      newErrors.name = "Full name is required.";
    } else if (nameTrimmed.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (!/^[a-zA-Z\s'.]+$/.test(nameTrimmed)) {
      newErrors.name = "Please enter a valid name.";
    }

    // -------------------------------------------------------
    // PHONE VALIDATION
    // -------------------------------------------------------
    if (!phoneTrimmed) {
      newErrors.phone = "Phone number is required.";
    } else {
      const indianPhone = getIndianPhoneNumber(phoneTrimmed);

      // Must contain exactly 10 digits after +91
      if (indianPhone.length !== 10) {
        newErrors.phone = "Please enter a valid 10-digit phone number.";
      }
      // Indian mobile number should start with 6, 7, 8 or 9
      else if (!/^[6-9]\d{9}$/.test(indianPhone)) {
        newErrors.phone = "Please enter a valid Indian phone number.";
      }
    }

    // -------------------------------------------------------
    // EMAIL VALIDATION
    // -------------------------------------------------------
    if (!emailTrimmed) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailTrimmed)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // -------------------------------------------------------
    // CONSENT VALIDATION
    // -------------------------------------------------------
    if (!form.consent) {
      newErrors.consent = "Please agree to the authorization terms to proceed.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================================================
  // BUILD API PAYLOAD
  // =========================================================
  const buildPayload = () => {
    const marketing = getMarketingData() || {};

    // Get only 10-digit Indian mobile number
    const mobile = getIndianPhoneNumber(form.phone);

    return {
      // -----------------------------------------------------
      // Lead details
      // -----------------------------------------------------
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: mobile,
      countrycode: "+91",
      countryname: "India",

      // -----------------------------------------------------
      // Project
      // -----------------------------------------------------
      projectSelectValues: "Rustomjee Ozone Skye",
      configuration: form.config,

      // -----------------------------------------------------
      // API required fields
      // -----------------------------------------------------
      configInterestValues: [form.config],
      configTypeValues: [form.config],
      purposeValues: [""],
      visitdayValues: [""],
      favdestinationValues: [""],

      // -----------------------------------------------------
      // Form details
      // -----------------------------------------------------
      formname: "Rustomjee Ozone Enquiry",
      form_id: "",
      leadgen_id: "",
      page_id: "",
      ad_id: "",

      // -----------------------------------------------------
      // Marketing parameters
      // -----------------------------------------------------
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

      // -----------------------------------------------------
      // Website
      // -----------------------------------------------------
      websitename: window.location.hostname,
    };
  };

  // =========================================================
  // FORM SUBMIT
  // =========================================================
  const onSubmit = async (event) => {
    event.preventDefault();

    // Prevent multiple submissions
    if (submitting) {
      return;
    }

    // Validate before API call
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
        Expected PHP API response:

        {
          "status": 1,
          "msg": "Lead added"
        }
      */

      if (Number(result.status) !== 1) {
        throw new Error(result.msg || "Lead submission failed.");
      }

      // MoEngage: backend confirmed the save (no OTP step on this page)
      markSubmitted();
      pushLeadSubmitted({ form, formMeta, result });
      if (isFloorPlan) {
        pushFloorPlanDownloaded({ configuration: form.config });
      }

      // Success message
      toast.success(
        "Thank you — a Rustomjee relationship manager will call you within 24 hours.",
      );

      // Reset form
      setForm(INITIAL_FORM);
      setErrors({});

      // Navigate to thank-you page
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

  // =========================================================
  // CLOSE MODAL
  // =========================================================
  const closeModal = () => {
    if (submitting) {
      return;
    }

    setIsOpen(false);
  };

  // =========================================================
  // JSX
  // =========================================================
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#d8e0e6] text-[color:var(--skye-ink)] rounded-2xl shadow-2xl p-6 sm:p-7 overflow-hidden z-10 border border-[color:var(--skye-ink)]/15"
            data-testid="enquiry-modal-card"
          >
            <button
              type="button"
              onClick={closeModal}
              disabled={submitting}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[color:var(--skye-ink)]/10 hover:bg-[color:var(--skye-ink)]/20 text-[color:var(--skye-ink)] flex items-center justify-center text-xs transition-colors cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Close modal"
              data-testid="close-enquiry-modal"
            >
              ✕
            </button>
            <div className="mb-4 pr-6">
              <div className="eyebrow text-[color:var(--skye-ochre-deep)] mb-1 text-[11px]">
                Rustomjee Ozone Skye
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[color:var(--skye-ink)] leading-tight">
                {modalTitle}
              </h3>
              <p className="font-sans text-xs text-[color:var(--skye-ink)]/70 mt-1">
                Fill in your details below and our team will get in touch with
                you.
              </p>
            </div>
            <form onSubmit={onSubmit} onBlurCapture={onBlurCapture} noValidate className="space-y-4">
              <div className="relative">
                <label className="eyebrow block text-[10px] text-[color:var(--skye-ochre-deep)] mb-1 tracking-widest">
                  Full Name *
                </label>
                <input
                  data-testid="modal-input-name"
                  name="name"
                  type="text"
                  className={`skye-input !text-[color:var(--skye-ink)] !opacity-100 !border-b ${errors.name ? "!border-b-red-500 focus:!border-b-red-600" : "!border-b-[color:var(--skye-ink)]/30 focus:!border-b-[color:var(--skye-ochre-deep)]"} placeholder:text-[color:var(--skye-ink)]/40 placeholder:text-[12px] placeholder:font-sans text-sm !py-2`}
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange("name")}
                />
                {errors.name && (
                  <span className="text-[11px] text-red-600 font-sans block mt-1">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="relative">
                <label className="eyebrow block text-[10px] text-[color:var(--skye-ochre-deep)] mb-1 tracking-widest">
                  Phone Number *
                </label>
                <div className="relative">
                  <PhoneInput
                    country="in"
                    disableCountryGuess
                    countryCodeEditable={false}
                    value={form.phone}
                    onChange={(phone) => {
                      setForm((prev) => ({ ...prev, phone }));
                      if (errors.phone) {
                        setErrors((prev) => ({ ...prev, phone: "" }));
                      }
                    }}
                    inputProps={{
                      name: "phone",
                      required: true,
                      "data-testid": "modal-input-phone",
                    }}
                    enableSearch
                    containerClass="phone-input-container"
                    inputClass={`phone-input ${errors.phone ? "phone-input-error" : ""}`}
                  />
                  {(!form.phone || form.phone.replace(/\D/g, "") === "91") && (
                    <span className="absolute left-[83px] top-[16px] pointer-events-none text-[#000]/55 font-sans text-[12px] italic select-none">
                      Enter your number
                    </span>
                  )}
                </div>
                {errors.phone && (
                  <span className="text-[11px] text-red-600 font-sans block mt-1">
                    {errors.phone}
                  </span>
                )}
              </div>
              <div className="relative">
                <label className="eyebrow block text-[10px] text-[color:var(--skye-ochre-deep)] mb-1 tracking-widest">
                  {" "}
                  Email Address *
                </label>
                <input
                  data-testid="modal-input-email"
                  name="email"
                  type="email"
                  className={`skye-input !text-[color:var(--skye-ink)] !opacity-100 !border-b ${errors.email ? "!border-b-red-500 focus:!border-b-red-600" : "!border-b-[color:var(--skye-ink)]/30 focus:!border-b-[color:var(--skye-ochre-deep)]"} placeholder:text-[color:var(--skye-ink)]/40 placeholder:text-[12px] placeholder:font-sans text-sm !py-2`}
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={handleChange("email")}
                />
                {errors.email && (
                  <span className="text-[11px] text-red-600 font-sans block mt-1">
                    {errors.email}
                  </span>
                )}
              </div>
              <div>
                <label className="eyebrow block text-[10px] text-[color:var(--skye-ochre-deep)] mb-1.5 tracking-widest">
                  Interested In
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {CONFIGS.map((config) => (
                    <button
                      key={config}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, config }))}
                      className={`px-4 py-2 rounded-full text-[11px] uppercase font-sans transition-all duration-300 border ${
                        form.config === config
                          ? "bg-[#597dae] text-white border-[#597dae]"
                          : "border-[#597dae] text-[#597dae] hover:bg-[#597dae]/10"
                      }`}
                    >
                      {config}
                    </button>
                  ))}
                </div>
              </div>

              {/* CONSENT CHECKBOX */}
              <div className="relative pt-1">
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    data-testid="modal-input-consent"
                    checked={form.consent}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, consent: e.target.checked }));
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

              {/* SUBMIT */}
              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="modal-submit-enquiry" id="popup-submit-button"
                  className="w-full sm:w-auto inline-flex items-center gap-2.5 px-7 py-3 bg-[#597dae] hover:bg-[#486996] text-white font-sans font-medium text-xs tracking-[0.18em] uppercase rounded-full transition-all duration-300 shadow-md shrink-0 justify-center cursor-pointer border-none disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />

                  {submitting ? "Sending..." : "Submit Request"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
