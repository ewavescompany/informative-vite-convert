import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const TextGenerateEffect = ({
  words,
  setWords,
  className,
  duration = 0.1,
}: {
  words: string;
  setWords: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  duration?: number;
}) => {
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (isAnimating && currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + words[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, duration * 100);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating, currentIndex, words, duration]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsAnimating(false);
    setText(e.target.value);
    setWords(e.target.value);
  };

  return (
    <div className={className}>
      <motion.textarea
        id="metaKeywords"
        name="metaKeywords"
        rows={4}
        value={text}
        onChange={handleChange}
        className="dark:text-white text-black border p-3 w-full leading-snug tracking-wide rounded-md"
        style={{ resize: "none" }}
      />
    </div>
  );
};
