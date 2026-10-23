/*  ==========================================================================
    RUSTOMJEE - MOENGAGE DATALAYER SPECIFICATION
    CAMPAIGN LANDING PAGES
    ==========================================================================

    Version: 8.0, 29 September 2026
    For: Webzaa and Realatte

    The third of the three items for the MoEngage integration. The Tag Manager
    container snippet and the web push service worker were sent on 16 September
    and are unchanged.

    ONE CORRECTION TO THAT EMAIL: the service worker goes at the ROOT OF EACH
    LANDING PAGE DOMAIN, not at www.rustomjee.com. A page served from
    rustomjee-example.com needs it at rustomjee-example.com/serviceworker.js.
    One file per domain.

    ==========================================================================
    SKIPPED PUSHES
    ==========================================================================

    Not every page has all six events. If the page does not have the feature,
    SKIP that push and tell us which ones you skipped.

    Exception: 3.1 enquiry submitted. Every landing page has an enquiry form,
    and that push creates the person every other event attaches to. Build that
    one first.

    ==========================================================================
    WHAT IS NOT BEING ASKED FOR
    ==========================================================================

    Nothing needs adding to any form. No new fields, no new dropdowns, no
    tracking library, no MoEngage code. dataLayer pushes only, from values the
    page already has.

    Do not add a lead_domain or lead_source key. Tag Manager derives which site
    an event came from, from the page address.

    ==========================================================================
    CONTENTS
    ==========================================================================

    1. The rules that matter
    2. Phone number format, and the fire-once guard
    3. The six pushes
       3.1 Enquiry submitted        <- build this one first
       3.2 OTP verified
       3.3 Enquiry form started
       3.4 Enquiry form abandoned
       3.5 Brochure delivered
       3.6 Floor plan downloaded
    4. Worked example
    5. How to check it
    6. What to send back

    ==========================================================================

   1. THE RULES THAT MATTER
   ==========================================================================
   These apply to every push in section 3.

   1.1  Always use dataLayer.push(). Never write "dataLayer = [ ... ]".
        Assigning replaces the array Google Tag Manager created and breaks its
        click and form listeners across the whole site.

   1.2  Fire each push at the moment it claims to describe, not earlier.
        For lead_submitted that means after the backend confirms the lead was
        saved AND after the OTP is verified. Not on button click, not on
        validation pass.

   1.3  Fire each push exactly ONCE per occurrence. See the guard in 2.2.
        A repeated push is a repeated lead.

   1.4  Send the phone in one canonical format: country code followed by the
        number, no spaces, no dashes, NO leading plus. Example: 919876543210
        See 2.1.

   1.5  Use these exact key names. They are what the GTM configuration will
        look for. A renamed key reads as missing.

   1.6  Send empty string for a value that genuinely does not exist. Do not
        send the strings "null" or "undefined", and do not omit the key.
        Where a key is documented as a number, send 0 rather than "".

   1.7  Never push the CONTENTS of a form field except where this document
        explicitly asks for it. Sections 3.3 and 3.4 track form progress and
        need to know WHICH fields were completed and HOW MANY, never what was
        typed into them.

   1.8  Never add these values to a Google Analytics tag, or send them to any
        Google Analytics property. Google's terms prohibit personal data in
        Analytics.

   1.9  Never clear or overwrite these keys with a later push on the same page
        load. The values are read at the moment the event fires.

    ==========================================================================
    2. PHONE NUMBER FORMAT, AND THE FIRE-ONCE GUARD
    ==========================================================================
    2.1  PHONE NUMBER

    THIS IS THE ONE THING THAT FAILS WITH NO ERROR.

    One format, everywhere:

        919876543210

    Twelve digits. Country code first, then the ten digit number. NO leading
    plus, no spaces, no dashes, no brackets.

    The same number joins the page, MoEngage and Salesforce. Send 9876543210
    where Salesforce holds 919876543210 and MoEngage treats them as two people.
    Nothing errors; the profiles never merge.

    Normalise on the page. Many landing page forms hold the country code and the
    number in separate fields and store ten digits; the helper combines them.  */


