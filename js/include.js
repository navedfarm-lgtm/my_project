// include.js — Hybrid path loader (works both local + GitHub Pages)
async function includeHTML(selector, path) {
  const el = document.querySelector(selector);
  if (!el) return;
  let basePath = "";
  try {
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (location.hostname.includes('github.io') && parts.length > 0) {
      basePath = '/' + parts[0];
    }
  } catch(e){ basePath = ""; }
  const fullPath = (basePath + '/' + path).replace(/\/{2,}/g, '/');
  try {
    const res = await fetch(fullPath);
    if (!res.ok) throw new Error('Fetch failed: ' + fullPath + ' ' + res.status);
    el.innerHTML = await res.text();
    const page = document.body.getAttribute('data-page') || '';
    if (page) {
      const a = el.querySelector('.nav-link[data-page="'+page+'"]');
      if (a) a.classList.add('active');
    }
    return true;
  } catch (err) {
    console.error('Include failed', fullPath, err);
    return false;
  }
}
window.includeHTML = includeHTML;
