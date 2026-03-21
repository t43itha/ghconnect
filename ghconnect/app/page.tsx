"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { StreamingText } from "@/components/StreamingText";
import { KenteStrip } from "@/components/KenteStrip";

const lines = [
  "120,000+ Ghanaians in the UK...",
  "...thousands of businesses...",
  "...one platform to connect them all.",
];

export default function SplashPage() {
  const router = useRouter();
  const [showBrand, setShowBrand] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-dvh px-6 overflow-hidden">
      {/* Kente background pattern overlay */}
      <div className="kente-bg absolute inset-0 pointer-events-none" />

      {/* Streaming text */}
      <div className="relative z-10 max-w-sm text-center">
        <StreamingText
          lines={lines}
          onComplete={() => setShowBrand(true)}
          className="font-display text-xl text-white/80 leading-relaxed"
        />
      </div>

      {/* Brand reveal after text completes */}
      <AnimatePresence>
        {showBrand && (
          <motion.div
            className="relative z-10 flex flex-col items-center mt-10 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* KenteStrip accent */}
            <motion.div
              className="w-48"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <KenteStrip />
            </motion.div>

            {/* Logo text */}
            <motion.h1
              className="font-display text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Ghana
              <span className="text-kente-gold">Connect</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xs uppercase tracking-[4px] text-white/35"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              UK &amp; Ireland
            </motion.p>

            {/* CTA button with spring animation */}
            <motion.button
              onClick={() => router.push("/home")}
              className="mt-4 px-8 py-3.5 bg-kente-gold text-onyx font-semibold rounded-full shadow-[0_0_24px_rgba(252,209,22,0.3)] hover:shadow-[0_0_32px_rgba(252,209,22,0.45)] transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
                delay: 0.5,
              }}
              whileTap={{ scale: 0.96 }}
            >
              Explore GhanaConnect
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
