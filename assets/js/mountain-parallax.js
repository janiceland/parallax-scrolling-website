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
                timeoutId = setTimeout(function() {
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
})();
