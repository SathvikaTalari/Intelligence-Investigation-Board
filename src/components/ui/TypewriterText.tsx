import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypewriterText({ text, delay = 0, speed = 50, className = '', onComplete }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStart(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (start && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed + (Math.random() * 30)); // Add slight randomness for mechanical feel
      return () => clearTimeout(timer);
    } else if (start && currentIndex === text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, start, text, speed, onComplete]);

  return (
    <span className={`inline-block ${className}`}>
      {displayedText}
      {start && currentIndex < text.length && (
        <motion.span 
          animate={{ opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="inline-block w-[0.5em] h-[1em] bg-current align-middle ml-[1px]"
        />
      )}
    </span>
  );
}
