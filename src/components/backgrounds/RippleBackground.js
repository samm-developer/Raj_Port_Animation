import { useEffect, useRef } from 'react';
import './RippleBackground.css';

export default function RippleBackground() {
  const canvasRef = useRef(null);
  const ripplesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const addRipple = (x, y) => {
      ripplesRef.current.push({ x, y, radius: 0, maxRadius: 120 + Math.random() * 80, opacity: 0.6 });
      if (ripplesRef.current.length > 20) ripplesRef.current.shift();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripplesRef.current = ripplesRef.current.filter((r) => {
        r.radius += 2;
        r.opacity -= 0.008;
        if (r.opacity <= 0) return false;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${r.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        return true;
      });
      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => addRipple(e.clientX, e.clientY));
    window.addEventListener('click', (e) => addRipple(e.clientX, e.clientY));

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="ripple-canvas" />;
}
