import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean.split("").map((c) => c + c).join("")
      : clean;
  const int = parseInt(full, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

export default function HeroMedia({
  photo,
  video,
  name,
  className = "",
  chromaKey = null,
  chromaThreshold = 90,
  chromaSoftness = 55,
  zoom = 1,
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [needsTap, setNeedsTap] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (!video) return;
    const el = videoRef.current;
    if (!el) return;
    let cancelled = false;

    const tryPlayWithSound = async () => {
      try {
        el.muted = false;
        await el.play();
        if (!cancelled) setNeedsTap(false);
      } catch {
        if (cancelled) return;
        try {
          el.muted = true;
          await el.play();
        } catch {
          // ignore
        }
        setNeedsTap(true);
      }
    };

    tryPlayWithSound();

    const events = ["pointerdown", "keydown", "touchstart"];
    const unlockOnFirstInteraction = () => {
      if (cancelled) return;
      const target = videoRef.current;
      if (!target) return;
      target.muted = false;
      target.play().then(() => setNeedsTap(false)).catch(() => {});
    };
    events.forEach((evt) =>
      window.addEventListener(evt, unlockOnFirstInteraction, {
        once: true,
        passive: true,
      })
    );

    return () => {
      cancelled = true;
      events.forEach((evt) =>
        window.removeEventListener(evt, unlockOnFirstInteraction)
      );
    };
  }, [video]);

  useEffect(() => {
    if (!video || !chromaKey) return;
    const videoEl = videoRef.current;
    const canvas = canvasRef.current;
    if (!videoEl || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const key = hexToRgb(chromaKey);
    const lowT = Math.max(chromaThreshold - chromaSoftness, 0);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const draw = () => {
      const box = canvas.getBoundingClientRect();
      const targetW = Math.max(1, Math.round(box.width * dpr));
      const targetH = Math.max(1, Math.round(box.height * dpr));
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      if (videoEl.videoWidth) {
        const videoRatio = videoEl.videoWidth / videoEl.videoHeight;
        const boxRatio = targetW / targetH;
        let sx = 0;
        let sy = 0;
        let sw = videoEl.videoWidth;
        let sh = videoEl.videoHeight;
        if (videoRatio > boxRatio) {
          sw = videoEl.videoHeight * boxRatio;
          sx = (videoEl.videoWidth - sw) / 2;
        } else {
          sh = videoEl.videoWidth / boxRatio;
          sy = (videoEl.videoHeight - sh) / 2;
        }

        ctx.drawImage(videoEl, sx, sy, sw, sh, 0, 0, targetW, targetH);
        const frame = ctx.getImageData(0, 0, targetW, targetH);
        const data = frame.data;
        for (let i = 0; i < data.length; i += 4) {
          const dr = data[i] - key.r;
          const dg = data[i + 1] - key.g;
          const db = data[i + 2] - key.b;
          const dist = Math.sqrt(dr * dr + dg * dg + db * db);
          if (dist < lowT) {
            data[i + 3] = 0;
          } else if (dist < chromaThreshold) {
            data[i + 3] = Math.round(
              ((dist - lowT) / (chromaThreshold - lowT)) * 255
            );
          }
        }
        ctx.putImageData(frame, 0, 0);
      }

      if (!videoEl.paused && !videoEl.ended) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    const start = () => {
      cancelAnimationFrame(rafRef.current);
      draw();
    };

    videoEl.addEventListener("play", start);
    videoEl.addEventListener("playing", start);
    if (!videoEl.paused) start();

    return () => {
      cancelAnimationFrame(rafRef.current);
      videoEl.removeEventListener("play", start);
      videoEl.removeEventListener("playing", start);
    };
  }, [video, chromaKey, chromaThreshold, chromaSoftness]);

  const handleUnmute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    el.play().catch(() => {});
    setNeedsTap(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
      className={`relative h-[260px] w-[260px] sm:h-[300px] sm:w-[300px] mx-auto lg:mx-0 ${className}`}
    >
      <span className="absolute -top-1 left-12 h-2 w-2 rounded-full bg-violet/70" />
      <span className="absolute top-14 -right-3 h-1.5 w-1.5 rounded-full bg-rose/70" />
      <span className="absolute bottom-6 -left-4 h-1.5 w-1.5 rounded-full bg-amber/70" />
      <span className="absolute -bottom-2 right-14 h-2 w-2 rounded-full bg-violet/60" />

      <div className="absolute inset-[-18px] rounded-full bg-violet/10 blur-2xl" />
      <div className="absolute inset-[-10px] rounded-full border border-violet/25" />

      <div
        className="relative h-full w-full rounded-full overflow-hidden border-2 border-violet/50"
        style={{ backgroundColor: "var(--color-void)" }}
      >
        {video ? (
          <>
            <video
              ref={videoRef}
              src={video}
              poster={photo}
              playsInline
              onEnded={() => setEnded(true)}
              style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
              className={
                chromaKey
                  ? "absolute inset-0 h-full w-full object-cover object-top opacity-0 pointer-events-none"
                  : "h-full w-full object-cover"
              }
            />
            {chromaKey && (
              <canvas
                ref={canvasRef}
                style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
                className="absolute inset-0 h-full w-full"
              />
            )}
          </>
        ) : (
          <img
            src={photo}
            alt={name}
            style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {video && needsTap && !ended && (
        <button
          type="button"
          onClick={handleUnmute}
          aria-label="Activer le son"
          title="Activer le son"
          className="absolute bottom-1 right-1 z-10 grid place-items-center h-8 w-8 rounded-full bg-panel-2/80 backdrop-blur-sm text-ink-dim opacity-70 hover:opacity-100 hover:text-violet transition-all"
        >
          <Volume2 size={13} />
        </button>
      )}
    </motion.div>
  );
}