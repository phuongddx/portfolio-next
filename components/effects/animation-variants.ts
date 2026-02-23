// Spring animation presets for consistent motion design
export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

export const durationSpring = {
  type: "spring" as const,
  duration: 0.4,
  bounce: 0.2,
};

// Fade animations
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Stagger container animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Card hover animations
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -8 },
  tap: { scale: 0.98 },
};

// Page transition variants
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const pageTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 25,
  duration: 0.4,
};