function rustomjeeToDialFormat(countryCode, number) {
  // countryCode : value of the mobile-country-code field, e.g. "+91" or "91"
  // number      : value of the mobile field, e.g. "98765 43210"
  // returns     : "919876543210", or "" if the input is unusable
  //
  // Note there is deliberately no leading plus. See section 2.1.

  var cc = String(countryCode == null ? '' : countryCode).replace(/\D/g, '');
  var n = String(number == null ? '' : number).replace(/\D/g, '');

  if (!n) {
    return '';
  }

  // If the number already carries the country code, do not add it twice.
  if (cc && n.indexOf(cc) === 0 && n.length > 10) {
    return n;
  }

  // Default to India when the form did not supply a country code.
  if (!cc) {
    cc = '91';
  }

  return cc + n;
}

/*  2.2  THE FIRE-ONCE GUARD

    Used by every push in section 3. Guards against double-submit, a re-mounted
    success panel, and a thank-you page refreshed or reached with the back
    button.

    The key is per event type plus an identifier, so a genuinely different
    occurrence in the same session is still recorded.                          */


function rustomjeePushOnce(fireKey, payload) {
  window.dataLayer = window.dataLayer || [];
  window._rustomjeePushed = window._rustomjeePushed || {};

  if (fireKey && window._rustomjeePushed[fireKey]) {
    return false;
  }
  window._rustomjeePushed[fireKey] = true;

  window.dataLayer.push(payload);
  return true;
}

/*  ==========================================================================
    3. THE SIX PUSHES
    ==========================================================================

    3.1  ENQUIRY SUBMITTED        BUILD THIS ONE FIRST

    Call once from the success handler of the enquiry form, after the OTP is
    verified and the backend has confirmed the save.

    IF THE PAGE POSTS TO A THANK YOU PAGE rather than handling submission in
    place, fire it there instead, from values the server echoes in. The guard in
    2.2 stops a refresh or a back button recording a second lead.

    Send every field the form collects, and '' for the ones it does not have. */


function rustomjeePushLeadSubmitted(lead) {
  rustomjeePushOnce('lead_submitted:' + (lead.phone || ''), {
    event: 'lead_submitted',

    // ---- Identity -----------------------------------------------------
    // The identifier MoEngage keys the profile on.
    // Format: 919876543210. No leading plus. See 2.1.
    lead_phone: lead.phone || '',

    // Send exactly as the visitor typed them, trimmed. No lowercasing, no
    // normalising, no validating. Send '' if the form lacks the field.
    lead_email: lead.email || '',

    // The visitor's FULL name as one string, the way the form captures it.
    // Do not split it into first and last.
    lead_name: lead.name || '',

    // ---- Context ------------------------------------------------------
    // The three fields below come from the enquiry form's own dropdowns.
    // Send whatever the form actually collected, and an empty string for a
    // dropdown the form does not have.
    //
    // Send the option's VALUE, never the label the visitor sees. The values
    // are already the right shape:
    //     enquiry_type  "residential"          not "Residential"
    //     location      "mumbai"               not "Mumbai"
    //     project       "rustomjee-crown-prabhadevi"  not "Crown, Prabhadevi"

    // The kind of property enquired about, if the form asks. '' if not.
    lead_enquiry_type: lead.enquiryType || '',

    // The city or area selected, if the form asks. '' if not.
    lead_location: lead.location || '',

    // The project the visitor selected, if the form has a Project dropdown.
    // A landing page is usually about one project; send that project's slug
    // rather than leaving it empty.
    lead_project: lead.project || '',

    // Which form was submitted, if the page renders more than one variant.
    // Examples: "location_enquiry", "project_enquiry", "contact_us".
    // Send an empty string if there is only one form on the page.
    lead_form_name: lead.formName || '',

    // Where on the page the form sat, if this is known.
    // Examples: "body", "header_cta", "floating", "modal".
    lead_form_location: lead.formLocation || '',

    // ---- Optional but valuable ----------------------------------------
    // If the backend returns an identifier for the saved lead, include it.
    // It gives a second, exact way to reconcile website leads against
    // Salesforce, independent of phone number formatting.
    lead_id: lead.leadId || ''
  });
}

