"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface StreamingTextProps {
  lines: string[];
  charDelay?: number;
  lineDelay?: number;
  onComplete?: () => void;
  className?: string;
}

export function StreamingText({
  lines,
  charDelay = 0.03,
  lineDelay = 0.4,
  onComplete,
  className = "",
}: StreamingTextProps) {
  const [completed, setCompleted] = useState(false);

  // Compute total duration so we can fire onComplete
  useEffect(() => {
    let totalChars = 0;
    let totalTime = 0;

    for (let i = 0; i < lines.length; i++) {
      const lineStart = i * lineDelay;
      const lineEnd = lineStart + lines[i].length * charDelay;
      totalTime = Math.max(totalTime, lineEnd);
      totalChars += lines[i].length;
    }

    const timeout = setTimeout(() => {
      setCompleted(true);
      onComplete?.();
    }, (totalTime + 0.3) * 1000);

    return () => clearTimeout(timeout);
  }, [lines, charDelay, lineDelay, onComplete]);

  return (
    <div className={`space-y-2 ${className}`}>
      {lines.map((line, lineIndex) => (
        <p key={lineIndex} className="leading-relaxed">
          {line.split("").map((char, charIndex) => (
            <motion.span
              key={`${lineIndex}-${charIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.05,
                delay: lineIndex * lineDelay + charIndex * charDelay,
                ease: "easeIn",
              }}
            >
              {char}
            </motion.span>
          ))}
        </p>
      ))}
    </div>
  );
}
