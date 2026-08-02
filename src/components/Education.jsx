import Reveal, { SectionHeading } from "./Reveal";
import { education } from "../data/content";

export default function Education() {
  return (
    <section id="education" className="relative py-28 px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Education"
          title="Academic Journey"
        />

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-line" />

          <div className="space-y-12">
            {education.map((item, i) => (
              <Reveal key={item.role + item.period} delay={i * 0.08}>
                <div className="relative">
                  <img src={item.logo} alt={item.org} className="absolute -left-10 sm:-left-12 top-0 h-8 w-8 object-contain"/>
                  <p className="font-mono text-xs text-violet mb-1.5">
                    {item.period}
                  </p>
                  <h3 className="font-display text-lg font-medium text-ink">
                    {item.role}{" "}
                    <span className="text-ink-faint font-normal">
                      · {item.org}
                    </span>
                  </h3>
                  <p className="mt-2 text-sm text-ink-dim leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
