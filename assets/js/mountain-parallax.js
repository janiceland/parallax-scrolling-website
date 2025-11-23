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
/*====== MOUNTAIN PARALLAX EFFECT ======*/
// Add subtle additional parallax effect to mountain image using CSS variables
// This works in conjunction with Rellax.js for enhanced visual depth

(function() {
    const mountainSection = document.querySelector('.mountain-section');
    
    if (!mountainSection) return;

    let ticking = false;

    // Throttled scroll handler for performance
    function updateMountainPosition() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calculate parallax offset only on larger screens
        if (window.innerWidth >= 768) {
            // Subtle additional transform for extra depth
            const offset = (scrollY / windowHeight) * 15; // Slower movement
            mountainSection.style.setProperty('--mountain-offset', `${offset}px`);
        }
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateMountainPosition);
            ticking = true;
        }
    }

    // Listen to scroll events with throttling
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initial position
    updateMountainPosition();
})();
