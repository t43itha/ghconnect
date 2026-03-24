"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { T, F } from "@/lib/theme";
import { KenteBorder } from "@/components/KenteBorder";

/* ── Inline sub-components ── */

const NetworkLogo = ({ size = 90, color = T.green }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {([[50,50,50,15],[50,50,82,35],[50,50,82,65],[50,50,50,85],[50,50,18,65],[50,50,18,35]] as const).map(([x1,y1,x2,y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" strokeLinecap="round"
        style={{ opacity: 0, animation: `lineIn 0.4s ease forwards ${0.3 + i * 0.08}s` }} />
    ))}
    {([[50,15],[82,35],[82,65],[50,85],[18,65],[18,35]] as const).map(([cx,cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="8" fill={color}
        style={{ opacity: 0, transform: "scale(0)", transformOrigin: `${cx}px ${cy}px`, animation: `nodeIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards ${0.5 + i * 0.07}s` }} />
    ))}
    <circle cx="50" cy="50" r="12" fill={color}
      style={{ opacity: 0, transform: "scale(0)", transformOrigin: "50px 50px", animation: `nodeIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards 0.15s` }} />
  </svg>
);

const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AdinkraPattern = () => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.045 }} preserveAspectRatio="none">
    <defs>
      <pattern id="diamonds" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="40" height="40" fill="none" />
        <rect x="0" y="0" width="20" height="20" fill={T.green} />
        <rect x="20" y="20" width="20" height="20" fill={T.green} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#diamonds)" />
  </svg>
);

/* ── Keyframe styles injected once ── */

const keyframeStyles = `
@keyframes nodeIn {
  to { opacity: 1; transform: scale(1); }
}
@keyframes lineIn {
  to { opacity: 1; }
}
`;

/* ── Main splash page ── */

export default function SplashPage() {
  const router = useRouter();
  const { signIn } = useAuthActions();
  const [step, setStep] = useState(0); // 0-2 = onboarding, 3 = sign in, 4 = exit
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const hide = setTimeout(() => setVis(false), 0);
    const show = setTimeout(() => setVis(true), 80);
    return () => {
      clearTimeout(hide);
      clearTimeout(show);
    };
  }, [step]);

  const slides = [
    { word: "Akwaaba.", sub: "Welcome to your digital home away from home.", body: "Connecting the Ghanaian diaspora across the UK and Ireland." },
    { word: "Network.", sub: "Grow your professional circle.", body: "Find mentors, partners, and opportunities within our vibrant community." },
    { word: "Thrive.", sub: "Support local, grow global.", body: "Discover businesses, jobs, and events tailored for you." },
  ];

  const handleNext = () => {
    if (step < 2) { setStep(step + 1); }
    else if (step === 2) { setStep(3); }
  };

  const handleEnter = () => {
    setStep(4);
    setTimeout(() => router.push("/home"), 500);
  };

  const isOnboarding = step <= 2;
  const isSignIn = step === 3;
  const isExit = step === 4;

  const fade = (delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <>
      <style>{keyframeStyles}</style>
      <div style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "linear-gradient(180deg, #F0F5F2 0%, #E8EDE9 40%, #DFE8E1 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        opacity: isExit ? 0 : 1, transform: isExit ? "scale(1.02)" : "scale(1)",
        transition: "opacity 0.5s ease, transform 0.5s ease", overflow: "hidden",
      }}>
        <AdinkraPattern />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 2 }}><KenteBorder /></div>

        {/* Onboarding slides */}
        {isOnboarding && (
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 380, padding: "0 36px", textAlign: "center" }}>
            <h1 style={{
              ...fade(0.05),
              fontFamily: F.serif, fontSize: 72, fontWeight: 700, fontStyle: "italic",
              margin: 0, color: T.green, letterSpacing: -2, lineHeight: 1,
            }}>
              {slides[step].word}
            </h1>
            <p style={{
              ...fade(0.15),
              fontFamily: F.sans, fontSize: 22, fontWeight: 600, color: T.inkLight,
              margin: "28px 0 0", lineHeight: 1.3, letterSpacing: -0.3,
            }}>
              {slides[step].sub}
            </p>
            <p style={{
              ...fade(0.25),
              fontFamily: F.sans, fontSize: 16, color: T.tertiary,
              margin: "16px 0 0", lineHeight: 1.55,
            }}>
              {slides[step].body}
            </p>

            {/* Dots */}
            <div style={{ ...fade(0.3), display: "flex", gap: 8, marginTop: 48 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  height: 6, borderRadius: 3,
                  width: step === i ? 28 : 6,
                  background: step === i ? T.green : T.faint,
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                }} />
              ))}
            </div>

            {/* Button */}
            <button onClick={handleNext} style={{
              ...fade(0.35),
              marginTop: 32, padding: "18px 48px", borderRadius: 100,
              background: T.green, border: "none", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 10,
              fontFamily: F.sans, fontSize: 17, fontWeight: 700, color: T.white,
              boxShadow: T.sGreen, transition: "transform 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
            onMouseLeave={e => e.currentTarget.style.transform = ""}
            >
              Continue
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>
        )}

        {/* Sign-in screen */}
        {isSignIn && (
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 340, padding: "0 32px" }}>
            <div style={{ ...fade(0.05), width: 100, height: 100, borderRadius: 24, background: T.white, boxShadow: "0 8px 40px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <NetworkLogo size={60} color={T.green} />
            </div>
            <h1 style={{ ...fade(0.15), fontFamily: F.serif, fontSize: 40, fontWeight: 700, margin: "24px 0 0", color: T.ink, letterSpacing: -1.5, lineHeight: 1, textAlign: "center" }}>
              Ghana<span style={{ color: T.green }}>Connect</span>
            </h1>
            <p style={{ ...fade(0.22), fontFamily: F.sans, fontSize: 15, color: T.secondary, margin: "8px 0 0", textAlign: "center" }}>Connect, Network, and Grow</p>
            <div style={{ width: "100%", marginTop: 40, display: "flex", flexDirection: "column", gap: 12 }}>
              <button onClick={handleEnter} style={{ ...fade(0.28), width: "100%", padding: "18px 24px", borderRadius: 16, background: T.green, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: F.sans, fontSize: 17, fontWeight: 700, color: T.white, boxShadow: T.sGreen, transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"} onMouseLeave={e => e.currentTarget.style.transform = ""}>
                Get Started <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
              <button onClick={() => void signIn("google", { redirectTo: "/home" })} style={{ ...fade(0.34), width: "100%", padding: "16px 24px", borderRadius: 16, background: T.white, border: `1.5px solid ${T.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: F.sans, fontSize: 15, fontWeight: 600, color: T.ink, boxShadow: T.s1, transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"} onMouseLeave={e => e.currentTarget.style.transform = ""}>
                <GoogleLogo /> Sign in with Google
              </button>
              <button onClick={() => void signIn("google", { redirectTo: "/home" })} style={{ ...fade(0.4), background: "none", border: "none", cursor: "pointer", fontFamily: F.sans, fontSize: 14, fontWeight: 600, color: T.green, padding: "10px", textAlign: "center", width: "100%" }}>
                Already have an account? Sign In
              </button>
            </div>
            <p style={{ ...fade(0.46), fontFamily: F.sans, fontSize: 11, color: T.tertiary, margin: "32px 0 0", letterSpacing: 0.5, textAlign: "center" }}>Part of the Digital Ghana Ecosystem</p>
          </div>
        )}
      </div>
    </>
  );
}
