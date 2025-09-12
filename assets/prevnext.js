(function(){
  function normalizePath(p){
    try { var u = new URL(p, location.origin); return u.pathname.replace(/\/+$/, ''); }
    catch(e){ return p; }
  }
  function sameFile(a, b){ return a.replace(/^\.\//,'') === b.replace(/^\.\//,''); }
  function setHTML(el, html){ if(el) el.innerHTML = html; }

  document.addEventListener('DOMContentLoaded', function(){
    var mount = document.querySelector('#prev-next');
    if(!mount) return;

    // Try a few likely locations for weeks.json
    var candidates = [
      '../assets/weeks.json',   // when page is in /log/
      '/assets/weeks.json',    // absolute from root
      './assets/weeks.json'    // fallback if pages are at root
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
      var parts = location.pathname.split('/');
      var file = parts[parts.length-1] || 'index.html';
      var idx = list.findIndex(it =>
        sameFile(normalizePath(it.path), normalizePath('./'+file)) ||
        sameFile(normalizePath(it.path), normalizePath(file)) ||
        sameFile(normalizePath(it.path), normalizePath('/log/'+file))
      );
      var prev = (idx > 0) ? list[idx-1] : null;
      var next = (idx >= 0 && idx < list.length-1) ? list[idx+1] : null;

      var html = '';
      html += prev ? ('<li>← <a href="'+prev.path+'">'+prev.title+'</a></li>') : '<li class="badge">Start</li>';
      html += next ? ('<li>→ <a href="'+next.path+'">'+next.title+'</a></li>') : '<li class="badge">Latest</li>';
      setHTML(mount, html);
    }

    loadFirst(candidates)
      .then(render)
      .catch(function(err){
        setHTML(mount,
          '<li class="badge">Navigation unavailable</li>'+
          '<li style="color:#666;font-size:.9rem;">Tip: run via local server (not file://) and ensure /assets/weeks.json exists.</li>'
        );
        console.error('Prev/Next failed:', err);
      });
  });
})();
