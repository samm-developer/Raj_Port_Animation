import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { personalInfo } from '../data/portfolioData';
import MagneticButton from './MagneticButton';
import './Hero.css';

const nameParts = personalInfo.name.split(' ');

function NameLine({ text, lineIndex }) {
  return (
    <span className="hero-name-line" data-line={lineIndex}>
      {text.split('').map((char, i) => (
        <span key={i} className="hero-char-wrapper">
          <span className="hero-char">{char}</span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-char', {
        y: 120,
        rotateX: -90,
        opacity: 0,
        duration: 1,
        stagger: 0.04,
        ease: 'power4.out',
        delay: 0.3,
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.2,
        ease: 'power3.out',
      });

      gsap.to('.hero-orb', {
        y: '+=30',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.5, from: 'random' },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="hero-orbs">
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-orb orb-3" />
      </div>

      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <span className="badge-dot" />
          Available for opportunities
        </motion.div>

        <h1 className="hero-title">
          {nameParts.map((part, i) => (
            <NameLine key={part} text={part} lineIndex={i} />
          ))}
        </h1>

        <p className="hero-subtitle" ref={subtitleRef}>
          {personalInfo.title}
          <span className="hero-divider">—</span>
          {personalInfo.tagline}
        </p>

        <div className="hero-actions">
          <MagneticButton href="/work" variant="primary">
            View Projects
          </MagneticButton>
          <MagneticButton href="/contact" variant="outline">
            Get in Touch
          </MagneticButton>
        </div>

        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="scroll-line">
            <motion.div
              className="scroll-dot"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span>Scroll</span>
        </motion.div>
      </div>

      <div className="hero-stats">
        {[
          { value: '500+', label: 'DSA Problems' },
          { value: '40%', label: 'Faster Load Times' },
          { value: '3+', label: 'Years Experience' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="hero-stat"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 + i * 0.15, duration: 0.8 }}
          >
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
