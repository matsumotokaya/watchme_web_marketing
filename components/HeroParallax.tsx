'use client';

import { useEffect } from 'react';

export default function HeroParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroSection = document.querySelector('.hero') as HTMLElement;

      if (!heroSection) return;

      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

      if (scrolled <= heroBottom) {
        // Logo parallax (horizontal movement)
        const logoTop = document.querySelector('.hero-logo-top') as HTMLElement;
        const logoMiddle = document.querySelector('.hero-logo-middle') as HTMLElement;
        const logoBottom = document.querySelector('.hero-logo-bottom') as HTMLElement;

        if (logoTop) {
          const topX = -(scrolled * 0.5);
          logoTop.style.transform = `translateX(calc(-50% + ${topX}px))`;
        }

        if (logoMiddle) {
          const middleX = scrolled * 0.5;
          logoMiddle.style.transform = `translateX(calc(-50% + ${middleX}px))`;
        }

        if (logoBottom) {
          const bottomX = -(scrolled * 0.5);
          logoBottom.style.transform = `translateX(calc(-50% + ${bottomX}px))`;
        }

        // Person images parallax (horizontal movement - slower)
        const personSlowX = scrolled * 0.125;

        const personBlue = document.querySelector('.hero-person-blue-image') as HTMLElement;
        if (personBlue) {
          personBlue.style.transform = `translateX(${personSlowX}px) translateY(53%)`;
        }

        const personGreen = document.querySelector('.hero-person-green-image') as HTMLElement;
        if (personGreen) {
          personGreen.style.transform = `translateX(${personSlowX}px) translateY(29%)`;
        }

        // Device image parallax (vertical movement - upward)
        const deviceY = -(scrolled * 0.3);
        const deviceImage = document.querySelector('.hero-device-image') as HTMLElement;

        if (deviceImage) {
          const isDesktop = window.innerWidth > 768;
          const baseOffset = isDesktop ? '-25%' : '-12.5%';
          deviceImage.style.transform = `translateY(calc(${baseOffset} + ${deviceY}px))`;
        }

        // Floating icons parallax (vertical movement - slower)
        const iconY = -(scrolled * 0.075);

        const icon1 = document.querySelector('.hero-device-icon-1') as HTMLElement;
        const icon2 = document.querySelector('.hero-device-icon-2') as HTMLElement;
        const icon3 = document.querySelector('.hero-device-icon-3') as HTMLElement;

        if (icon1) icon1.style.transform = `translateY(${iconY}px)`;
        if (icon2) icon2.style.transform = `translateY(${iconY}px)`;
        if (icon3) icon3.style.transform = `translateY(${iconY}px)`;
      }
    };

    // Throttle function for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);

    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  return null;
}
