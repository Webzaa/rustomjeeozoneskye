/* Rustomjee - MoEngage form progress tracking (lead_form_started / lead_form_abandoned)
 * Requires /js/moengage-datalayer.js to be loaded first.
 * Pushes only field NAMES and COUNTS, never what the visitor typed.
 */
(function () {
  'use strict';

  // Fields that are not visitor input.
  var IGNORE_NAMES = [
    'honeypot', 'formname', 'countryname', 'session_id',
    'subject', 'comments', 'CountryCode', 'consentbox'
  ];

  // Mobile: seconds the started form can stay out of view before it counts as abandoned
  var SCROLL_AWAY_SECONDS = 8;

  // Touch devices (phones and tablets)
  var IS_TOUCH = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

  function isTracked(el) {
    if (!el || !el.name) { return false; }
    if (el.type === 'hidden' || el.type === 'submit' || el.type === 'button') { return false; }
    return IGNORE_NAMES.indexOf(el.name) === -1;
  }

  function trackedFields(form) {
    var out = [];
    var els = form.querySelectorAll('input, select, textarea');
    for (var i = 0; i < els.length; i++) {
      if (isTracked(els[i])) { out.push(els[i]); }
    }
    return out;
  }

  function hasValue(el) {
    if (el.type === 'checkbox' || el.type === 'radio') { return el.checked; }
    return String(el.value || '').trim() !== '';
  }

  function init(form, index) {
    var formId = form.id || form.getAttribute('name') || ('form_' + (index + 1));

    // The popup's hidden "formname" changes depending on which button opened it,
    // so read it at the moment an event fires, not once at page load.
    function getFormName() {
      var nameField = form.querySelector('input[name="formname"]');
      return nameField ? nameField.value : '';
    }

    var startedAt = 0;
    var started = false;
    var submitted = false;
    var lastField = '';
    var scrollTimer = null;

    function countCompleted() {
      var n = 0;
      var fields = trackedFields(form);
      for (var i = 0; i < fields.length; i++) {
        if (hasValue(fields[i])) { n++; }
      }
      return n;
    }

    // A field counts as completed when the visitor leaves it with a value
    form.addEventListener('change', function (e) {
      var el = e.target;
      if (!isTracked(el) || !hasValue(el)) { return; }

      lastField = el.name;

      if (!started) {
        started = true;
        startedAt = Date.now();
        rustomjeePushLeadFormStarted({
          formId: formId,
          formName: getFormName(),
          fieldsCompleted: countCompleted(),
          lastFieldName: lastField
        });
      }
    }, true);

    // Count as submitted when the form was valid at submit time.
    // Covers both a native submit and a script-handled submit (e.g. jQuery Validate).
    form.addEventListener('submit', function (e) {
      setTimeout(function () {
        var valid = (typeof form.checkValidity === 'function') ? form.checkValidity() : true;
        if (!e.defaultPrevented || valid) { submitted = true; }
      }, 0);
    });

    function abandon() {
      if (!started || submitted) { return; }
      rustomjeePushLeadFormAbandoned({
        formId: formId,
        formName: getFormName(),
        fieldsCompleted: countCompleted(),
        lastFieldName: lastField,
        secondsElapsed: (Date.now() - startedAt) / 1000
      });
    }

    // 1. Visitor leaves the page
    window.addEventListener('pagehide', abandon);

    // 2. Visitor closes a modal containing the form (Bootstrap 5)
    var modal = form.closest ? form.closest('.modal') : null;
    if (modal) {
      modal.addEventListener('hidden.bs.modal', abandon);
    }

    // 3. Mobile only: page hidden (app switch, screen lock, tab switch)
    if (IS_TOUCH) {
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') { abandon(); }
      });
    }

    // 4. Mobile only, forms in the page body: scrolled away from the form
    if (IS_TOUCH && !modal && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;

        if (visible) {
          // Came back before the delay ended: cancel
          if (scrollTimer) { clearTimeout(scrollTimer); scrollTimer = null; }
          return;
        }

        if (started && !submitted && !scrollTimer) {
          scrollTimer = setTimeout(function () {
            scrollTimer = null;
            abandon();
          }, SCROLL_AWAY_SECONDS * 1000);
        }
      }, { threshold: 0 });

      observer.observe(form);
    }
  }

  function setup() {
    var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
      // Only forms that look like the enquiry form (have a mobile field)
      if (forms[i].querySelector('[name="mobile"]')) {
        init(forms[i], i);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();