/*  3.2  OTP VERIFIED

    Call from the success branch of the OTP check, when the code is accepted.
    Skip it if the page has no OTP step.

    Fire it BEFORE the enquiry submitted push.                                */


function rustomjeePushOtpVerified(otp) {
  rustomjeePushOnce('otp_verified:' + (otp.phone || ''), {
    event: 'otp_verified',

    lead_phone: otp.phone || '',

    // How the code reached the visitor. Examples: "sms", "whatsapp", "call".
    otp_verification_method: otp.method || '',

    // "success" only. Please do not push this event on a failed attempt;
    // a failed OTP is not a verification, and counting it as one would
    // overstate how many numbers are contactable.
    otp_verification_status: 'success',

    lead_form_name: otp.formName || '',
    lead_id: otp.leadId || ''
  });
}

/*  3.3  ENQUIRY FORM STARTED

    Call once, the first time a visitor completes any field.

    Records WHICH field and HOW MANY, never what was typed.                   */


function rustomjeePushLeadFormStarted(form) {
  rustomjeePushOnce('lead_form_started:' + (form.formId || ''), {
    event: 'lead_form_started',

    // A stable identifier for this form on this page. Any consistent value
    // works as long as the same form always reports the same one.
    // Examples: "project_enquiry_modal", "contact_us_body".
    lead_form_id: form.formId || '',
    lead_form_name: form.formName || '',

    // How many fields carry a value at the moment this fires. A number.
    lead_fields_completed: typeof form.fieldsCompleted === 'number'
      ? form.fieldsCompleted
      : 0,

    // The NAME of the last field completed, not its value.
    // Correct:   "mobile"
    // Wrong:     "9876543210"
    lead_last_field_completed: form.lastFieldName || ''
  });
}

/*  3.4  ENQUIRY FORM ABANDONED

    Call when a visitor who started the form leaves without submitting it. Page
    unload, route change and closing a modal all count.                       */


function rustomjeePushLeadFormAbandoned(form) {
  rustomjeePushOnce('lead_form_abandoned:' + (form.formId || ''), {
    event: 'lead_form_abandoned',

    lead_form_id: form.formId || '',
    lead_form_name: form.formName || '',

    lead_fields_completed: typeof form.fieldsCompleted === 'number'
      ? form.fieldsCompleted
      : 0,

    // The NAME of the field the visitor stopped at, not its value.
    lead_abandonment_step: form.lastFieldName || '',

    // Whole seconds between the form being started and being abandoned.
    lead_time_to_abandon_seconds: typeof form.secondsElapsed === 'number'
      ? Math.round(form.secondsElapsed)
      : 0
  });
}

/*  3.5  BROCHURE DELIVERED

    Call when the brochure file is DELIVERED to the visitor, after the enquiry
    form is submitted. Skip it if the page has no brochure.

    Not the click on the Brochure button, which Tag Manager already tracks.   */


function rustomjeePushBrochureDownloaded(brochure) {
  rustomjeePushOnce(
    'brochure_downloaded:' + (brochure.brochureId || '') + ':' + (brochure.projectSlug || ''),
    {
      event: 'brochure_downloaded',

      // A stable identifier for the file. If there is no id, the filename is
      // an acceptable substitute as long as it is consistent.
      brochure_id: brochure.brochureId || '',

      // What kind of document it is. Examples: "project", "floor_plan",
      // "price_list", "rera".
      brochure_type: brochure.brochureType || '',

      // The project's URL slug, exactly as in the address bar.
      // Example: "rustomjee-crown-prabhadevi".
      project_slug: brochure.projectSlug || '',

      // The configuration the brochure relates to, if the page knows it.
      // Example: "3 BHK". Empty string if it is a whole-project brochure.
      configuration: brochure.configuration || ''
    }
  );
}

/*  3.6  FLOOR PLAN DOWNLOADED

    Call when a visitor downloads a specific floor plan. If the page has no
    floor plan download, skip it and say so.                                  */


