(function(){
  'use strict';
  function showNotice(container, message){
    if(!container) return;
    var old=container.querySelector('.static-form-notice');
    if(!old){old=document.createElement('p');old.className='static-form-notice';old.setAttribute('role','status');old.setAttribute('aria-live','polite');container.appendChild(old);}
    old.textContent=message;
    old.style.cssText='margin:16px 0;padding:12px 14px;border-left:4px solid #eab14d;background:#f7f8f5;color:#243126;font-weight:600;';
  }
  function goSearch(input){
    var q=(input && input.value || '').trim();
    if(q) window.location.href='/Search/?q='+encodeURIComponent(q);
    else if(input) input.focus();
    else window.location.href='/Search/';
  }
  document.addEventListener('DOMContentLoaded',function(){
    // DNN search replacement: local static index.
    document.querySelectorAll('[data-search-toggle]').forEach(function(btn){
      btn.addEventListener('click',function(){
        var wrap=btn.parentElement;
        var input=wrap && wrap.querySelector('input[data-static-search]');
        if(!input) input=document.querySelector('input[data-static-search]');
        if(input && input.value.trim()) goSearch(input); else if(input) input.focus(); else window.location.href='/Search/';
      });
    });
    document.querySelectorAll('input[data-static-search]').forEach(function(input){
      input.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();goSearch(input);}});
    });
    document.querySelectorAll('[data-search-submit]').forEach(function(a){
      a.addEventListener('click',function(e){e.preventDefault();var input=document.querySelector('input[data-static-search]');goSearch(input);});
    });
    // Mobile menu fallback; retain the site's original menu classes.
    document.querySelectorAll('.mobile-menu-icon').forEach(function(btn){
      btn.addEventListener('click',function(){
        var menu=document.querySelector('.mobilemenu-main');
        if(menu){menu.classList.add('active');btn.setAttribute('aria-expanded','true');document.documentElement.classList.add('opne-mobilemenu');}
      });
    });
    document.querySelectorAll('.mobileclose').forEach(function(btn){
      btn.addEventListener('click',function(){
        var menu=document.querySelector('.mobilemenu-main');
        if(menu){menu.classList.remove('active');document.documentElement.classList.remove('opne-mobilemenu');}
        document.querySelectorAll('.mobile-menu-icon').forEach(function(b){b.setAttribute('aria-expanded','false');});
      });
    });
    document.querySelectorAll('[data-audio-missing]').forEach(function(btn){
      btn.addEventListener('click',function(e){
        e.preventDefault();
        showNotice(btn.parentElement,'The original audio file was not included in the HTTrack archive. Audio playback is unavailable until the original MP3 is recovered.');
      });
    });
    // Forms are intentionally not allowed to pretend to submit before an approved service endpoint is configured.
    document.querySelectorAll('[data-static-form="contact"]').forEach(function(btn){
      btn.addEventListener('click',function(){
        var form=btn.closest('.dng-form')||btn.parentElement;
        showNotice(form,'Contact form delivery is not configured on this static preview yet. Please call 404-649-2520 or email info@godslovehomecarellc.com until the client-approved form service is connected.');
      });
    });
    document.querySelectorAll('[data-static-form="newsletter"]').forEach(function(btn){
      btn.addEventListener('click',function(){
        var form=btn.closest('.dng-form')||btn.parentElement;
        showNotice(form,'Newsletter sign-up is not connected yet. No email address has been submitted or stored.');
      });
    });
    document.querySelectorAll('[data-static-form="application"]').forEach(function(btn){
      btn.addEventListener('click',function(){
        var form=btn.closest('.dng-form')||btn.parentElement;
        showNotice(form,'Job application submission is not enabled on this static preview. Do not enter or submit Social Security numbers or other sensitive information until the client-approved secure application service is connected.');
      });
    });
  });
})();