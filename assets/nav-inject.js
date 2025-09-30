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

  const nav = mount.querySelector('#site-nav');
  const base = nav?.getAttribute('data-base') || '/';
  nav?.querySelectorAll('[data-path]').forEach(a => {
    const path = a.getAttribute('data-path') || '';
    a.setAttribute('href', base.replace(/\/$/, '/') + path.replace(/^\//, ''));
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
