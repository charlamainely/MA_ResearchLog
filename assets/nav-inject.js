(async function(){
  // 1) Find where to load navbar.html from (works on root & subpages)
  const candidates = [
    'assets/navbar.html',     // when page is at site root (/index.html)
    '../assets/navbar.html',  // when page is one folder deep (/log/…, /literature/…)
    '/assets/navbar.html'     // fallback for custom domains
  ];
  async function loadFirst(paths){
    for (const p of paths){
      try {
        const r = await fetch(p, {cache:'no-store'});
        if (r.ok) return await r.text();
      } catch(_){}
    }
    throw new Error('navbar.html not found at: ' + paths.join(', '));
  }

  // 2) Inject markup into placeholder
  const mount = document.getElementById('navbar');
  if (!mount) return; // nothing to do
  const html = await loadFirst(candidates);
  mount.innerHTML = html;

  // 3) Compute base prefix for GitHub Pages project sites
  //    - user.github.io/<repo>/...  => base "/<repo>/"
  //    - local server or custom domain at root => "/"
  const parts = location.pathname.split('/').filter(Boolean);
  const isGH = location.hostname.endsWith('.github.io');
  const base = (isGH && parts.length > 0) ? ('/' + parts[0] + '/') : '/';

  // 4) Convert all <a data-path="..."> to proper hrefs
  document.querySelectorAll('#site-nav a[data-path]').forEach(a => {
    const rel = a.getAttribute('data-path').replace(/^\/+/, '');
    a.setAttribute('href', base + rel);
  });

  // 5) (Optional) Mark the active link
  const here = location.pathname.replace(/\/+$/, '');
  document.querySelectorAll('#site-nav a[href]').forEach(a => {
    const target = new URL(a.href, location.origin).pathname.replace(/\/+$/, '');
    if (target === here) {
      a.setAttribute('aria-current', 'page');
      a.classList.add('font-semibold', 'text-gray-900');
    }
  });
})();