interface NotificationPillProps {
  children: React.ReactNode;
}

export default function NotificationPill({ children }: NotificationPillProps) {
  return (
    <span
      className="inline-flex items-center px-3 py-1.5 text-white text-xs font-medium rounded-full whitespace-nowrap"
      style={{ border: "1px solid rgba(252,209,22,0.3)" }}
    >
      {children}
    </span>
  );
}
