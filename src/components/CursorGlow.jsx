import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const render = () => {
      el.style.transform = `translate3d(${x - 220}px, ${y - 220}px, 0)`;
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", move);
    render();

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0 h-[440px] w-[440px] rounded-full opacity-[0.07] blur-3xl mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, var(--color-violet) 0%, transparent 70%)",
      }}
    />
  );
}
