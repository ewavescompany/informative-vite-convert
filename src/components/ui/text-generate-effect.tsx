import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export const TextGenerateEffect = ({
  words,
  setWords,
  className,
  duration = 0.1,
  type,
}: {
  words: string;
  // setWords: React.Dispatch<React.SetStateAction<string>>;
  // setWords: (
  //   content: string
  // ) => Promise<void> | Promise<FormikErrors<BlogFormValues>>;
  setWords: (content: string) => void;
  className?: string;
  duration?: number;
  type: string;
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

  const containerVariants = {
    hidden: {
      transition: {
        staggerChildren: 0.43,
      },
    },
    visible: {
      transition: {
        staggerChildren: 0.43,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10, transition: { duration: 0.5 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className={className}>
      <motion.textarea
        rows={4}
        value={text}
        onChange={handleChange}
        className="dark:text-white text-black border p-3 w-full leading-snug tracking-wide rounded-md"
        style={{ resize: "none" }}
      />

      {type === "keywords" ? (
        <motion.div
          className="flex gap-1 flex-wrap mt-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {words
            .split(",")
            .filter((key) => key.trim() !== "")
            .map((key) => (
              <motion.div
                key={key}
                variants={itemVariants}
                className="bg-green-800 text-secondary py-1 px-1 rounded-md flex justify-between items-center"
              >
                <span className="px-1 text-sm">{key}</span>
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => {
                    setText((text) => text.split(`${key},`).join(""));
                    setWords(words.split(`${key},`).join(""));
                  }}
                />
              </motion.div>
            ))}
        </motion.div>
      ) : null}
    </div>
  );
};
