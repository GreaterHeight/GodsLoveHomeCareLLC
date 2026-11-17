(function(){
  'use strict';
  var KEY='glhc_cookie_preferences_v1';
  var current={necessary:true,analytics:false,marketing:false,updatedAt:null};
  function read(){
    try{var saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&saved.necessary===true){current={necessary:true,analytics:saved.analytics===true,marketing:saved.marketing===true,updatedAt:saved.updatedAt||null};}}catch(e){}
    return current;
  }
  function save(next){
    current={necessary:true,analytics:next.analytics===true,marketing:next.marketing===true,updatedAt:new Date().toISOString()};
    try{localStorage.setItem(KEY,JSON.stringify(current));}catch(e){}
    window.GLHCCookieConsent=current;
    window.dispatchEvent(new CustomEvent('glhc:consentchange',{detail:current}));
    closePreferences();
    hideBanner();
  }
  function hideBanner(){var b=document.querySelector('.glhc-cookie-banner');if(b)b.hidden=true;}
  function closePreferences(){var p=document.querySelector('.glhc-cookie-preferences');if(p)p.hidden=true;}
  function openPreferences(){var p=document.querySelector('.glhc-cookie-preferences');if(p){p.hidden=false;var a=p.querySelector('[name="glhc-analytics"]');var m=p.querySelector('[name="glhc-marketing"]');if(a)a.checked=current.analytics;if(m)m.checked=current.marketing;var f=p.querySelector('button');if(f)f.focus();}}
  function createUI(){
    if(document.querySelector('.glhc-cookie-banner'))return;
    var policy='/Cookie-Policy/';
    var banner=document.createElement('section');banner.className='glhc-cookie-banner';banner.hidden=true;banner.setAttribute('role','region');banner.setAttribute('aria-label','Cookie preferences');
    banner.innerHTML='<h2>Respecting your privacy</h2><p>We use essential browser storage to remember your cookie choice. Optional analytics will remain off unless you allow it. You can change your choice at any time.</p><div class="glhc-cookie-actions"><button type="button" data-cookie-accept>Accept all</button><button type="button" class="secondary" data-cookie-reject>Reject optional</button><button type="button" class="secondary" data-cookie-settings>Preferences</button><a href="'+policy+'">Cookie policy</a></div>';
    var modal=document.createElement('div');modal.className='glhc-cookie-preferences';modal.hidden=true;modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-labelledby','glhc-cookie-title');
    modal.innerHTML='<div class="glhc-cookie-preferences-panel"><h2 id="glhc-cookie-title">Cookie preferences</h2><p>Choose whether this website may use optional analytics. Essential storage is always active because it remembers your choice.</p><div class="glhc-cookie-choice"><input type="checkbox" checked disabled aria-label="Essential storage always active"><div><strong>Essential storage</strong><small>Remembers your cookie preference. This cannot be switched off through this panel.</small></div></div><div class="glhc-cookie-choice"><input type="checkbox" name="glhc-analytics"><div><strong>Analytics</strong><small>Allows Google Analytics 4 only if the site owner has configured a measurement ID.</small></div></div><div class="glhc-cookie-choice"><input type="checkbox" name="glhc-marketing" disabled><div><strong>Marketing</strong><small>Currently unavailable; no marketing cookies are activated by this website.</small></div></div><div class="glhc-cookie-actions"><button type="button" data-cookie-save>Save preferences</button><button type="button" class="secondary" data-cookie-close>Cancel</button></div></div>';
    document.body.appendChild(banner);document.body.appendChild(modal);
    banner.addEventListener('click',function(e){if(e.target.closest('[data-cookie-accept]'))save({analytics:true});else if(e.target.closest('[data-cookie-reject]'))save({analytics:false});else if(e.target.closest('[data-cookie-settings]'))openPreferences();});
    modal.addEventListener('click',function(e){if(e.target===modal||e.target.closest('[data-cookie-close]'))closePreferences();if(e.target.closest('[data-cookie-save]')){var a=modal.querySelector('[name="glhc-analytics"]');save({analytics:!!(a&&a.checked),marketing:false});}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closePreferences();});
    var footer=document.querySelector('.footer-info-box');if(footer&&!footer.querySelector('[data-cookie-policy-link]')){var sep=document.createElement('span');sep.className='sep';sep.textContent=' | ';var link=document.createElement('a');link.href=policy;link.className='terms';link.textContent='Cookie Policy';link.setAttribute('data-cookie-policy-link','');footer.appendChild(sep);footer.appendChild(link);}
    var settings=document.createElement('button');settings.type='button';settings.className='glhc-cookie-settings-link';settings.textContent='Cookie settings';settings.addEventListener('click',function(){read();openPreferences();});
    var footerNode=document.querySelector('footer.footer');if(footerNode)footerNode.appendChild(settings);
    if(!current.updatedAt)banner.hidden=false;
  }
  current=read();window.GLHCCookieConsent=current;
  document.addEventListener('DOMContentLoaded',createUI);
})();
