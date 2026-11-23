import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => window.matchMedia("(hover:hover) and (pointer:fine)").matches;

/**
 * Site-wide motion, mounted once in the root layout:
 * - reveal-on-scroll: adds .in to every .rv element as it enters the viewport (also ones rendered later)
 * - scroll progress bar
 * - 3D tilt on .tilt cards and a slight magnetic pull on buttons (mouse only)
 */
export function MotionEffects() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
    );
    const observeAll = () => document.querySelectorAll(".rv:not(.in)").forEach((el) => io.observe(el));
    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  // Tilt + magnetic buttons
  useEffect(() => {
    if (!finePointer() || prefersReducedMotion()) return;
    let tilted: HTMLElement | null = null;
    let magnet: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target : null;

      const card = target?.closest<HTMLElement>(".tilt") ?? null;
      if (tilted && tilted !== card) tilted.style.transform = "";
      tilted = card;
      if (card) {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`;
        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);
      }

      const btn = target?.closest<HTMLElement>(".btn-primary,.read-more,.btn-ghost") ?? null;
      if (magnet && magnet !== btn) magnet.style.transform = "";
      magnet = btn;
      if (btn) {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${((e.clientX - r.left) / r.width - 0.5) * 12}px,${((e.clientY - r.top) / r.height - 0.5) * 10}px)`;
      }
    };
    const reset = () => {
      if (tilted) tilted.style.transform = "";
      if (magnet) magnet.style.transform = "";
      tilted = magnet = null;
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", reset);
      reset();
    };
  }, []);

  return <ScrollProgress />;
}

function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return <div className="progress" id="scroll-progress" aria-hidden="true" />;
}
