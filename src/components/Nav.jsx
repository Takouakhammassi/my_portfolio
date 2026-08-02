import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { profile } from "../data/content";

const LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(94%,960px)]"
    >
      <nav className="glass rounded-full pl-5 pr-2.5 py-2.5 flex items-center justify-between gap-3">
        <a
          href="#top"
          className="font-display font-semibold text-sm text-ink tracking-tight shrink-0"
        >
          TK<span className="text-violet">.</span>
        </a>
        <ul className="hidden lg:flex items-center gap-0.5 font-mono text-xs">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`px-2.5 py-1.5 rounded-full whitespace-nowrap transition-colors duration-200 ${
                  active === link.id
                    ? "text-void bg-violet"
                    : "text-ink-dim hover:text-ink"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <a
            href={profile.resumeUrl}
            download
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs px-3.5 py-1.5 rounded-full border border-line text-ink hover:border-ink-faint transition-colors"
          >
            <Download size={13} />
            CV
          </a>
          <a
            href="#contact"
            className="lg:hidden font-mono text-xs px-3.5 py-1.5 rounded-full bg-violet text-void"
          >
            Contact
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
