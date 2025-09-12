
(function(){
  function normalizePath(p){
    try{ var u = new URL(p, location.origin); return u.pathname.replace(/\/+$/, ''); }
    catch(e){ return p; }
  }
  function sameFile(a, b){
    // Treat "./week-04.html" and "week-04.html" as equal
    return a.replace(/^\.\//,'') === b.replace(/^\.\//,'');
  }
  document.addEventListener('DOMContentLoaded', function(){
    var mount = document.querySelector('#prev-next');
    if(!mount) return;
    // Resolve the JSON relative to this page (../assets/weeks.json from /log/)
    fetch('weeks.json', {cache:'no-store'})
      .then(r => r.json())
      .then(list => {
        // Current page path relative to /log/
        var parts = location.pathname.split('/');
        var file = parts[parts.length-1]; // e.g., "week-04.html"
        var idx = list.findIndex(it => sameFile(it.path, './' + file) || sameFile(it.path, file));
        var prev = (idx>0) ? list[idx-1] : null;
        var next = (idx>=0 && idx<list.length-1) ? list[idx+1] : null;
        var html = '';
        html += prev ? ('<li>← <a href="'+prev.path+'">'+prev.title+'</a></li>') : '<li class="badge">Start</li>';
        html += next ? ('<li>→ <a href="'+next.path+'">'+next.title+'</a></li>') : '<li class="badge">Latest</li>';
        mount.innerHTML = html;
      })
      .catch(err => console.error('Prev/Next load failed', err));
  });
})();
