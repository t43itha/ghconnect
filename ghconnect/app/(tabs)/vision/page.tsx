"use client";

import { motion } from "motion/react";
import {
  Users,
  Store,
  Briefcase,
  Award,
  Building,
  Handshake,
  UserCheck,
  Globe,
} from "lucide-react";
import { KenteStrip } from "@/components/KenteStrip";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const impactStats = [
  {
    icon: Users,
    target: 120000,
    suffix: "+",
    label: "Ghanaians in the UK & Ireland",
  },
  {
    icon: Store,
    target: 2400,
    suffix: "+",
    label: "Businesses Ready to Connect",
  },
  {
    icon: Briefcase,
    target: 850,
    suffix: "+",
    label: "Job Opportunities",
  },
];

const phases = [
  {
    phase: "Phase 1",
    title: "United Kingdom",
    current: true,
    bg: "bg-kente-gold/10",
    border: "border-kente-gold/30",
  },
  {
    phase: "Phase 2",
    title: "Ireland",
    current: false,
    bg: "bg-surface",
    border: "border-gold-border",
  },
  {
    phase: "Phase 3",
    title: "Global",
    current: false,
    bg: "bg-surface",
    border: "border-white/5",
  },
];

const partnerships = [
  {
    icon: Award,
    title: "Official Endorsement",
    description:
      "Formal recognition from the Ghana High Commission as a trusted platform for the diaspora community.",
  },
  {
    icon: Building,
    title: "Funding Connections",
    description:
      "Introductions to grant bodies, impact investors, and diaspora development funds.",
  },
  {
    icon: Handshake,
    title: "Formal Partnership",
    description:
      "Co-branded initiatives that bring consular services directly into the GhanaConnect ecosystem.",
  },
  {
    icon: UserCheck,
    title: "Advisory Role",
    description:
      "A seat on our advisory board to ensure the platform serves community needs authentically.",
  },
];

export default function VisionPage() {
  return (
    <div className="min-h-dvh px-5 pt-[env(safe-area-inset-top,12px)] pb-28 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs uppercase tracking-[3px] text-kente-gold/50 font-medium mb-2">
          Our Vision
        </p>
        <h1 className="font-display text-3xl font-bold text-white leading-tight">
          The Digital Home for the Ghanaian Diaspora
        </h1>
        <p className="text-sm text-white/50 mt-3 leading-relaxed">
          GhanaConnect bridges the gap between Ghanaians abroad and the
          businesses, jobs, and community events that keep our culture thriving.
          We are building the essential infrastructure for diaspora life.
        </p>
      </motion.div>

      <KenteStrip className="rounded-full" />

      {/* Impact Stats */}
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[3px] text-kente-gold/50 font-medium">
          Market Opportunity
        </p>

        <div className="grid gap-4">
          {impactStats.map(({ icon: Icon, target, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="bg-surface border border-gold-border rounded-2xl p-5 text-center"
            >
              <Icon size={24} className="text-kente-gold mx-auto mb-3" />
              <AnimatedCounter
                target={target}
                suffix={suffix}
                className="font-display text-2xl font-bold text-white"
              />
              <p className="text-xs text-white/50 mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Growth Roadmap */}
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[3px] text-kente-gold/50 font-medium">
          Growth Roadmap
        </p>

        <div className="grid gap-3">
          {phases.map(({ phase, title, current, bg, border }, i) => (
            <motion.div
              key={phase}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className={`${bg} border ${border} rounded-2xl p-4 flex items-center justify-between`}
            >
              <div>
                <p className="text-xs text-white/40 font-medium">{phase}</p>
                <p className="font-display text-lg font-semibold text-white">
                  {title}
                </p>
              </div>
              {current && (
                <span className="rounded-full bg-kente-gold/20 border border-kente-gold/40 px-3 py-1 text-xs font-semibold text-kente-gold">
                  CURRENT
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <KenteStrip className="rounded-full" />

      {/* Partnership Opportunities */}
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[3px] text-kente-gold/50 font-medium">
          Partnership Opportunities
        </p>

        <div className="grid gap-4">
          {partnerships.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="bg-surface border border-gold-border rounded-2xl p-5"
            >
              <Icon size={22} className="text-kente-gold mb-3" />
              <h3 className="font-display text-base font-semibold text-white mb-1">
                {title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-br from-kente-gold/10 to-forest/10 border border-gold-border rounded-2xl p-6 text-center"
      >
        <Globe size={32} className="text-kente-gold mx-auto mb-4" />
        <h2 className="font-display text-xl font-bold text-white mb-2">
          Let&apos;s Build This Together
        </h2>
        <p className="text-sm text-white/50 leading-relaxed mb-5">
          We invite the Ghana High Commission to join us in creating the
          definitive digital platform for Ghanaians in the UK and beyond.
        </p>
        <button className="bg-kente-gold text-onyx font-semibold rounded-full px-8 py-3 text-sm shadow-[0_0_20px_rgba(252,209,22,0.3)] hover:shadow-[0_0_30px_rgba(252,209,22,0.5)] transition-shadow duration-300">
          Get in Touch
        </button>
      </motion.div>
    </div>
  );
}
