/*
 * MoEngage dataLayer tracking for Rustomjee Ozone Skye.
 *
 * Thin wrapper over the client-provided /js/moengage-datalayer.js (loaded in
 * public/index.html), which defines the global rustomjee* push functions.
 * Those functions own the key names and the fire-once guard; this file only
 * supplies values the page already has. Nothing here sends form contents
 * except where the spec asks for it (lead_submitted).
 *
 * Pushes implemented : lead_submitted, lead_form_started,
 *                      lead_form_abandoned, floor_plan_downloaded
 * Pushes skipped     : otp_verified (no OTP step), brochure_downloaded
 *                      (no brochure on the page)
 */
import { useCallback, useEffect, useRef } from "react";

export const PROJECT_SLUG = "ozone-skye-goregaon-west";

// lead_form_name / lead_form_id / lead_form_location per form on the page
export const FORMS = {
  section: {
    id: "ozone_skye_section_enquiry",
    name: "section_enquiry",
    location: "body",
  },
  popup: {
    id: "ozone_skye_popup_enquiry",
    name: "popup_enquiry",
    location: "modal",
  },
  floorPlan: {
    id: "ozone_skye_floor_plan_enquiry",
    name: "floor plan popup",
    location: "modal",
  },
};

export const FLOOR_PLAN_MODAL_TITLE = "Request Floor Plan";

// Call a client helper if it loaded. Tracking must never break the form.
function call(fnName, arg) {
  try {
    const fn = window[fnName];
    if (typeof fn === "function") {
      return fn(arg);
    }
  } catch (err) {
    console.warn(`[moengage] ${fnName} failed`, err);
  }
  return undefined;
}

export function pushLeadSubmitted({ form, formMeta, result }) {
  // react-phone-input-2 gives digits with the country code ("919876543210").
  // Passing "91" as the country code makes the client helper return it as is
  // instead of prefixing 91 a second time.
  const phone = String(form.phone || "").replace(/\D/g, "");
  const dial =
    typeof window.rustomjeeToDialFormat === "function"
      ? window.rustomjeeToDialFormat("91", phone)
      : phone;

  call("rustomjeePushLeadSubmitted", {
    phone: dial,
    email: (form.email || "").trim(),
    name: (form.name || "").trim(),
    enquiryType: "",
    location: "",
    project: PROJECT_SLUG,
    formName: formMeta.name,
    formLocation: formMeta.location,
    leadId: String(result?.leadId ?? result?.lead_id ?? result?.id ?? ""),
  });
}

export function pushFloorPlanDownloaded({ configuration }) {
  const slug = String(configuration || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  call("rustomjeePushFloorPlanDownloaded", {
    floorPlanId: `${PROJECT_SLUG}-floor-plan${slug ? "-" + slug : ""}`,
    configuration: configuration || "",
    // No carpet area on the page. The client helper turns a non-number into 0.
    carpetAreaSqft: "",
    projectSlug: PROJECT_SLUG,
  });
}

// ---------------------------------------------------------------------------
// lead_form_started / lead_form_abandoned
// Port of the client's moengage-form-tracking.js for React-rendered forms.
// ---------------------------------------------------------------------------

const TRACKED_FIELDS = ["name", "email", "phone"];
const SCROLL_AWAY_SECONDS = 8;

function fieldHasValue(key, value) {
  const s = String(value || "").trim();
  if (key === "phone") {
    // "91" alone is just the pre-filled country code
    return s.replace(/\D/g, "").length > 2;
  }
  return s !== "";
}

/**
 * @param {object}   opts
 * @param {object}   opts.values      current form state ({name,email,phone,...})
 * @param {function} opts.getMeta     () => FORMS entry for the form right now
 * @param {boolean}  [opts.active]    false while a modal is closed
 * @param {object}   [opts.observeRef] ref to an in-page form (mobile scroll-away)
 * @returns {{ onBlurCapture: function, markSubmitted: function }}
 */
export function useLeadFormTracking({
  values,
  getMeta,
  active = true,
  observeRef,
}) {
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const getMetaRef = useRef(getMeta);
  getMetaRef.current = getMeta;

  const st = useRef({
    started: false,
    submitted: false,
    startedAt: 0,
    last: "",
    meta: null, // meta captured when the form started
    timer: null,
  });

  const countCompleted = () =>
    TRACKED_FIELDS.filter((k) => fieldHasValue(k, valuesRef.current[k])).length;

  const abandon = useCallback(() => {
    const s = st.current;
    if (!s.started || s.submitted) return;
    const meta = getMetaRef.current() || s.meta;
    call("rustomjeePushLeadFormAbandoned", {
      formId: meta.id,
      formName: meta.name,
      fieldsCompleted: countCompleted(),
      lastFieldName: s.last,
      secondsElapsed: (Date.now() - s.startedAt) / 1000,
    });
  }, []);

  // A field counts as completed when the visitor leaves it with a value
  const onBlurCapture = useCallback((e) => {
    const key = e.target && e.target.name;
    if (TRACKED_FIELDS.indexOf(key) === -1) return;
    if (!fieldHasValue(key, valuesRef.current[key])) return;

    const s = st.current;
    s.last = key;
    if (s.started) return;

    const meta = getMetaRef.current();
    s.started = true;
    s.startedAt = Date.now();
    s.meta = meta;
    call("rustomjeePushLeadFormStarted", {
      formId: meta.id,
      formName: meta.name,
      fieldsCompleted: countCompleted(),
      lastFieldName: key,
    });
  }, []);

  const markSubmitted = useCallback(() => {
    st.current.submitted = true;
  }, []);

  // Modal closed: abandon if started, then reset for the next opening
  const wasActive = useRef(active);
  useEffect(() => {
    if (wasActive.current && !active) {
      abandon();
      const s = st.current;
      s.started = false;
      s.submitted = false;
      s.last = "";
    }
    wasActive.current = active;
  }, [active, abandon]);

  // Page leave, app switch (touch), route change / unmount, scroll away (touch)
  useEffect(() => {
    const isTouch =
      !!window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    const s = st.current;

    const onHide = () => abandon();
    const onVisibility = () => {
      if (document.visibilityState === "hidden") abandon();
    };

    window.addEventListener("pagehide", onHide);
    if (isTouch) document.addEventListener("visibilitychange", onVisibility);

    let observer = null;
    const el = observeRef && observeRef.current;
    if (isTouch && el && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (s.timer) {
              clearTimeout(s.timer);
              s.timer = null;
            }
            return;
          }
          if (s.started && !s.submitted && !s.timer) {
            s.timer = setTimeout(() => {
              s.timer = null;
              abandon();
            }, SCROLL_AWAY_SECONDS * 1000);
          }
        },
        { threshold: 0 },
      );
      observer.observe(el);
    }

    return () => {
      window.removeEventListener("pagehide", onHide);
      document.removeEventListener("visibilitychange", onVisibility);
      if (observer) observer.disconnect();
      if (s.timer) clearTimeout(s.timer);
      abandon(); // route change / unmount
    };
  }, [abandon, observeRef]);

  return { onBlurCapture, markSubmitted };
}
