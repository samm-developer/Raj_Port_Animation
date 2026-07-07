import { motion } from 'framer-motion';
import { education, achievements, certificates } from '../data/portfolioData';
import SectionHeading from './SectionHeading';
import './Education.css';

export default function Education() {
  return (
    <section className="education section" id="education">
      <div className="container">
        <SectionHeading number="05" title="Education & Achievements" />

        <div className="achievements-grid">
          {achievements.map((item, i) => (
            <motion.div
              key={item.label}
              className="achievement-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
            >
              <motion.span
                className="achievement-value"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {item.value}
              </motion.span>
              <span className="achievement-label">{item.label}</span>
              <span className="achievement-detail">{item.detail}</span>
            </motion.div>
          ))}
        </div>

        <div className="edu-grid">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              className="edu-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <div className="edu-header">
                <h3 className="edu-degree">{edu.degree}</h3>
                <span className="edu-grade">{edu.grade}</span>
              </div>
              <p className="edu-school">{edu.school}</p>
              <p className="edu-period">{edu.period}</p>
              <div className="edu-subjects">
                {edu.subjects.map((s) => (
                  <span key={s} className="edu-subject">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="certificates"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h4 className="cert-title">Certificates</h4>
          <div className="cert-list">
            {certificates.map((cert, i) => (
              <motion.span
                key={cert}
                className="cert-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ color: 'var(--accent-cyan)', x: 8 }}
              >
                {cert}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
