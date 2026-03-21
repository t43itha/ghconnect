"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { StreamingText } from "@/components/StreamingText";
import { ArrowRight } from "lucide-react";

const lines = [
  "120,000+ Ghanaians in the UK.",
  "Thousands of businesses.",
  "One platform to connect them all.",
];

export default function SplashPage() {
  const router = useRouter();
  const [showBrand, setShowBrand] = useState(false);

  return (
    <div className="relative flex flex-col min-h-dvh bg-onyx overflow-hidden">
      {/* Top Kente strip — the cultural signature */}
      <div className="kente-strip h-[3px] w-full" />

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-12 max-w-md mx-auto w-full">
        <StreamingText
          lines={lines}
          lineDelay={0.9}
          onComplete={() => setShowBrand(true)}
          className="mb-20"
        />

        <AnimatePresence>
          {showBrand && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Kente strip accent */}
              <motion.div
                className="h-[3px] w-16 kente-strip origin-left mb-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />

              {/* Logo */}
              <motion.h1
                className="font-display text-[2.8rem] md:text-5xl font-bold text-white leading-[0.95] tracking-tight"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                Ghana
                <span className="text-kente-gold">Connect</span>
              </motion.h1>

              <motion.p
                className="text-[11px] uppercase tracking-[4px] text-white/20 mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                United Kingdom &amp; Ireland
              </motion.p>

              {/* CTA */}
              <motion.button
                onClick={() => router.push("/home")}
                className="group flex items-center gap-2 mt-12 text-[14px] font-medium text-kente-gold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore GhanaConnect
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Kente strip */}
      <div className="kente-strip h-[3px] w-full" />
    </div>
  );
}
