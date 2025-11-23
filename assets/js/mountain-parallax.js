/* Mountain Parallax Script */
(function() {
  'use strict';
  
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
    if (window.innerWidth < 768) {
      return;
    }
    
    const mountainSections = document.querySelectorAll('.mountain-section');
    
    mountainSections.forEach(function(section) {
      const rect = section.getBoundingClientRect();
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      const sectionTop = rect.top + scrolled;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate if section is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate parallax offset based on scroll position
        const scrollProgress = (scrolled - sectionTop + windowHeight) / (windowHeight + sectionHeight);
        const offset = (scrollProgress - 0.5) * 50; // Adjust multiplier for effect strength
        
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
})();
