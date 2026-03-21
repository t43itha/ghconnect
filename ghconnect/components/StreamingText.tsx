"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface StreamingTextProps {
  lines: string[];
  lineDelay?: number;
  onComplete?: () => void;
  className?: string;
}

export function StreamingText({
  lines,
  lineDelay = 1.0,
  onComplete,
  className = "",
}: StreamingTextProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [highlightsReady, setHighlightsReady] = useState(false);

  const handleComplete = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timer = setTimeout(
        () => setVisibleLines((v) => v + 1),
        visibleLines === 0 ? 300 : lineDelay * 1000
      );
      return () => clearTimeout(timer);
    } else {
      const highlightTimer = setTimeout(() => setHighlightsReady(true), 400);
      const completeTimer = setTimeout(() => handleComplete(), 700);
      return () => {
        clearTimeout(highlightTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [visibleLines, lines.length, lineDelay, handleComplete]);

  return (
    <div className={`space-y-3 ${className}`}>
      <AnimatePresence>
        {lines.slice(0, visibleLines).map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display text-[1.5rem] md:text-[1.75rem] font-medium leading-[1.35] text-white/70 tracking-tight"
          >
            {highlightNumbers(line, highlightsReady)}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}

function highlightNumbers(text: string, ready: boolean) {
  const parts = text.split(/([\d,]+\+?)/g);
  return parts.map((part, i) => {
    if (/[\d,]+\+?/.test(part)) {
      return (
        <span
          key={i}
          className="transition-colors duration-500"
          style={{ color: ready ? "#FCD116" : "rgba(255,255,255,0.7)" }}
        >
          {part}
        </span>
      );
    }
    return part;
  });
}
