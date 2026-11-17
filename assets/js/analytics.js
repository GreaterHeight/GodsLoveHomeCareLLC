/* Privacy-conscious Google Analytics 4 loader.
   Analytics requires a valid measurement ID and explicit visitor opt-in. */
(function(){
  'use strict';
  var loaded=false;
  function onConsentChange(){
    var consent=window.GLHCCookieConsent||{};
    var id=window.GLHC_GA4_ID||'';
    if(consent.analytics!==true){
      if(loaded&&typeof window.gtag==='function')window.gtag('consent','update',{analytics_storage:'denied'});
      return;
    }
    if(loaded||!/^G-[A-Z0-9]+$/.test(id))return;
    loaded=true;
    window.dataLayer=window.dataLayer||[];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag=gtag;
    gtag('consent','default',{analytics_storage:'denied'});
    gtag('js',new Date());
    gtag('config',id,{anonymize_ip:true});
    var s=document.createElement('script');
    s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);
    document.head.appendChild(s);
    gtag('consent','update',{analytics_storage:'granted'});
  }
  document.addEventListener('DOMContentLoaded',onConsentChange);
  window.addEventListener('glhc:consentchange',onConsentChange);
})();
