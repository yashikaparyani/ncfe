'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { UserCircle, UserPlus, Clock } from 'lucide-react';
import { mainNav } from '@/config/site';
import AccessibilityMenu from './AccessibilityMenu';
import ScreenReader from './ScreenReader';
import './Header.css';

export default function Header() {
  const pathname = usePathname() || '/';
  const [scrolled, setScrolled] = useState(false);
  const [now, setNow] = useState<Date | null>(null); // null until mounted to avoid hydration mismatch

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = now?.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  const dateStr = now?.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`} id="site-header">
      {/* Government identity ribbon */}
      <div className="header__govbar">
        <div className="header__govbar-inner">
          {/* Left: national identity */}
          <div className="header__gov-id">
            <span className="header__flag" aria-hidden="true" />
            <Clock size={14} aria-hidden="true" />
            <span className="header__gov-text header__clock" suppressHydrationWarning>
              {now ? `${timeStr} ${dateStr}` : ''}
            </span>
          </div>

          {/* Right: utility controls */}
          <div className="header__gov-utils">
            <a href="#main-content" className="header__skip">
              Skip to main content
            </a>

            <span className="header__util-sep" aria-hidden="true" />

            <ScreenReader />

            <span className="header__util-sep" aria-hidden="true" />

            <AccessibilityMenu />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="header__inner">
        {/* Logo */}
        <Link
          href="/"
          className="header__logo"
          aria-label="NCFE — National Centre for Financial Education, Home"
        >
          <Image
            src="/assets/ncfe_logo.png"
            alt="National Centre for Financial Education"
            className="header__logo-img"
            width={180}
            height={54}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="header__nav" aria-label="Main navigation">
          {mainNav.map((link) => {
            const isActive = pathname === link.to || pathname.startsWith(`${link.to}/`);
            return (
              <Link
                key={link.label}
                href={link.to}
                className={`header__nav-link${isActive ? ' header__nav-link--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="header__actions">
          <Link href="/login" className="header__login-btn">
            <UserCircle size={18} />
            <span>Login</span>
          </Link>
          <Link href="/candidate/register" className="header__register-btn">
            <UserPlus size={18} />
            <span>Register</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
