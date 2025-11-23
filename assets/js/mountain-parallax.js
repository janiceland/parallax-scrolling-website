// Lightweight parallax for .mountain-section
(function () {
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
      if (window.innerWidth < 768) {
        section.style.removeProperty('--mountain-offset');
        return;
      }

      const rect = section.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > viewportHeight + 100) {
        return;
      }

      const sectionCenter = rect.top + rect.height / 2;
      const maxOffset = 30;
      const offset = (viewportHeight / 2 - sectionCenter) / (viewportHeight / 2) * maxOffset;
      section.style.setProperty('--mountain-offset', `${offset}px`);
    });
  }

  const throttled = throttle(updateParallax, 50);
  window.addEventListener('scroll', throttled, { passive: true });
  window.addEventListener('resize', throttled);
  document.addEventListener('DOMContentLoaded', updateParallax);
})();
