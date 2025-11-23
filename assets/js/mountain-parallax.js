/* Mountain Parallax Script */
(function() {
  'use strict';
  
  // Configuration
  const PARALLAX_MULTIPLIER = 50; // Effect strength
  const MIN_WIDTH_FOR_PARALLAX = 768; // Match CSS breakpoint
  
  // Throttle function to limit how often scroll handler runs
  function throttle(func, wait) {
    let timeout;
    let lastRan;
    
    return function executedFunction() {
      const context = this;
      const args = arguments;
      
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          if ((Date.now() - lastRan) >= wait) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, wait - (Date.now() - lastRan));
      }
    };
  }
  
  // Update parallax offset
  function updateParallax() {
    // Only active when window width >= 768px
    if (window.innerWidth < MIN_WIDTH_FOR_PARALLAX) {
      return;
    }
    
    const mountainSections = document.querySelectorAll('.mountain-section');
    
    mountainSections.forEach(function(section) {
      const rect = section.getBoundingClientRect();
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      const sectionTop = rect.top + scrolled;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate if section is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate parallax offset based on scroll position
        const scrollProgress = (scrolled - sectionTop + windowHeight) / (windowHeight + sectionHeight);
        const offset = (scrollProgress - 0.5) * PARALLAX_MULTIPLIER;
        
        section.style.setProperty('--mountain-offset', offset + 'px');
      }
    });
  }
  
  // Throttled scroll handler
  const throttledUpdate = throttle(updateParallax, 16); // ~60fps
  
  // Initialize on page load
  function init() {
    updateParallax();
    window.addEventListener('scroll', throttledUpdate);
    window.addEventListener('resize', throttledUpdate);
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
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
