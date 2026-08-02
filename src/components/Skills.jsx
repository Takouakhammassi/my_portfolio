import { Brain, Code2, Database, LineChart } from "lucide-react";
import Reveal, { SectionHeading } from "./Reveal";
import SectionAvatar from "./SectionAvatar";
import { profile, skills } from "../data/content";

const CATEGORY_ICONS = {
  Langages: Code2,
  "Data Science & AI": Brain,
  "Big Data": Database,
  Visualisation: LineChart,
};

function SkillPill({ name }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-panel-2 px-4 py-2 text-sm text-ink hover:border-violet/50 transition-colors">
      {name}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 bg-panel/40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="02 · Skills"
          title="Tech Stack"
        />

        <div
          className={`grid gap-10 ${
            profile.codingVideo ? "lg:grid-cols-[220px_1fr]" : ""
          }`}
        >
          <SectionAvatar
            video={profile.codingVideo}
            chromaKey={profile.codingVideoChromaKey}
            chromaThreshold={7}
            chromaSoftness={10}
          />

          <div className="grid sm:grid-cols-2 gap-5">
            {skills.map((group, gi) => {
              const Icon = CATEGORY_ICONS[group.category] ?? Code2;
              return (
                <Reveal key={group.category} delay={gi * 0.08}>
                  <div className="glass rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="grid place-items-center h-9 w-9 rounded-lg bg-panel-2 text-violet">
                        <Icon size={17} />
                      </span>
                      <h3 className="font-display text-sm uppercase tracking-wide text-ink-faint">
                        {group.category}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {group.items.map((item) => (
                        <SkillPill
                          key={item.name}
                          name={item.name}
                        />
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
