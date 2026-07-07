import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './MagneticButton.css';

export default function MagneticButton({ children, href, variant = 'primary', onClick }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)';
    }
  };

  const isInternal = href && href.startsWith('/') && !href.startsWith('//');
  const Tag = href ? (isInternal ? Link : 'a') : 'button';
  const linkProps = isInternal ? { to: href } : href ? { href } : {};

  return (
    <motion.div className="magnetic-wrap" whileTap={{ scale: 0.95 }}>
      <Tag
        ref={ref}
        {...linkProps}
        onClick={onClick}
        className={`magnetic-btn ${variant}`}
        data-cursor="pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <span className="btn-text">{children}</span>
        <span className="btn-shine" />
      </Tag>
    </motion.div>
  );
}
