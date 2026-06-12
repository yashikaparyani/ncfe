import Link from 'next/link';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { footerNav, siteConfig } from '@/config/site';
import './Footer.css';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon" aria-hidden="true">
                N
              </span>
              {siteConfig.name}
            </div>
            <p className="footer__desc">
              {siteConfig.legalName}.<br />
              Promoting financial literacy across India in multiple regional languages.
            </p>
            <div className="footer__trust">
              <ShieldCheck size={14} aria-hidden="true" />
              Government of India recognised
            </div>
          </div>

          {footerNav.map((section) => (
            <div key={section.title}>
              <h2 className="footer__col-title">{section.title}</h2>
              <nav className="footer__nav" aria-label={section.title}>
                {section.links.map((link) => (
                  <Link key={link.to + link.label} href={link.to} className="footer__link">
                    <ChevronRight size={12} aria-hidden="true" /> {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <div>
            &copy; {currentYear} {siteConfig.legalName}. All rights reserved.
          </div>
          <div className="footer__legal">
            <Link href="/privacy-policy" className="footer__legal-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer__legal-link">
              Terms of Use
            </Link>
            <Link href="/accessibility" className="footer__legal-link">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
