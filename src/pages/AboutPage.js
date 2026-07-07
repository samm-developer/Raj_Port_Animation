import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MeshBackground from '../components/backgrounds/MeshBackground';
import { personalInfo, education, achievements, certificates } from '../data/portfolioData';
import './AboutPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: () => -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${totalScroll}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="about-page">
      <MeshBackground />

      <div className="about-pin" ref={containerRef}>
        <div className="about-track" ref={trackRef}>
          {/* Panel 1 — Intro */}
          <section className="about-panel panel-intro">
            <span className="panel-tag">01 / Story</span>
            <h1 className="panel-title scramble-target">About Me</h1>
            <p className="panel-bio">{personalInfo.bio}</p>
            <div className="panel-stats">
              {achievements.map((a) => (
                <div key={a.label} className="panel-stat">
                  <span className="panel-stat-val">{a.value}</span>
                  <span className="panel-stat-lbl">{a.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Panel 2 — Education */}
          <section className="about-panel panel-edu">
            <span className="panel-tag">02 / Education</span>
            <h2 className="panel-title">Academic Journey</h2>
            <div className="edu-cards">
              {education.map((edu) => (
                <div key={edu.degree} className="edu-flip-card">
                  <div className="edu-flip-inner">
                    <div className="edu-flip-front">
                      <h3>{edu.degree}</h3>
                      <p>{edu.school}</p>
                      <span className="edu-grade-badge">{edu.grade}</span>
                    </div>
                    <div className="edu-flip-back">
                      <p className="edu-period">{edu.period}</p>
                      <div className="edu-subjects-list">
                        {edu.subjects.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Panel 3 — Contact details */}
          <section className="about-panel panel-contact">
            <span className="panel-tag">03 / Details</span>
            <h2 className="panel-title">Get to Know Me</h2>
            <div className="detail-grid">
              {[
                { label: 'Email', value: personalInfo.email },
                { label: 'Phone', value: personalInfo.phone },
                { label: 'Location', value: personalInfo.location },
                { label: 'Status', value: 'Open to Opportunities' },
              ].map((item) => (
                <div key={item.label} className="detail-block">
                  <span className="detail-block-label">{item.label}</span>
                  <span className="detail-block-value">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Panel 4 — Certificates */}
          <section className="about-panel panel-certs">
            <span className="panel-tag">04 / Certificates</span>
            <h2 className="panel-title">Credentials</h2>
            <ul className="cert-scroll-list">
              {certificates.map((cert, i) => (
                <li key={cert} style={{ '--i': i }}>
                  <span className="cert-index">{String(i + 1).padStart(2, '0')}</span>
                  {cert}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="about-scroll-hint">
        <span>Scroll to explore →</span>
      </div>
    </div>
  );
}
