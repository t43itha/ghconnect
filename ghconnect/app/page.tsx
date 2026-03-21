"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { StreamingText } from "@/components/StreamingText";
import { KenteStrip } from "@/components/KenteStrip";
import { ArrowRight } from "lucide-react";

const lines = [
  "120,000+ Ghanaians in the UK...",
  "...thousands of businesses...",
  "...one platform to connect them all.",
];

export default function SplashPage() {
  const router = useRouter();
  const [showBrand, setShowBrand] = useState(false);

  return (
    <div className="relative flex flex-col min-h-dvh overflow-hidden">
      {/* Ambient Kente texture */}
      <div className="kente-bg absolute inset-0 pointer-events-none" />

      {/* Top accent */}
      <div className="kente-strip h-1 w-full absolute top-0 left-0 right-0 z-20" />

      {/* Radial gold glow behind content */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(252,209,22,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Content — vertically centered with left alignment */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-12 max-w-lg mx-auto w-full">
        <StreamingText
          lines={lines}
          lineDelay={1.0}
          onComplete={() => setShowBrand(true)}
          className="mb-16"
        />

        <AnimatePresence>
          {showBrand && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* KenteStrip accent — draws in */}
              <motion.div
                className="w-32 origin-left"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <KenteStrip className="rounded-full" />
              </motion.div>

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="font-display text-[3.2rem] md:text-6xl font-extrabold text-white leading-none tracking-tight">
                  Ghana
                  <span className="text-kente-gold">Connect</span>
                </h1>
                <p className="text-[11px] uppercase tracking-[5px] text-white/30 mt-3 font-medium">
                  United Kingdom &amp; Ireland
                </p>
              </motion.div>

              {/* CTA */}
              <motion.button
                onClick={() => router.push("/home")}
                className="group flex items-center gap-3 bg-kente-gold text-onyx font-semibold text-[15px] pl-7 pr-5 py-4 rounded-full shadow-[0_0_40px_rgba(252,209,22,0.25)] hover:shadow-[0_0_60px_rgba(252,209,22,0.4)] transition-all duration-500"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.5,
                }}
                whileTap={{ scale: 0.97 }}
              >
                Explore GhanaConnect
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Kente strip */}
      <div className="kente-strip h-1 w-full absolute bottom-0 left-0 right-0 z-20" />
    </div>
  );
}
