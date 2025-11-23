/**
 * Mountain Parallax Effect
 * Applies parallax scrolling to the mountain image with throttling
 * Only enabled on wider screens (>= 768px)
 */

(function() {
    'use strict';
    
    // Throttle function to limit execution frequency
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function() {
            const context = this;
            const args = arguments;
            const currentTime = Date.now();
            
            clearTimeout(timeoutId);
            
            if (currentTime - lastExecTime >= delay) {
                func.apply(context, args);
                lastExecTime = currentTime;
            } else {
                timeoutId = setTimeout(() => {
                    func.apply(context, args);
                    lastExecTime = Date.now();
                }, delay);
            }
        };
    }
    
    // Check if viewport is wide enough for parallax
    function isWideScreen() {
        return window.innerWidth >= 768;
    }
    
    // Calculate and apply parallax offset
    function updateMountainParallax() {
        const mountainSection = document.querySelector('.mountain-section');
        const mountainImage = document.querySelector('.mountain-image');
        
        if (!mountainSection || !mountainImage) {
            return;
        }
        
        // Only apply parallax on wide screens
        if (!isWideScreen()) {
            mountainImage.style.setProperty('--mountain-offset', `0px`);
            return;
        }
        
        // Get section position relative to viewport
        const rect = mountainSection.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        
        // Calculate parallax only when section is in viewport
        if (sectionTop < viewportHeight && sectionTop + sectionHeight > 0) {
            // Calculate scroll progress through the section
            // Ranges from 0 (section entering viewport) to 1 (section leaving viewport)
            const scrollProgress = (viewportHeight - sectionTop) / (viewportHeight + sectionHeight);
            
            // Apply parallax offset (adjust multiplier for desired effect strength)
            const maxOffset = 50; // Maximum offset in pixels
            const offset = (scrollProgress - 0.5) * maxOffset;
            
            mountainImage.style.setProperty('--mountain-offset', `${offset}px`);
        }
    }
    
    // Throttled version of the parallax update function
    const throttledUpdate = throttle(updateMountainParallax, 16); // ~60fps
    
    // Initialize parallax effect
    function init() {
        // Update on scroll
        window.addEventListener('scroll', throttledUpdate, { passive: true });
        
        // Update on resize
        window.addEventListener('resize', throttledUpdate);
        
        // Initial calculation
        updateMountainParallax();
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
/* Mountain Parallax Scroll Handler */

(function() {
  'use strict';
  
  // Throttle function to limit scroll event firing
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // Update mountain offset based on scroll position
  function updateMountainParallax() {
    const mountainSection = document.querySelector('.mountain-section');
    if (!mountainSection) return;
    
    const rect = mountainSection.getBoundingClientRect();
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    const sectionTop = rect.top + scrolled;
    const sectionHeight = mountainSection.offsetHeight;
    const windowHeight = window.innerHeight;
    
    // Calculate offset when section is in viewport
    if (rect.top < windowHeight && rect.bottom > 0) {
      const offset = (scrolled - sectionTop + windowHeight) * 0.3;
      document.documentElement.style.setProperty('--mountain-offset', offset + 'px');
    }
  }
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    // Initialize on page load
    window.addEventListener('load', updateMountainParallax);
    
    // Update on scroll with throttling
    window.addEventListener('scroll', throttle(updateMountainParallax, 16));
    
    // Update on resize
    window.addEventListener('resize', throttle(updateMountainParallax, 100));
  }
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
