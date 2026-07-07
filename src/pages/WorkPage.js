import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience, projects } from '../data/portfolioData';
import './WorkPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function WorkPage() {
  const lineRef = useRef(null);
  const projectsRef = useRef(null);
  const projectsTrackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 2,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.work-timeline', start: 'top 70%' },
      });

      gsap.utils.toArray('.timeline-entry').forEach((entry) => {
        gsap.from(entry, {
          x: -80,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: { trigger: entry, start: 'top 85%' },
        });
      });

      const track = projectsTrackRef.current;
      const section = projectsRef.current;
      if (track && section) {
        const scrollWidth = track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -(scrollWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            end: () => `+=${scrollWidth}`,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="work-page">
      <div className="scanline-overlay" />

      <section className="work-hero">
        <span className="work-tag">Portfolio</span>
        <h1 className="work-title">
          My <span className="work-title-accent">Work</span>
        </h1>
        <p className="work-sub">Real-world systems built with precision & passion</p>
      </section>

      {/* Vertical timeline */}
      <section className="work-timeline section">
        <div className="container">
          <h2 className="section-label">Experience</h2>
          <div className="timeline-wrap">
            <div className="timeline-draw-line" ref={lineRef} />
            {experience.map((exp) => (
              <div key={exp.company} className="timeline-entry">
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <div className="timeline-meta">
                    <span className="timeline-period">{exp.period}</span>
                    <a href={exp.url} target="_blank" rel="noopener noreferrer" className="timeline-company">
                      {exp.company} ↗
                    </a>
                  </div>
                  <h3>{exp.role}</h3>
                  <ul>
                    {exp.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal project scroll */}
      <section className="work-projects-pin" ref={projectsRef}>
        <div className="work-projects-header">
          <h2 className="section-label">Projects</h2>
          <span className="scroll-hint-work">Scroll ↓ to explore →</span>
        </div>
        <div className="work-projects-track" ref={projectsTrackRef}>
          {projects.map((project, i) => (
            <article
              key={project.title}
              className="work-project-card"
              style={{ '--accent': project.color }}
            >
              <span className="project-index">0{i + 1}</span>
              <div className="project-card-glow" />
              <h3>{project.title}</h3>
              <p className="project-card-sub">{project.subtitle}</p>
              <p className="project-card-desc">{project.description}</p>
              <div className="project-card-tech">
                {project.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
          <div className="work-project-card project-more">
            <h3>More Coming Soon</h3>
            <p>Always building something new</p>
          </div>
        </div>
      </section>
    </div>
  );
}
