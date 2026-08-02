import { motion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  as: Component = motion.div,
}) {
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </Component>
  );
}

export function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet mb-3">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-ink-dim leading-relaxed">{subtitle}</p>
      )}
    </Reveal>
  );
}
