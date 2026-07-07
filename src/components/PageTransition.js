import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 40, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -30, scale: 1.02, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      className="page-transition"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
