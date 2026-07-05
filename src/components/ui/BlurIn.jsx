// Reusable blur-in wrapper
import { motion } from "motion/react";
export const BlurIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, filter: "blur(8px)" }}
    animate={{ opacity: 1, filter: "blur(0px)" }}
    transition={{ duration: 1.2, delay, ease: "easeIn" }}
  >
    {children}
  </motion.div>
);
