import Link from 'next/link';
import Image from 'next/image';
import { UserPlus, Building2, ArrowRight } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero-section">
      {/* Full-width background image (LCP — eagerly loaded). */}
      <div className="hero__bg">
        <Image
          src="/assets/hero_bg.png"
          alt="Students engaged in financial literacy learning"
          className="hero__bg-img"
          fill
          priority
          sizes="100vw"
          quality={70}
        />
      </div>

      {/* Text content overlay */}
      <div className="hero__content-wrapper">
        <div className="hero__content">
          <h1 className="hero__heading">
            Empowering India
            <br />
            Through Financial
            <br />
            Literacy
          </h1>

          <span className="hero__accent" aria-hidden="true" />

          <p className="hero__description">
            NCFE drives financial literacy and empowers individuals with the knowledge, skills and
            confidence to build a secure financial future.
          </p>

          <div className="hero__cta-group">
            <Link
              href="/candidate/register"
              className="hero__btn hero__btn--primary"
              id="register-candidate-btn"
            >
              <UserPlus />
              Register as Candidate
            </Link>
            <Link
              href="/entity/register"
              className="hero__btn hero__btn--outline"
              id="register-entity-btn"
            >
              <Building2 />
              Register as Entity
            </Link>
          </div>

          <Link href="/login" className="hero__continue-link" id="continue-registration-link">
            Continue Registration
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
