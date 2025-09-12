(function(){
  function normalizePath(p){
    try { var u = new URL(p, location.origin); return u.pathname.replace(/\/+$/, ''); }
    catch(e){ return p; }
  }
  function sameFile(a, b){ return a.replace(/^\.\//,'') === b.replace(/^\.\//,''); }
  function setHTML(el, html){ if(el) el.innerHTML = html; }

  // Build an href that stays inside the current directory (e.g. /MA_ResearchLog/log/)
  function hrefFor(p){
    // Strip any accidental leading slash from JSON
    var rel = (p || '').replace(/^\//,'');
    // baseDir = current folder, e.g. /MA_ResearchLog/log/
    var baseDir = location.pathname.replace(/\/[^\/]*$/, '/') ;
    return new URL(rel, location.origin + baseDir).href;
  }

  document.addEventListener('DOMContentLoaded', function(){
    var mount = document.querySelector('#prev-next');
    if(!mount) return;

    // Try likely JSON locations (works locally & on GitHub Pages)
    var candidates = [
      '../assets/weeks.json',   // when page is /log/week-xx.html
      '/MA_ResearchLog/assets/weeks.json', // GH Pages repo path (optional safety)
      '/assets/weeks.json',    // absolute from site root (works on custom domains)
      './assets/weeks.json'    // if logs live at root
    ];

    function loadFirst(paths){
      return new Promise(function(resolve, reject){
        (function tryNext(i){
          if(i >= paths.length) return reject(new Error('No weeks.json found at: ' + paths.join(', ')));
          fetch(paths[i], {cache:'no-store'})
            .then(r => { if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
            .then(json => resolve(json))
            .catch(() => tryNext(i+1));
        })(0);
      });
    }

    function render(list){
      // Identify current file name (e.g. week-04.html)
      var parts = location.pathname.split('/');
      var file = parts[parts.length-1] || 'index.html';

      // Find current index by matching file names (ignores JSON path prefixes)
      var idx = list.findIndex(it =>
        sameFile(normalizePath(it.path), normalizePath('./'+file)) ||
        sameFile(normalizePath(it.path), normalizePath(file))
      );

      var prev = (idx > 0) ? list[idx-1] : null;
      var next = (idx >= 0 && idx < list.length-1) ? list[idx+1] : null;

      var html = '';
      html += prev ? ('<li>← <a href="'+ hrefFor(prev.path) +'">'+ prev.title +'</a></li>') : '<li class="badge">Start</li>';
      html += next ? ('<li>→ <a href="'+ hrefFor(next.path) +'">'+ next.title +'</a></li>') : '<li class="badge">Latest</li>';
      setHTML(mount, html);
    }

    loadFirst(candidates)
      .then(render)
      .catch(function(err){
        // Most common causes: wrong path or opening via file://
        setHTML(mount,
          '<li class="badge">Navigation unavailable</li>'+
          '<li style="color:#666;font-size:.9rem;">Ensure assets/weeks.json exists and serve the site (not file://).</li>'
        );
        console.error('Prev/Next failed:', err);
      });
  });
})();
