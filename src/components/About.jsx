import { Check } from "lucide-react";
import Reveal, { SectionHeading } from "./Reveal";
import { about } from "../data/content";

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="01 · About Me"
        />

        <div className="grid md:grid-cols-5 gap-10">
          <Reveal delay={0.1} className="md:col-span-3 space-y-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-ink-dim leading-relaxed">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-2">
            <div className="glass rounded-2xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint mb-4">
                My Mindset
              </p>
              <ul className="space-y-3">
                {about.focusAreas.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-violet shrink-0">
                      <Check size={16} />
                    </span>
                    <span className="text-sm text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
