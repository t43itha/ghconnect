"use client";

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 20, color = "#6B6B6B", strokeWidth = 1.5 }: IconProps) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  const d: Record<string, React.ReactNode> = {
    home: <><path d="M4 10.5V20a1 1 0 001 1h4v-6.5a1 1 0 011-1h4a1 1 0 011 1V21h4a1 1 0 001-1V10.5"/><path d="M2.5 11L12 3.5 21.5 11"/></>,
    grid: <><circle cx="7" cy="7" r="3.5"/><circle cx="17" cy="7" r="3.5"/><circle cx="7" cy="17" r="3.5"/><circle cx="17" cy="17" r="3.5"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2.5"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
    briefcase: <><rect x="2" y="7" width="20" height="13" rx="2.5"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M5 21c0-4 3.5-6 7-6s7 2 7 6"/></>,
    search: <><circle cx="10.5" cy="10.5" r="7.5"/><path d="M21 21l-4-4"/></>,
    pin: <><path d="M12 21s-7-5.25-7-10.5a7 7 0 0114 0C19 15.75 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.5"/></>,
    star: <><path d="M12 2l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.27 6.2 19.9l1.1-6.47L2.6 8.85l6.5-.95L12 2z" fill={color} stroke="none"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    heart: <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></>,
    bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    plus: <><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></>,
    cart: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></>,
    building: <><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-4h6v4"/><path d="M9 9h1M14 9h1M9 13h1M14 13h1"/></>,
    back: <><path d="M19 12H5M12 19l-7-7 7-7"/></>,
    share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.81.36 1.6.7 2.35a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.75.34 1.54.57 2.35.7A2 2 0 0122 16.92z"/></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
    check: <><path d="M20 6L9 17l-5-5"/></>,
    link: <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>,
  };

  return <svg {...p}>{d[name]}</svg>;
}
