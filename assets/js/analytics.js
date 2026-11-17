/* Privacy-conscious Google Analytics 4 loader. Disabled until a real Measurement ID is configured.
   Before enabling, publish a suitable privacy/cookie notice and obtain consent where required. */
(function(){
  var id = window.GLHC_GA4_ID || '';
  if (!/^G-[A-Z0-9]+$/.test(id)) return;
  var s=document.createElement('script'); s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id); document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[]; function gtag(){dataLayer.push(arguments)} window.gtag=gtag;
  gtag('js',new Date()); gtag('config',id,{anonymize_ip:true});
})();
