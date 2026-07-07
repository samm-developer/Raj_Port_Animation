import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects } from '../data/portfolioData';
import SectionHeading from './SectionHeading';
import './Projects.css';

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-150, 150], [8, -8]));
  const rotateY = useSpring(useTransform(x, [-150, 150], [-8, 8]));

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-card"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="pointer"
    >
      <div className="project-glow" style={{ background: project.color }} />
      <div className="project-number">0{index + 1}</div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-subtitle">{project.subtitle}</p>
      <p className="project-desc">{project.description}</p>
      <div className="project-tech">
        {project.tech.map((t) => (
          <span key={t} className="tech-tag" style={{ borderColor: `${project.color}40` }}>
            {t}
          </span>
        ))}
      </div>
      <div className="project-arrow" style={{ color: project.color }}>→</div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <SectionHeading number="03" title="Projects" subtitle="Things I've built with passion" />

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
