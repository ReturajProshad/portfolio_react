// Visual treatment for skill groups across both role lenses.

const categoryColors: Record<string, string> = {
  Languages: "tag-accent",
  "Backend & APIs": "tag-emerald",
  "Frontend & Mobile": "tag-amber",
  "Flutter & State": "tag-accent",
  "Native & Platform": "tag-amber",
  "Backend & Firebase": "tag-emerald",
};

const categoryIcons: Record<string, string> = {
  Languages: "{ }",
  "Backend & APIs": "☁️",
  "Frontend & Mobile": "📱",
  Databases: "🗄️",
  "Architecture & Systems": "🏗️",
  Architecture: "🏗️",
  Security: "🔐",
  "Testing & Tools": "🛠️",
  "Flutter & State": "💙",
  "Native & Platform": "📲",
  "Offline-First & Data": "🗄️",
  "Backend & Firebase": "☁️",
  "Quality & Delivery": "✅",
};

export function skillTagClass(category: string) {
  return categoryColors[category] ?? "tag";
}

export function skillIcon(category: string) {
  return categoryIcons[category] ?? "◆";
}
