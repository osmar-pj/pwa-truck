const textAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
    opacity: 1,
      y: 0,
    },
  };

const easing = [0.6, -0.05, 0.01, 0.99];
  const containerVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.85,
        ease: easing,
        delay: 0.15,
      },
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: { ease: "easeInOut", duration: 0.5 },
    },
  };

  const fadeInUp = {
    initial: {
      x: -100,
      opacity: 0,
      delay: 1,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: easing,
      },
    },
  };
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
 const divVariants = {
  initial: {
    y: 100,
    opacity: 0,
    delay: 1,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.83, 0, 0.17, 1],
    },
  },
  };
export { stagger, fadeInUp, containerVariants,textAnimation,divVariants };