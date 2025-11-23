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
      document.documentElement.style.setProperty('--mountain-offset', offset);
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
})();
