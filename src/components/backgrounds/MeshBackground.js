import { useEffect, useRef } from 'react';
import './MeshBackground.css';

export default function MeshBackground() {
  const blob1 = useRef(null);
  const blob2 = useRef(null);
  const blob3 = useRef(null);

  useEffect(() => {
    const animate = (el, duration) => {
      if (!el) return;
      const keyframes = [
        { transform: 'translate(0, 0) scale(1)' },
        { transform: 'translate(30px, -50px) scale(1.1)' },
        { transform: 'translate(-20px, 20px) scale(0.9)' },
        { transform: 'translate(0, 0) scale(1)' },
      ];
      el.animate(keyframes, { duration, iterations: Infinity, easing: 'ease-in-out' });
    };
    animate(blob1.current, 8000);
    animate(blob2.current, 10000);
    animate(blob3.current, 12000);
  }, []);

  return (
    <div className="mesh-bg">
      <div className="mesh-blob blob-1" ref={blob1} />
      <div className="mesh-blob blob-2" ref={blob2} />
      <div className="mesh-blob blob-3" ref={blob3} />
    </div>
  );
}
