export const gradientMap: Record<string, { from: string; to: string }> = {
  "gradient-food": { from: "#CE1126", to: "#FCD116" },
  "gradient-legal": { from: "#006B3F", to: "#0d4a2e" },
  "gradient-beauty": { from: "#9333ea", to: "#CE1126" },
  "gradient-transport": { from: "#1e40af", to: "#006B3F" },
  "gradient-finance": { from: "#FCD116", to: "#f59e0b" },
  "gradient-tech": { from: "#06b6d4", to: "#006B3F" },
  "gradient-property": { from: "#78350f", to: "#FCD116" },
  "gradient-health": { from: "#CE1126", to: "#f87171" },
  "gradient-education": { from: "#006B3F", to: "#FCD116" },
  "gradient-travel": { from: "#0ea5e9", to: "#006B3F" },
  "gradient-fashion": { from: "#CE1126", to: "#9333ea" },
  "gradient-events": { from: "#FCD116", to: "#CE1126" },
  "gradient-services": { from: "#475569", to: "#006B3F" },
  "gradient-cultural": { from: "#CE1126", to: "#FCD116" },
  "gradient-professional": { from: "#006B3F", to: "#111827" },
  "gradient-workshop": { from: "#FCD116", to: "#006B3F" },
};

export function getGradientStyle(image: string) {
  const gradient = gradientMap[image] ?? { from: "#006B3F", to: "#FCD116" };
  return {
    background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
  };
}
