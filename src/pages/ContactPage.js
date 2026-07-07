import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import MagneticButton from '../components/MagneticButton';
import { personalInfo } from '../data/portfolioData';
import './ContactPage.css';

const terminalLines = [
  { prompt: '$', text: 'whoami', delay: 0 },
  { prompt: '>', text: 'Rajat Keshari — Software Developer', delay: 800 },
  { prompt: '$', text: 'location', delay: 1600 },
  { prompt: '>', text: personalInfo.location, delay: 2200 },
  { prompt: '$', text: 'status', delay: 2800 },
  { prompt: '>', text: 'Open to new opportunities ✓', delay: 3400 },
];

const socials = [
  { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
  { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: 'Email' },
];

export default function ContactPage() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    terminalLines.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 4000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="contact-page">

      <section className="contact-hero">
        <motion.h1
          className={`contact-glitch-title ${glitch ? 'glitching' : ''}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          Let's Talk
          <span className="glitch-layer" aria-hidden>Let's Talk</span>
          <span className="glitch-layer" aria-hidden>Let's Talk</span>
        </motion.h1>
        <p className="contact-hero-sub">Have a project in mind? I'd love to hear about it.</p>
      </section>

      <div className="contact-layout container">
        {/* Terminal */}
        <motion.div
          className="terminal"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="terminal-bar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="terminal-title">rajat@portfolio ~</span>
          </div>
          <div className="terminal-body">
            {terminalLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="terminal-line">
                <span className="terminal-prompt">{line.prompt}</span>
                <span className={line.prompt === '$' ? 'terminal-cmd' : 'terminal-output'}>
                  {line.text}
                </span>
                {i === visibleLines - 1 && visibleLines < terminalLines.length && (
                  <span className="terminal-cursor">▋</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact info */}
        <motion.div
          className="contact-details"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { icon: FaEnvelope, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
            { icon: FaPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
            { icon: FaMapMarkerAlt, label: 'Location', value: personalInfo.location },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="contact-detail-row"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.15 }}
              whileHover={{ x: 10 }}
            >
              <item.icon className="contact-detail-icon" />
              <div>
                <span className="contact-detail-label">{item.label}</span>
                {item.href ? (
                  <a href={item.href} className="contact-detail-value" data-cursor="pointer">
                    {item.value}
                  </a>
                ) : (
                  <span className="contact-detail-value">{item.value}</span>
                )}
              </div>
            </motion.div>
          ))}

          <div className="contact-socials">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-btn"
                data-cursor="pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={s.label}
              >
                <s.icon />
              </motion.a>
            ))}
          </div>

          <MagneticButton href={`mailto:${personalInfo.email}`} variant="primary">
            Send Message
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  );
}
