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
  lineDelay = 1.2,
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
        visibleLines === 0 ? 400 : lineDelay * 1000
      );
      return () => clearTimeout(timer);
    } else {
      // All lines visible — trigger highlights then complete
      const highlightTimer = setTimeout(() => setHighlightsReady(true), 300);
      const completeTimer = setTimeout(() => handleComplete(), 800);
      return () => {
        clearTimeout(highlightTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [visibleLines, lines.length, lineDelay, handleComplete]);

  return (
    <div className={`space-y-5 ${className}`}>
      <AnimatePresence>
        {lines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="overflow-hidden"
          >
            <p className="font-display text-[1.6rem] md:text-3xl font-semibold leading-[1.3] text-white/85 tracking-tight">
              {highlightGoldNumbers(line, highlightsReady)}
            </p>
            {/* Subtle gold underline sweep */}
            <motion.div
              className="h-[1px] mt-3 origin-left"
              style={{
                background:
                  "linear-gradient(90deg, rgba(252,209,22,0.4) 0%, rgba(252,209,22,0.08) 60%, transparent 100%)",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Wraps numbers and "+" in a gold highlight span.
 * "120,000+" becomes <span class="gold">120,000+</span>
 */
function highlightGoldNumbers(text: string, ready: boolean) {
  const parts = text.split(/([\d,]+\+?)/g);
  return parts.map((part, i) => {
    if (/[\d,]+\+?/.test(part)) {
      return (
        <span
          key={i}
          className="inline-block transition-colors duration-700"
          style={{ color: ready ? "#FCD116" : "rgba(255,255,255,0.85)" }}
        >
          {part}
        </span>
      );
    }
    return part;
  });
}
