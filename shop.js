(function(){
  async function loadProducts(){
    try{
      const res = await fetch('shop-products.json', {cache:'no-store'});
      const data = await res.json();
      return data.products || [];
    }catch(e){ console.error('Failed to load products:', e); return []; }
  }
  function card(p){
    const el = document.createElement('article');
    el.className = 'card product';
    el.dataset.shape = p.shape; el.dataset.length = p.length; el.dataset.finish = p.finish;
    el.innerHTML = `
      <a class="thumb" href="products/${p.slug}.html" aria-label="View ${p.name}">
        <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" />
      </a>
      <div class="pad">
        <h3>${p.name}</h3>
        <div class="price"><strong>$${p.msrp.toFixed(0)}</strong> <span class="badge">${p.type}</span></div>
        <p class="muted">${p.shape} • ${p.length} • ${p.finish}</p>
        <div class="row">
          <a class="btn etsy-link" data-sku="${p.sku}" data-content="${p.slug}" href="${p.etsy_url}">Buy on Etsy</a>
          <a class="btn btn-secondary" href="products/${p.slug}.html">Details</a>
        </div>
      </div>`;
    return el;
  }
  async function render(){
    const grid = document.getElementById('shop-grid');
    if(!grid) return;
    const items = await loadProducts();
    items.forEach(p => grid.appendChild(card(p)));
    try{ if(window.applyEtsyUTM) window.applyEtsyUTM(); }catch(e){}
  }
  if(document.readyState!=='loading') render();
  else document.addEventListener('DOMContentLoaded', render);
})();