import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import SectionHeading from './SectionHeading';
import MagneticButton from './MagneticButton';
import './Contact.css';

const socials = [
  { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
  { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: 'Email' },
];

export default function Contact() {
  const sectionRef = useRef(null);

  return (
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="container">
        <SectionHeading number="06" title="Let's Connect" subtitle="Have a project in mind? Let's build something amazing." />

        <div className="contact-grid">
          <motion.div
            className="contact-cta"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="cta-title">
              Ready to create
              <span className="cta-highlight"> something extraordinary?</span>
            </h3>
            <p className="cta-text">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <MagneticButton href={`mailto:${personalInfo.email}`} variant="primary">
              Say Hello
            </MagneticButton>
          </motion.div>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              { icon: FaEnvelope, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
              { icon: FaPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
              { icon: FaMapMarkerAlt, label: 'Location', value: personalInfo.location },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="contact-item"
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <item.icon className="contact-icon" />
                <div>
                  <span className="contact-label">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} className="contact-value" data-cursor="pointer">{item.value}</a>
                  ) : (
                    <span className="contact-value">{item.value}</span>
                  )}
                </div>
              </motion.div>
            ))}

            <div className="social-links">
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  data-cursor="pointer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.15, borderColor: 'var(--accent-cyan)' }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="contact-bg-text">CONTACT</div>
    </section>
  );
}
