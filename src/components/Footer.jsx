import { profile } from "../data/content";

export default function Footer() {
  return (
    <footer className="px-6 py-8 border-t border-line">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-ink-faint">
          © {new Date().getFullYear()} {profile.name} — Built with React,
          Three.js &amp; Tailwind.
        </p>
        <p className="font-mono text-xs text-ink-faint">{profile.location}</p>
      </div>
    </footer>
  );
}
