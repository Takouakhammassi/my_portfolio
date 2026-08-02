import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Send,
} from "lucide-react";
import Reveal, { SectionHeading } from "./Reveal";
import { profile } from "../data/content";

const TOAST_DURATION = 3800;

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [toast, setToast] = useState(null); // { type: "success" | "error", message }
  const dismissTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(dismissTimer.current);
  }, []);

  const showToast = (type, message) => {
    clearTimeout(dismissTimer.current);
    setToast({ type, message });
    dismissTimer.current = setTimeout(() => setToast(null), TOAST_DURATION);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !profile.contactAccessKey ||
      profile.contactAccessKey.includes("COLLE_TA_CLE")
    ) {
      setStatus("error");
      showToast(
        "error",
        "Formulaire non configuré — ajoute ta clé Web3Forms dans content.js"
      );
      return;
    }

    setStatus("sending");
    const form = e.target;
    const formData = new FormData(form);
    formData.append("access_key", profile.contactAccessKey);
    formData.append(
      "subject",
      formData.get("subject") || `Nouveau message depuis le portfolio de ${profile.name}`
    );

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setStatus("sent");
        showToast("success", "Message sent ! I'll get back to you soon.");
        form.reset();
      } else {
        setStatus("error");
        showToast("error", "Failed to send message — please try again or contact me directly.");
      }
    } catch {
      setStatus("error");
      showToast("error", "Failed to send message — please try again or contact me directly.");
    }
  };

  const isSending = status === "sending";

  return (
    <section id="contact" className="relative py-28 px-6">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-[200] glass rounded-full pl-4 pr-5 py-3 flex items-center gap-2 text-sm shadow-lg ${
              toast.type === "success" ? "text-ink" : "text-rose"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={16} className="text-violet shrink-0" />
            ) : (
              <AlertCircle size={16} className="text-rose shrink-0" />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="06 · Contact"
          title="Let's discuss your next data project."
          subtitle="Got an idea, a dataset to explore, or a model to deploy? Feel free to reach out."
        />

        <Reveal delay={0.1}>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-line">
              <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-violet" />
              <span className="ml-3 font-mono text-xs text-ink-faint">
                contact.py
              </span>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className="font-mono text-xs text-ink-faint">
                    name =
                  </span>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder='Your name'
                    className="mt-1.5 w-full rounded-lg bg-panel-2 border border-line px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-violet/50"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-xs text-ink-faint">
                    email =
                  </span>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder='you@exemple.com'
                    className="mt-1.5 w-full rounded-lg bg-panel-2 border border-line px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-violet/50"
                  />
                </label>
              </div>

              <label className="block">
                <span className="font-mono text-xs text-ink-faint">
                  subject =
                </span>
                <input
                  required
                  name="subject"
                  type="text"
                  placeholder='Message Subject'
                  className="mt-1.5 w-full rounded-lg bg-panel-2 border border-line px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-violet/50"
                />
              </label>

              <label className="block">
                <span className="font-mono text-xs text-ink-faint">
                  message =
                </span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder='Tell me about your project...'
                  className="mt-1.5 w-full rounded-lg bg-panel-2 border border-line px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-violet/50 resize-none"
                />
              </label>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-violet text-void font-medium text-sm px-6 py-2.5 hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      Envoi <Loader2 size={15} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Envoyer <Send size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Reveal>

                <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-sm text-ink-dim hover:text-violet transition-colors"
            >
              {profile.email}
            </a>

            <span className="text-ink-faint">·</span>

            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-ink-dim hover:text-violet transition-colors"
              >
                <ExternalLink size={14} />
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}