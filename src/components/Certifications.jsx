import { useState } from "react";
import { Award, Download, Eye } from "lucide-react";
import Reveal, { SectionHeading } from "./Reveal";
import Modal from "./Modal";
import { certifications } from "../data/content";

function CertificationCard({ cert, index, onOpen }) {
  return (
    <Reveal delay={index * 0.06}>
      <button
        type="button"
        onClick={() => onOpen(cert)}
        className="group glass w-full text-left rounded-2xl p-5 flex items-center gap-4 hover:border-ink-faint transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/60"
      >
        <span className="grid place-items-center h-11 w-11 shrink-0 rounded-xl bg-panel-2 text-violet">
          <Award size={20} />
        </span>
        <span className="min-w-0">
          <span className="block font-display text-sm font-medium text-ink truncate">
            {cert.title}
          </span>
          <span className="block font-mono text-[11px] text-ink-faint mt-1 truncate">
            {cert.issuer} · {cert.date}
          </span>
        </span>
        <span className="ml-auto shrink-0 text-ink-faint group-hover:text-violet transition-colors">
          <Eye size={17} />
        </span>
      </button>
    </Reveal>
  );
}

function CertificationDetail({ cert }) {
  return (
    <div className="grid md:grid-cols-2">
      <div className="bg-panel-2 p-3 sm:p-4">
        <div className="rounded-xl overflow-hidden border border-line">
          <img
            src={cert.image}
            alt={`Aperçu du certificat ${cert.title}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="p-6 sm:p-8 flex flex-col">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-panel-2 border border-line px-3 py-1 font-mono text-[11px] text-violet mb-4">
          {cert.issuer}
        </span>
        <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-2">
          {cert.title}
        </h3>
        <p className="font-mono text-xs text-ink-faint">{cert.date}</p>

        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          <a
            href={cert.fileUrl}
            download
            className="inline-flex items-center gap-2 rounded-full bg-violet text-void font-medium text-sm px-5 py-2.5 hover:brightness-110 transition"
          >
            <Download size={15} />
            Download PDF
          </a>
          <a
            href={cert.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line text-ink font-medium text-sm px-5 py-2.5 hover:border-ink-faint transition"
          >
            <Eye size={15} />
            View PDF
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  const [active, setActive] = useState(null);

  return (
    <section id="certifications" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="03 · Certifications"
          title="Completed Training Courses"
          subtitle="Click on a certification to preview and download it"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          {certifications.map((cert, i) => (
            <CertificationCard
              key={cert.title}
              cert={cert}
              index={i}
              onOpen={setActive}
            />
          ))}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && <CertificationDetail cert={active} />}
      </Modal>
    </section>
  );
}
