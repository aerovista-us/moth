(function(){
  function withUTM(url, params){
    try{ const u = new URL(url, location.href); Object.entries(params).forEach(([k,v])=>u.searchParams.set(k,v)); return u.toString(); }
    catch(e){ return url; }
  }
  window.applyEtsyUTM = function(){
    document.querySelectorAll('a.etsy-link, a[data-etsy-link], a[href*="etsy.com"]').forEach(a=>{
      const sku = a.getAttribute('data-sku') || '';
      const content = (a.getAttribute('data-content') || sku || 'buy-btn').toLowerCase();
      a.href = withUTM(a.href, {utm_source:'site',utm_medium:'btn',utm_campaign:'etsy_poc',utm_content:content});
    });
  };
  if(document.readyState!=='loading') window.applyEtsyUTM();
  else document.addEventListener('DOMContentLoaded', window.applyEtsyUTM);
})();