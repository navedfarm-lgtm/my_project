// include.js — Smart auto-path include loader (works both local + GitHub Pages)
async function includeHTML(selector, path) {
  const el = document.querySelector(selector);
  if (!el) return;

  // Detect the base path (e.g., "/my_project" or "" on root)
  const basePath = (() => {
    const parts = window.location.pathname.split('/');
    if (parts.length > 1 && parts[1] !== '') {
      return '/' + parts[1];
    }
    return '';
  })();

  // Normalize the file path
  const fullPath = `${basePath}/${path}`.replace(/\/{2,}/g, '/');

  try {
    const res = await fetch(fullPath);
    if (!res.ok) throw new Error(`Fetch failed: ${fullPath}`);
    const html = await res.text();
    el.innerHTML = html;

    // Mark active menu link
    const page = document.body.dataset.page;
    if (page) {
      const a = el.querySelector(`.nav-link[data-page="${page}"]`);
      if (a) a.classList.add('active');
    }
  } catch (err) {
    console.error('Include failed', err);
  }
}
