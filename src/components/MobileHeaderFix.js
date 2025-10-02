import React, { useEffect } from 'react';

// Component to handle mobile header visibility and sidebar behavior
const MobileHeaderFix = () => {
  useEffect(() => {
    const handleResize = () => {
      const mobileHeader = document.querySelector('.mobile-header');
      const desktopSidebar = document.querySelector('.header-sidebar');
      
      if (window.innerWidth <= 1199) {
        // Mobile view
        if (mobileHeader) {
          mobileHeader.style.display = 'flex';
          mobileHeader.style.visibility = 'visible';
          mobileHeader.style.opacity = '1';
        }
        if (desktopSidebar && !desktopSidebar.classList.contains('mobile-open')) {
          desktopSidebar.style.display = 'none';
          desktopSidebar.style.visibility = 'hidden';
          desktopSidebar.style.opacity = '0';
        }
      } else {
        // Desktop view
        if (mobileHeader) {
          mobileHeader.style.display = 'none';
          mobileHeader.style.visibility = 'hidden';
          mobileHeader.style.opacity = '0';
        }
        if (desktopSidebar) {
          desktopSidebar.style.display = 'block';
          desktopSidebar.style.visibility = 'visible';
          desktopSidebar.style.opacity = '1';
          desktopSidebar.classList.remove('mobile-open');
        }
      }
    };

    // Initial check
    handleResize();
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default MobileHeaderFix;
