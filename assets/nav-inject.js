// assets/nav-inject.js
(async function () {
  const mount = document.getElementById('navbar');
  if (!mount) return;

  // --- Robust fetch of navbar.html regardless of page depth ---
  async function fetchNavbar() {
    const tries = [
      '../assets/navbar.html',   // subpages like /literature/, /cases/, /fieldwork/, /peer/, /framework/
      'assets/navbar.html',      // root pages like /index.html
      './assets/navbar.html'     // some servers prefer explicit ./ on root
    ];
    for (const href of tries) {
      try {
        const res = await fetch(href, { cache: 'no-store' });
        if (res.ok) return await res.text();
      } catch (_) { /* continue */ }
    }
    throw new Error('Could not load assets/navbar.html from any known path.');
  }

  // --- Compute site base for absolute URLs ---
  function computeBase(navEl) {
    // 1) Prefer explicit data-base if present
    const hint = navEl?.getAttribute('data-base');
    if (hint && hint.trim()) {
      // normalize to "/segment/" form
      return ('/' + hint.replace(/^\/|\/$/g, '') + '/').replace(/\/{2,}/g, '/');
    }

    // 2) Auto-detect repo segment on GitHub Pages project sites
    const parts = location.pathname.split('/').filter(Boolean);
    if (location.hostname.endsWith('github.io') && parts.length >= 1) {
      // https://username.github.io/<repo>/...
      return '/' + parts[0] + '/';
    }

    // 3) Local dev or other hosting: use first folder if present, else "/"
    if (parts.length >= 1) return '/' + parts[0] + '/';
    return '/';
  }

  // --- Normalize for active-link comparison ---
  const norm = (p) =>
    ('/' + (p || '').replace(/^https?:\/\/[^/]+/i, '')
                    .replace(location.origin, '')
                    .replace(/[#?].*$/, '')
                    .replace(/index\.html?$/i, '')
                    .replace(/^\/+|\/+$/g, '') + '/');

  // --- Inject HTML ---
  let html = '';
  try {
    html = await fetchNavbar();
  } catch (err) {
    console.error(err);
    mount.innerHTML = '<!-- navbar failed to load -->';
    return;
  }
  mount.innerHTML = html;

  const nav = mount.querySelector('#site-nav');
  if (!nav) return;

  // --- Build absolute hrefs from data-path using computed base ---
  const base = computeBase(nav);
  nav.querySelectorAll('[data-path]').forEach(a => {
    const path = (a.getAttribute('data-path') || '').trim();
    if (!path) return;

    // Allow anchors-only paths to pass through
    if (path.startsWith('#')) {
      a.setAttribute('href', path);
      return;
    }

    // Build absolute URL from base + cleaned path (no leading slash)
    const clean = path.replace(/^\//, '');
    const abs = new URL(clean, location.origin + base).href;
    a.setAttribute('href', abs);
  });

  // --- Mark active link (aria-current="page") ---
  const here = norm(location.pathname);
  nav.querySelectorAll('.nav-links a[href]').forEach(a => {
    const ap = norm(a.getAttribute('href'));
    if (ap === here) a.setAttribute('aria-current', 'page');
  });

  // --- Hamburger behavior ---
  const btn   = nav.querySelector('#menu-toggle');
  const panel = nav.querySelector('#nav-panel');

  function closeMenu() {
    if (!nav.classList.contains('open')) return;
    nav.classList.remove('open');
    btn?.setAttribute('aria-expanded', 'false');
  }

  if (btn && panel) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close after clicking a link (mobile UX)
    panel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close if resized back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    });

    // Optional: close on Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }
})();
