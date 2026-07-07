import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const PAGE_CURSOR = {
  '/': 'home',
  '/about': 'about',
  '/work': 'work',
  '/skills': 'skills',
  '/contact': 'contact',
};

function useCursorTracking(springConfig = { stiffness: 150, damping: 20 }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleHover = (e) => {
      setHovering(!!e.target.closest('a, button, [data-cursor="pointer"]'));
    };
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleHover);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleHover);
    };
  }, [mouseX, mouseY]);

  return { mouseX, mouseY, ringX, ringY, hovering };
}

/* ── HOME: particle trail ── */
function HomeCursor({ mouseX, mouseY, hovering }) {
  const canvasRef = useRef(null);
  const trailRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMove = (e) => {
      trailRef.current.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (trailRef.current.length > 40) trailRef.current.shift();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trailRef.current = trailRef.current.filter((p) => {
        p.life -= 0.04;
        if (p.life <= 0) return false;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.life * 0.7})`;
        ctx.fill();
        return true;
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="cursor-canvas" />
      <motion.div
        className={`cursor-home-dot ${hovering ? 'hovering' : ''}`}
        style={{ x: mouseX, y: mouseY }}
      />
      <motion.div
        className="cursor-home-ring"
        style={{ x: mouseX, y: mouseY }}
        animate={{ scale: hovering ? 1.8 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  );
}

/* ── ABOUT: morphing blob ── */
function AboutCursor({ mouseX, mouseY, ringX, ringY, hovering }) {
  return (
    <>
      <motion.div
        className={`cursor-about-blob ${hovering ? 'hovering' : ''}`}
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      />
      <motion.div
        className="cursor-about-dot"
        style={{ x: mouseX, y: mouseY }}
      />
    </>
  );
}

/* ── WORK: crosshair + brackets ── */
function WorkCursor({ mouseX, mouseY, hovering }) {
  return (
    <motion.div
      className={`cursor-work ${hovering ? 'hovering' : ''}`}
      style={{ x: mouseX, y: mouseY }}
    >
      <span className="work-cross-h" />
      <span className="work-cross-v" />
      <span className="work-dot" />
      <span className="work-bracket tl" />
      <span className="work-bracket tr" />
      <span className="work-bracket bl" />
      <span className="work-bracket br" />
    </motion.div>
  );
}

/* ── SKILLS: orbiting satellites ── */
function SkillsCursor({ mouseX, mouseY, hovering }) {
  return (
    <motion.div
      className={`cursor-skills ${hovering ? 'hovering' : ''}`}
      style={{ x: mouseX, y: mouseY }}
    >
      <div className="skills-orbit-ring" />
      <div className="skills-satellite s1" />
      <div className="skills-satellite s2" />
      <div className="skills-satellite s3" />
      <div className="skills-center-dot" />
    </motion.div>
  );
}

/* ── CONTACT: ripple ring (user's favourite) ── */
function ContactCursor({ mouseX, mouseY, ringX, ringY, hovering }) {
  const canvasRef = useRef(null);
  const ripplesRef = useRef([]);

  const addRipple = useCallback((x, y) => {
    ripplesRef.current.push({
      x, y, radius: 0,
      maxRadius: 100 + Math.random() * 60,
      opacity: 0.55,
    });
    if (ripplesRef.current.length > 18) ripplesRef.current.shift();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMove = (e) => addRipple(e.clientX, e.clientY);
    const onClick = (e) => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => addRipple(e.clientX, e.clientY), i * 80);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripplesRef.current = ripplesRef.current.filter((r) => {
        r.radius += 2.2;
        r.opacity -= 0.009;
        if (r.opacity <= 0) return false;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${r.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        return true;
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, [addRipple]);

  return (
    <>
      <canvas ref={canvasRef} className="cursor-canvas" />
      <motion.div
        className={`cursor-dot ${hovering ? 'hovering' : ''}`}
        style={{ x: mouseX, y: mouseY }}
      />
      <motion.div
        className={`cursor-ring ${hovering ? 'hovering' : ''}`}
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
}

export default function CustomCursor() {
  const { pathname } = useLocation();
  const variant = PAGE_CURSOR[pathname] || 'home';
  const tracking = useCursorTracking(
    variant === 'about'
      ? { stiffness: 80, damping: 25 }
      : { stiffness: 150, damping: 20 }
  );

  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

  const props = { ...tracking };

  return (
    <div className={`custom-cursor custom-cursor--${variant}`} key={variant}>
      {variant === 'home' && <ContactCursor {...props} />}
      {variant === 'about' && <AboutCursor {...props} />}
      {variant === 'work' && <WorkCursor {...props} />}
      {variant === 'skills' && <SkillsCursor {...props} />}
      {variant === 'contact' && <HomeCursor {...props} />}
    </div>
  );
}
