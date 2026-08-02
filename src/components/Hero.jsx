import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import EmbeddingScene from "./EmbeddingScene";
import HeroMedia from "./HeroMedia";
import { profile } from "../data/content";

const TYPED_LINES = [
  "model = train(data, task='real_world_impact')",
  "insights = explain(model, method='shap')",
  "deploy(model, target='production')",
];

function useTypewriter(lines, speed = 38, pause = 1400) {
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    let charIndex = 0;
    let timeout;
    const current = lines[lineIndex];

    const type = () => {
      if (charIndex <= current.length) {
        setText(current.slice(0, charIndex));
        charIndex += 1;
        timeout = setTimeout(type, speed);
      } else {
        timeout = setTimeout(() => {
          setLineIndex((i) => (i + 1) % lines.length);
        }, pause);
      }
    };
    type();
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIndex]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(TYPED_LINES);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-grid"
    >
      {/* Vignette pour fondre la grille dans le fond */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-void)_78%)]" />

      <EmbeddingScene className="absolute inset-0 opacity-90" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />

      <div className="relative z-10 mx-auto max-w-6xl w-full px-6 pt-24">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs tracking-[0.2em] uppercase text-violet mb-5"
            >
              # {profile.role}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] font-semibold tracking-tight"
            >
              Hello, I'm{" "}
              <span className="text-gradient">{profile.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-xl text-ink-dim text-base sm:text-lg leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 glass inline-flex rounded-lg px-4 py-3 font-mono text-xs sm:text-sm text-ink-dim min-w-[min(92vw,420px)]"
            >
              <span className="text-ink-faint mr-2 select-none">&gt;&gt;&gt;</span>
              <span className="text-ink caret">{typed}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="rounded-full bg-violet text-void font-medium text-sm px-6 py-3 hover:brightness-110 transition"
              >
                Explore my projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-line text-ink font-medium text-sm px-6 py-3 hover:border-ink-faint transition"
              >
                Contact me
              </a>
            </motion.div>
          </div>

          <HeroMedia
            photo={profile.photo}
            video={profile.introVideo}
            chromaKey={profile.introVideoChromaKey}
            chromaThreshold={7}
            chromaSoftness={10}
            name={profile.name}
            className="order-1 lg:order-2"
          />
        </div>

      </div>

      <motion.a
        href="#about"
        aria-label="Défiler vers la section suivante"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-ink-faint hover:text-violet transition-colors"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
