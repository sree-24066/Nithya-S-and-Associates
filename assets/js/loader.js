/* ============================================
   NITHYA S & ASSOCIATES — Loader
   Intro sequence animation
   ============================================ */

(function() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;

  document.body.classList.add('loading');

  // Sequence: logo 0.1–0.9s | text 0.5–1.2s | subtitle 0.7–1.4s
  const dismissTime = 2500;

  function dismissLoader() {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    // Remove from DOM after transition
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 900);
  }

  // Auto dismiss after animation completes
  setTimeout(dismissLoader, dismissTime);

  // Also dismiss on click
  loader.addEventListener('click', dismissLoader);

  // Safety: dismiss if page takes too long to load
  window.addEventListener('load', () => {
    setTimeout(dismissLoader, Math.max(0, dismissTime - performance.now()));
  });
})();
