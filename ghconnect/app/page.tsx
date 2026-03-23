"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { KenteStrip } from "@/components/KenteStrip";
import { StreamingText } from "@/components/StreamingText";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";

const lines = [
  "120,000+ Ghanaians in the UK.",
  "Thousands of businesses.",
  "One platform to connect them all.",
];

export default function SplashPage() {
  const [showStreaming, setShowStreaming] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  return (
    <div className="relative flex flex-col min-h-dvh bg-onyx overflow-hidden">
      {/* Digital kente corner accents */}
      <div className="kente-corner absolute top-0 left-0 w-28 h-28 sm:w-36 sm:h-36" />
      <div className="kente-corner absolute top-0 right-0 w-28 h-28 sm:w-36 sm:h-36" />
      <div className="kente-corner absolute bottom-0 left-0 w-20 h-20 sm:w-28 sm:h-28 opacity-40" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 md:px-12 max-w-md mx-auto w-full gap-8">
        {/* Wordmark — fades in first */}
        <motion.h1
          className="font-display text-[2.8rem] md:text-5xl font-bold leading-[0.95] tracking-tight text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          onAnimationComplete={() => setShowStreaming(true)}
        >
          <span className="text-kente-gold">Ghana</span>
          <span className="text-white">Connect</span>
        </motion.h1>

        {/* Kente chevron divider below wordmark */}
        <div className="kente-chevrons w-40 mx-auto" />

        {/* Streaming text — plays after wordmark */}
        <AnimatePresence>
          {showStreaming && (
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <StreamingText
                lines={lines}
                lineDelay={0.9}
                onComplete={() => setShowButtons(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA buttons — appear after streaming completes */}
        <AnimatePresence>
          {showButtons && (
            <motion.div
              className="flex flex-col gap-3 w-full max-w-xs mx-auto"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <PrimaryButton href="/home" className="w-full justify-center">Get Started</PrimaryButton>
              <SecondaryButton href="/home" className="w-full justify-center">Sign In</SecondaryButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
