import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const int = parseInt(full, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

export default function SectionAvatar({
  video,
  chromaKey = null,
  chromaThreshold = 90,
  chromaSoftness = 55,
  className = "",
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const rafRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!video) return;
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [video]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !video) return;
    if (visible) {
      videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
    }
  }, [visible, video]);

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

      ctx.clearRect(0, 0, targetW, targetH);

      if (videoEl.videoWidth) {
        const scale = Math.min(
          targetW / videoEl.videoWidth,
          targetH / videoEl.videoHeight
        );
        const drawW = videoEl.videoWidth * scale;
        const drawH = videoEl.videoHeight * scale;
        const dx = (targetW - drawW) / 2;
        const dy = (targetH - drawH) / 2;

        ctx.drawImage(
          videoEl,
          0,
          0,
          videoEl.videoWidth,
          videoEl.videoHeight,
          dx,
          dy,
          drawW,
          drawH
        );
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

  if (!video) return null;

  return (
    <div
      ref={wrapperRef}
      className={`hidden lg:block sticky top-28 self-start ${className}`}
    >
      <motion.div
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative h-[260px] w-[260px]"
      >
        <div className="absolute inset-[-14px] rounded-full bg-violet/10 blur-2xl" />
        <div className="absolute inset-[-8px] rounded-full border border-violet/25" />

        <div
          className="relative h-full w-full rounded-full overflow-hidden border-2 border-violet/50"
          style={{ backgroundColor: "var(--color-void)" }}
        >
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            className={
              chromaKey
                ? "absolute inset-0 h-full w-full object-contain opacity-0 pointer-events-none"
                : "h-full w-full object-contain"
            }
          />
          {chromaKey && (
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          )}
        </div>
      </motion.div>
    </div>
  );
}