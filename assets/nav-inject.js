(async function () {
  const mount = document.getElementById('navbar');
  if (!mount) return;

  const res = await fetch((window.location.pathname.includes('/literature/') ||
                           window.location.pathname.includes('/cases/') ||
                           window.location.pathname.includes('/fieldwork/') ||
                           window.location.pathname.includes('/peer/') ||
                           window.location.pathname.includes('/framework/'))
                          ? '../assets/navbar.html' : 'assets/navbar.html', { cache: 'no-store' });

  const html = await res.text();
  mount.innerHTML = html;

  // inside the IIFE, after mount.innerHTML = html;
const nav = mount.querySelector('#site-nav');

// Decide the correct base path:
// 1) Prefer explicit data-base on the nav
// 2) Otherwise, auto-detect:
//    - On GitHub Pages project sites: "/<repo>/"
//    - On local subfolders: "/<top-folder>/"
//    - Fallback to "/"
function computeBase() {
  const hint = nav?.getAttribute('data-base');
  if (hint && hint.trim()) {
    // normalize to "/something/"
    return ('/' + hint.replace(/^\/|\/$/g, '') + '/').replace(/\/{2,}/g, '/');
  }
  const parts = location.pathname.split('/').filter(Boolean);
  if (location.hostname.endsWith('github.io') && parts.length >= 1) {
    // https://username.github.io/<repo>/...
    return '/' + parts[0] + '/';
  }
  // Local or other hosting: use first folder as base if present
  if (parts.length >= 1) {
    return '/' + parts[0] + '/';
  }
  return '/';
}

const base = computeBase();

// Rewrite all data-path links to ABSOLUTE URLs using base + path
nav?.querySelectorAll('[data-path]').forEach(a => {
  const path = (a.getAttribute('data-path') || '').replace(/^\//, '');
  a.setAttribute('href', new URL(path, location.origin + base).href);
});


  // Hamburger toggle
  const btn   = nav?.querySelector('#menu-toggle');
  const panel = nav?.querySelector('#nav-panel');
  if (btn && panel) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close menu on resize back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    // Close after clicking a link (mobile)
    panel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
})();
