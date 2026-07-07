import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <motion.p
            className="footer-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Designed & Built by <span className="footer-name">{personalInfo.name}</span>
          </motion.p>
          <motion.p
            className="footer-copy"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            © {year} All rights reserved
          </motion.p>
        </div>
        <motion.div
          className="footer-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </footer>
  );
}
