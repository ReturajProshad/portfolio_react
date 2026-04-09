import { personal } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-subtle">{personal.fullName}</span>
        </p>
        <p className="flex items-center gap-1.5">
          Built with{" "}
          <span className="text-accent">Next.js</span> ·{" "}
          <span className="text-accent">TypeScript</span> ·{" "}
          <span className="text-accent">Tailwind</span> ·{" "}
          <span className="text-accent">Framer Motion</span>
        </p>
      </div>
    </footer>
  );
}
