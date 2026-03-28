/* =============================================
   consent.js — LookAtWhatAiCanDo
   Cookie consent management.
   - Checks localStorage for a stored decision.
   - Shows/hides the consent banner accordingly.
   - On accept: upgrades GA4 consent and fires config.
   - On decline: stores decision and hides banner.
   ============================================= */

(function initConsent() {
  var STORAGE_KEY = 'cookie_consent';
  var GA_ID = 'G-QNSWDZWZ74';

  function enableAnalytics() {
    if (typeof gtag !== 'function') return;
    gtag('consent', 'update', { 'analytics_storage': 'granted' });
    gtag('config', GA_ID);
  }

  function showBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) banner.removeAttribute('hidden');
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) banner.setAttribute('hidden', '');
  }

  // Apply any previously stored decision immediately
  var stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'accepted') {
    enableAnalytics();
  } else if (!stored) {
    // No decision yet — show the banner
    showBanner();
  }
  // 'declined' — do nothing (analytics stays denied)

  // Wire up banner buttons
  var acceptBtn = document.getElementById('cookie-accept');
  var declineBtn = document.getElementById('cookie-decline');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      enableAnalytics();
      hideBanner();
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'declined');
      hideBanner();
    });
  }
}());
