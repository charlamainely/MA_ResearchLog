(function(){
  function norm(p){
    try { var u = new URL(p, location.origin); return u.pathname.replace(/\/+$/, ''); }
    catch(e){ return p; }
  }
  function sameFile(a, b){ return a.replace(/^\.\//,'') === b.replace(/^\.\//,''); }
  function setHTML(el, html){ if(el) el.innerHTML = html; }

  // Build an href relative to the current page's directory (GH Pages-safe)
  function hrefFor(relPath){
    var rel = (relPath || '').replace(/^\//,''); // strip accidental leading slash
    var baseDir = location.pathname.replace(/\/[^\/]*$/, '/'); // current folder
    return new URL(rel, location.origin + baseDir).href;
  }

  // Try multiple candidate JSON paths so it works locally and on Pages
  function loadJSON(candidates){
    return new Promise(function(resolve, reject){
      (function tryNext(i){
        if(i >= candidates.length) return reject(new Error('No JSON at: ' + candidates.join(', ')));
        fetch(candidates[i], {cache:'no-store'})
          .then(r => { if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
          .then(json => resolve(json))
          .catch(() => tryNext(i+1));
      })(0);
    });
  }

  function findIndexByFilename(list, currentFile){
    return list.findIndex(it =>
      sameFile(norm(it.path), norm('./'+currentFile)) ||
      sameFile(norm(it.path), norm(currentFile))
    );
  }

  function renderPrevNext(mount, list){
    var file = (location.pathname.split('/').pop() || 'index.html');
    var idx = findIndexByFilename(list, file);
    var prev = (idx > 0) ? list[idx-1] : null;
    var next = (idx >= 0 && idx < list.length-1) ? list[idx+1] : null;

    var html = '';
    html += prev ? ('<li>← <a href="'+ hrefFor(prev.path) +'">'+ prev.title +'</a></li>') : '<li class="badge">Start</li>';
    html += next ? ('<li>→ <a href="'+ hrefFor(next.path) +'">'+ next.title +'</a></li>') : '<li class="badge">Latest</li>';
    setHTML(mount, html);
  }

  document.addEventListener('DOMContentLoaded', function(){
    // Find all mounts: <ul data-prevnext data-json="../assets/weeks.json"></ul>
    var mounts = document.querySelectorAll('[data-prevnext]');
    if(!mounts.length) return;

    mounts.forEach(function(mount){
      // Allow per-mount JSON path override; else try sensible defaults
      var jsonHint = mount.getAttribute('data-json');
      var candidates = jsonHint ? [jsonHint] : [
        '../assets/weeks.json',     // typical when page is /section/page.html
        '../assets/literature.json',
        '../assets/casestudies.json',
        '../assets/fieldwork.json',
        '/assets/weeks.json',       // absolute (custom domains)
        '/assets/literature.json',
        '/assets/casestudies.json',
        '/assets/fieldwork.json',
        './assets/weeks.json'       // if pages live at root
      ];

      loadJSON(candidates).then(function(list){
        // Expect list like: [{ "title": "Week 01 …", "path": "week-01.html" }, ...]
        renderPrevNext(mount, list);
      }).catch(function(err){
        setHTML(mount,
          '<li class="badge">Navigation unavailable</li>'+
          '<li style="color:#666;font-size:.9rem;">Serve via http(s) and check data-json path.</li>'
        );
        console.error('PrevNext error:', err);
      });
    });
  });
})();
