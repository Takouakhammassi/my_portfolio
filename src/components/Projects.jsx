import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Database, ExternalLink } from "lucide-react";
import Reveal, { SectionHeading } from "./Reveal";
import Modal from "./Modal";
import { projects } from "../data/content";

function ProjectCard({ project, index, onOpen }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <Reveal delay={index * 0.08} className="[perspective:1000px]">
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpen(project)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(project);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Voir le détail du projet ${project.title}`}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 150, damping: 14 }}
        style={{ transformStyle: "preserve-3d" }}
        className="group glass rounded-2xl p-6 h-full flex flex-col cursor-pointer hover:border-ink-faint transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/60"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="font-display text-lg font-medium text-ink">
            {project.title}
          </h3>
          <span className="shrink-0 text-ink-faint group-hover:text-violet transition-colors">
            <ArrowUpRight size={20} />
          </span>
        </div>

        <p className="text-sm text-ink-dim leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-panel-2 px-3.5 py-2.5">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-faint">
              <Database size={13} />
              {project.dataset}
            </span>
            <span className="font-mono text-xs text-violet">
              {project.metric.label} {project.metric.value}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-line text-ink-dim"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

function ProjectDetail({ project }) {
  return (
    <div className="grid md:grid-cols-2">
      <div className="bg-panel-2 p-3 sm:p-4">
        <div className="rounded-xl overflow-hidden border border-line">
          <img
            src={project.image}
            alt={`View project ${project.title}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="p-6 sm:p-8 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-panel-2 text-ink-dim border border-line"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-2xl font-semibold text-ink mb-3">
          {project.title}
        </h3>
        <p className="text-sm text-ink-dim leading-relaxed">
          {project.description}
        </p>

        <div className="mt-6 flex items-center justify-between rounded-lg bg-panel-2 px-3.5 py-2.5">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-faint">
            <Database size={13} />
            {project.dataset}
          </span>
          <span className="font-mono text-xs text-violet">
            {project.metric.label} {project.metric.value}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-violet text-void font-medium text-sm px-5 py-2.5 hover:brightness-110 transition"
          >
            <ExternalLink size={15} />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line text-ink font-medium text-sm px-5 py-2.5 hover:border-ink-faint transition"
          >
            <Code2 size={15} />
            Source Code
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <section id="projects" className="relative py-28 px-6 bg-panel/40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="04 · Projects"
          title="Featured Projects"
        />

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onOpen={setActive}
            />
          ))}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && <ProjectDetail project={active} />}
      </Modal>
    </section>
  );
}
