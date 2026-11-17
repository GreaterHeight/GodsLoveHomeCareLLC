/* Privacy-conscious Google Analytics 4 loader.
   Analytics is disabled until BOTH a valid measurement ID is configured and
   the visitor has opted in through the site's cookie preference controls. */
(function(){
  'use strict';
  var loaded=false;
  function loadAnalytics(){
    var consent=window.GLHCCookieConsent||{};
    var id=window.GLHC_GA4_ID||'';
    if(loaded||consent.analytics!==true||!/^G-[A-Z0-9]+$/.test(id))return;
    loaded=true;
    var s=document.createElement('script');
    s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag=gtag;
    gtag('js',new Date());
    gtag('config',id,{anonymize_ip:true});
  }
  document.addEventListener('DOMContentLoaded',loadAnalytics);
  window.addEventListener('glhc:consentchange',loadAnalytics);
})();
