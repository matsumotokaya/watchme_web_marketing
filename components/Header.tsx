'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 20, right: 20 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Calculate button position when menu opens
      const button = document.querySelector('.mobile-menu-button:not(.overlay-button)') as HTMLElement;
      if (button) {
        const rect = button.getBoundingClientRect();
        setButtonPosition({
          top: rect.top,
          right: window.innerWidth - rect.right + 3, // Adjust 3px to the left
        });
      }
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <Link href="/">
            <Image
              src="/images/logo_watchme_001.svg"
              alt="WatchMe Logo"
              className="logo-image"
              width={150}
              height={40}
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="nav-menu">
          <Link href="/#features" className="nav-link">製品概要</Link>
          <Link href="/company/" className="nav-link">会社概要</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-button ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? '閉じる' : 'メニュー'}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <line
              className="line line-top"
              x1="6" y1="13" x2="30" y2="13"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              className="line line-bottom"
              x1="6" y1="23" x2="30" y2="23"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay - Rendered via Portal */}
      {mounted && isMobileMenuOpen && createPortal(
        <div className="mobile-menu-overlay">
          {/* Close button inside overlay */}
          <button
            className="mobile-menu-button overlay-button open"
            onClick={closeMobileMenu}
            aria-label="閉じる"
            style={{
              top: `${buttonPosition.top}px`,
              right: `${buttonPosition.right}px`,
            }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <line
                className="line line-top"
                x1="6" y1="13" x2="30" y2="13"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                className="line line-bottom"
                x1="6" y1="23" x2="30" y2="23"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="mobile-menu-content">
            <Link href="/" className="mobile-nav-link" onClick={closeMobileMenu}>
              TOP
            </Link>
            <Link href="/#features" className="mobile-nav-link" onClick={closeMobileMenu}>
              製品概要
            </Link>
            <Link href="/company/" className="mobile-nav-link" onClick={closeMobileMenu}>
              会社概要
            </Link>
          </div>
        </div>,
        document.body
      )}
    </nav>
  );
}
