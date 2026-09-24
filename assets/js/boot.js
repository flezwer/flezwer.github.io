/* Apply the saved accent before first paint so the page never flashes blue. */
try {
  var a = JSON.parse(localStorage.getItem('abyss-site-accent') || 'null');
  if (a && a.accent) {
    var r = document.documentElement.style;
    r.setProperty('--accent', a.accent); r.setProperty('--accent-dim', a.dim);
    r.setProperty('--accent-bright', a.bright); r.setProperty('--on-accent', a.on);
    r.setProperty('--on-accent-pill', a.pill); if (a.fill) r.setProperty('--fill', a.fill);
  }
} catch (e) {}
document.documentElement.classList.add('js');
