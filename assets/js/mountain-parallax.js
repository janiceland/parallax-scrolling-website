/*====== MOUNTAIN PARALLAX EFFECT ======*/
// Add subtle additional parallax effect to mountain image using CSS variables
// This works in conjunction with Rellax.js for enhanced visual depth

(function() {
    const mountainSection = document.querySelector('.mountain-section');
    
    if (!mountainSection) return;

    let ticking = false;
    let lastScrollY = window.scrollY;

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
