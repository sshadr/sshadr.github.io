(function () {
  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function updateIcon(btn, theme) {
    btn.innerHTML = theme === 'light'
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;

    updateIcon(btn, currentTheme());

    btn.addEventListener('click', function () {
      var next = currentTheme() === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('site-theme', next); } catch (e) { /* ignore */ }
      updateIcon(btn, next);
      if (window.__setStarfieldTheme) window.__setStarfieldTheme(next === 'light');
    });
  });
})();
