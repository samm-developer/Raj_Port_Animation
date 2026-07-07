import { motion } from 'framer-motion';
import { skills } from '../data/portfolioData';
import './SkillsPage.css';

const skillCategories = [
  { title: 'Frontend', items: ['React.js', 'Next.js', 'Redux Toolkit', 'Tailwind CSS'], icon: '⚡', color: '#00f0ff' },
  { title: 'Backend', items: ['Node.js', 'Express.js', 'GraphQL', 'Socket.io'], icon: '🔧', color: '#8338ec' },
  { title: 'Database', items: ['MongoDB', 'MERN', 'AWS'], icon: '🗄️', color: '#ff006e' },
  { title: 'Tools', items: ['RabbitMQ', 'Razorpay', 'TypeScript', 'JavaScript'], icon: '🛠️', color: '#ffbe0b' },
];

export default function SkillsPage() {
  return (
    <div className="skills-page">
      <div className="conic-bg" />

      <section className="skills-hero">
        <motion.span
          className="skills-page-tag"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Tech Arsenal
        </motion.span>
        <motion.h1
          className="skills-page-title"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Skills & Tools
        </motion.h1>
      </section>

      {/* Dual marquee */}
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

      {/* Bento grid */}
      <section className="bento-section container">
        <div className="bento-grid">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className={`bento-card bento-${i}`}
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className="bento-glow" style={{ background: cat.color }} />
              <span className="bento-icon">{cat.icon}</span>
              <h3>{cat.title}</h3>
              <div className="bento-tags">
                {cat.items.map((item) => (
                  <span key={item} className="bento-tag" style={{ borderColor: `${cat.color}40` }}>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Orbit */}
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
    </div>
  );
}
