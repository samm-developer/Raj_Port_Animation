import { motion } from 'framer-motion';
import { skills } from '../data/portfolioData';
import SectionHeading from './SectionHeading';
import './Skills.css';

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <SectionHeading number="04" title="Skills" subtitle="Technologies I work with daily" />
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          {[...skills, ...skills].map((skill, i) => (
            <span key={i} className="marquee-item">
              {skill}
              <span className="marquee-dot">✦</span>
            </span>
          ))}
        </div>
        <div className="marquee-track reverse">
          {[...skills].reverse().concat([...skills].reverse()).map((skill, i) => (
            <span key={i} className="marquee-item alt">
              {skill}
              <span className="marquee-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container skills-orbit-wrap">
        <div className="skills-orbit">
          {skills.slice(0, 8).map((skill, i) => {
            const angle = (i / 8) * 360;
            return (
              <div
                key={skill}
                className="orbit-tag-wrapper"
                style={{ '--angle': `${angle}deg`, '--delay': `${i * 0.1}s` }}
              >
                <motion.span
                  className="orbit-tag"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.15 }}
                >
                  {skill}
                </motion.span>
              </div>
            );
          })}
          <div className="orbit-center">
            <span>MERN</span>
            <span className="orbit-sub">Stack</span>
          </div>
        </div>
      </div>
    </section>
  );
}