function rustomjeePushFloorPlanDownloaded(plan) {
  rustomjeePushOnce(
    'floor_plan_downloaded:' + (plan.floorPlanId || '') + ':' + (plan.projectSlug || ''),
    {
      event: 'floor_plan_downloaded',

      // A stable identifier for this floor plan. Filename is acceptable.
      floor_plan_id: plan.floorPlanId || '',

      // Example: "3 BHK".
      configuration: plan.configuration || '',

      // Carpet area as a NUMBER in square feet, without units or commas.
      // Correct:   1250
      // Wrong:     "1,250 sq ft"
      carpet_area_sqft: typeof plan.carpetAreaSqft === 'number'
        ? plan.carpetAreaSqft
        : 0,

      // The project's URL slug, as in 3.5.
      project_slug: plan.projectSlug || ''
    }
  );
}

/*  ==========================================================================
    4. WORKED EXAMPLE
    ==========================================================================

    Illustrative only. Replace the field reads with however the form's state is
    actually held.                                                            */


function rustomjeeOnEnquirySuccess(formState, backendResponse) {
  // Only proceed once the backend has confirmed the lead is saved.
  if (!backendResponse || backendResponse.success !== true) {
    return;
  }

  // Only proceed once the OTP is verified. An unverified number should not
  // become a MoEngage identity.
  if (formState.otpVerified !== true) {
    return;
  }

  rustomjeePushLeadSubmitted({
    phone: rustomjeeToDialFormat(formState.mobileCountryCode, formState.mobile),
    email: formState.email,
    name: formState.name,
    // This form has all three dropdowns. Pass '' for any the form lacks.
    enquiryType: formState.enquiry_type,
    location: formState.location,
    project: formState.project,
    formName: 'contact_us',
    formLocation: 'body',
    leadId: backendResponse.leadId
  });
}

/*  What lands in the dataLayer:

    {
      event:                'lead_submitted',
      lead_phone:           '919876543210',
      lead_email:           'priya.shah@example.com',                  
      lead_name:            'Priya Shah',                              
      lead_enquiry_type:    'residential',
      lead_location:        'mumbai',
      lead_project:         'rustomjee-crown-prabhadevi',
      lead_form_name:       'contact_us',
      lead_form_location:   'body',
      lead_id:              'RJ-2026-08-114532'
    }

    The same push from a form with none of the three dropdowns.

    {
      event:                'lead_submitted',
      lead_phone:           '919876543210',
      lead_email:           'priya.shah@example.com',                  
      lead_name:            'Priya Shah',                              
      lead_enquiry_type:    '',
      lead_location:        '',
      lead_project:         '',
      lead_form_name:       'project_enquiry',
      lead_form_location:   'modal',
      lead_id:              'RJ-2026-08-114533'
    }


    Same function, same ten keys. Only the number of dropdowns differs, and an
    absent value is sent as '', never omitted.

    ==========================================================================
    5. HOW TO CHECK IT
    ==========================================================================

    Testable on staging without Tag Manager. The dataLayer is a plain array.

    1. Open the enquiry page and the browser console, F12.

    2. Submit a real test enquiry and complete the OTP.

    3. In the console, run:

           window.dataLayer.filter(function (o) { return o.event; })

    4. Confirm for what comes back:

       - lead_phone reads 919876543210. Twelve digits, no plus.
       - every documented key is present, with '' for what the form does not
         collect, never "null" or "undefined" and never a missing key.
       - each event appears exactly ONCE.

    5. Browse two or three other pages without submitting again, and confirm
       nothing fired a second time.

    6. Open a form, fill two fields, and leave without submitting. Confirm
       lead_form_started and lead_form_abandoned each appear once.

    If something does not fit the page, tell us rather than renaming a key. A
    renamed key reads as missing on our side and as working on yours.

    ==========================================================================
    6. WHAT TO SEND BACK
    ==========================================================================

    1. Which pushes you skipped, and for which domains.

    2. The full list of landing page domains.

    ==========================================================================  */
