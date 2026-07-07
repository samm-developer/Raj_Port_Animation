import ParticleCanvas from '../components/ParticleCanvas';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HomePage.css';

const quickLinks = [
  { to: '/about', label: 'About Me', desc: 'My story & education', color: '#00f0ff' },
  { to: '/work', label: 'My Work', desc: 'Projects & experience', color: '#ff006e' },
  { to: '/skills', label: 'Skills', desc: 'Tech I master', color: '#8338ec' },
  { to: '/contact', label: 'Contact', desc: "Let's connect", color: '#ffbe0b' },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <ParticleCanvas />
      <Hero />

      <section className="home-explore">
        <div className="container">
          <motion.h2
            className="explore-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Explore My World
          </motion.h2>
          <div className="explore-grid">
            {quickLinks.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 60, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
              >
                <Link to={item.to} className="explore-card" data-cursor="pointer">
                  <div className="explore-glow" style={{ background: item.color }} />
                  <span className="explore-num">0{i + 1}</span>
                  <h3>{item.label}</h3>
                  <p>{item.desc}</p>
                  <span className="explore-arrow" style={{ color: item.color }}>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
