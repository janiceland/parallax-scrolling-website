// Lightweight parallax for .mountain-section
(function () {
  const MOBILE_BREAKPOINT = 768;
  const VIEWPORT_BUFFER = 100;
  const THROTTLE_DELAY = 50;
  const MAX_PARALLAX_OFFSET = 30;

  const throttle = (fn, wait) => {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn.apply(this, args);
      }
    };
  };

  function updateParallax() {
    const sections = document.querySelectorAll('.mountain-section');
    const viewportHeight = window.innerHeight;

    sections.forEach(section => {
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        section.style.removeProperty('--mountain-offset');
        return;
      }

      const rect = section.getBoundingClientRect();
      if (rect.bottom < -VIEWPORT_BUFFER || rect.top > viewportHeight + VIEWPORT_BUFFER) {
        return;
      }

      const sectionCenter = rect.top + rect.height / 2;
      const offset = (viewportHeight / 2 - sectionCenter) / (viewportHeight / 2) * MAX_PARALLAX_OFFSET;
      section.style.setProperty('--mountain-offset', `${offset}px`);
    });
  }

  const throttled = throttle(updateParallax, THROTTLE_DELAY);
  window.addEventListener('scroll', throttled, { passive: true });
  window.addEventListener('resize', throttled);
  document.addEventListener('DOMContentLoaded', updateParallax);
})();
