import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data/portfolioData';
import SectionHeading from './SectionHeading';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-word', {
        opacity: 0.1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = personalInfo.bio.split(' ');

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">
        <SectionHeading number="01" title="About Me" />

        <div className="about-grid">
          <div className="about-text" ref={textRef}>
            <p className="about-bio">
              {words.map((word, i) => (
                <span key={i} className="about-word">
                  {word}{' '}
                </span>
              ))}
            </p>
          </div>

          <motion.div
            className="about-details"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
              { label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
              { label: 'Location', value: personalInfo.location },
              { label: 'Website', value: 'rajat-porfile.netlify.app', href: personalInfo.website },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="detail-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 8 }}
              >
                <span className="detail-label">{item.label}</span>
                {item.href ? (
                  <a href={item.href} className="detail-value" data-cursor="pointer" target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    {item.value}
                  </a>
                ) : (
                  <span className="detail-value">{item.value}</span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
