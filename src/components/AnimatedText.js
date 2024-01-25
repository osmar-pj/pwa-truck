import { motion } from "framer-motion";
import { textAnimation } from "@/src/components/animations";

const AnimatedText = ({ text}) => {
  return (
    <motion.span
    initial="hidden"
    animate="visible"
    transition={{ staggerChildren: 0.05, delay:.25, }}
    className="container-ws"
  >
    {text.split(/\s+/).map((word, wordIndex, wordsArray) => (
      <span key={`word-${wordIndex}`}>
        {word.split("").map((letter, letterIndex) => (
          <motion.span
            variants={textAnimation}
            transition={{ duration: .65, ease: "backInOut" }}
            className={`inline-block relative top ${wordIndex === 0 ? 'first-word' : 'other-words'}`}
            key={`${letter}-${letterIndex}`}
          >
            {letter}
          </motion.span>
        ))}
        {wordIndex < text.split(/\s+/).length - 1 && <span className="word-space"> </span>}
      </span>
    ))}
  </motion.span>
  );
};

export default AnimatedText;
