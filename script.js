// script.js - main site JS (no external libraries)
document.addEventListener('DOMContentLoaded', function(){
  // load year
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // close mobile menu when clicking outside
  document.addEventListener('pointerdown', function(e){
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav.menu');
    if(!menuToggle || !nav) return;
    const inside = nav.contains(e.target);
    const toggleBtn = e.target.closest('label[for="menu-toggle"]');
    if(!inside && !toggleBtn) menuToggle.checked = false;
  });

  // Product dropdowns removed per request; product search handled separately
});

// Utility: fetch products JSON
async function fetchProducts(){
  try{
    const r = await fetch('data/products.json');
    if(!r.ok) throw new Error('no products');
    return await r.json();
  }catch(e){
    console.error(e);
    return [];
  }
}

// Home page search: searches only products.json and shows live results matching substring left-to-right
async function initHomeSearch(){
  const form = document.getElementById('home-search-form');
  const input = document.getElementById('home-search-input');
  const results = document.getElementById('home-search-results');
  if(!form || !input || !results) return;
  const products = await fetchProducts();

  input.addEventListener('input', ()=> {
    const q = input.value.trim().toLowerCase();
    if(!q){ results.innerHTML = ''; return; }
    const matches = products.filter(p => p.name.toLowerCase().includes(q));
    if(matches.length === 0){
      results.innerHTML = '<p class="small">No matches</p>';
      return;
    }
    results.innerHTML = '<ul>'+matches.map(m=>`<li><a href="${m.url}">${m.name}</a></li>`).join('')+'</ul>';
  });

  form.addEventListener('submit', (e)=> e.preventDefault());
}

// Product page search box (search within product items on that page)
function initProductsPageSearch(){
  const input = document.getElementById('products-search-input');
  const list = document.getElementById('products-list');
  if(!input || !list) return;
  input.addEventListener('input', ()=>{
    const q = input.value.trim().toLowerCase();
    const items = Array.from(list.querySelectorAll('li'));
    items.forEach(li=>{
      const txt = li.textContent.trim().toLowerCase();
      li.style.display = q === '' ? '' : (txt.includes(q) ? '' : 'none');
    });
  });
}

// Expose init functions to pages
window.includeHTML = includeHTML;
window.initHomeSearch = initHomeSearch;
window.initProductsPageSearch = initProductsPageSearch;
