import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"
      }
      className={`grid place-items-center h-8 w-8 shrink-0 rounded-full border border-line text-ink-dim hover:text-violet hover:border-ink-faint transition-colors ${className}`}
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
