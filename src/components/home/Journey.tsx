import { useEffect, useRef, useState } from "react";
import { Flag, Icon } from "@/components/icons/Sprite";
import { JOURNEY_STEPS } from "@/data/home";
import { dayAt, routeProgress, sectionProgress, stepAt } from "@/lib/three/voyageTimeline";

/** Sticky 3D voyage: scrolling through the section sails the ship from Shanghai to Chennai. */
export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Written straight to the DOM: this runs every animation frame.
    const onRoute = (fraction: number, day: number) => {
      const pct = `${fraction * 100}%`;
      if (fillRef.current) fillRef.current.style.width = pct;
      if (boatRef.current) boatRef.current.style.left = pct;
      if (dayRef.current) dayRef.current.textContent = `Day ${day}`;
    };

    // Without WebGL the steps and route bar still follow the scroll.
    const startFallback = () => {
      setLoaded(true);
      const update = () => {
        const p = sectionProgress(section);
        setStep(stepAt(p));
        onRoute(routeProgress(p), dayAt(p));
      };
      update();
      window.addEventListener("scroll", update, { passive: true });
      return () => window.removeEventListener("scroll", update);
    };

    let dispose: (() => void) | undefined;
    let cancelled = false;
    import("@/lib/three/voyage")
      .then(({ createVoyage }) => {
        const [host, canvas] = [stickyRef.current, canvasRef.current];
        if (cancelled || !host || !canvas) return;
        dispose =
          createVoyage({ section, canvas, host, onStep: setStep, onRoute, onLoaded: () => setLoaded(true) }) ??
          startFallback();
      })
      .catch(() => {
        if (!cancelled) dispose = startFallback();
      });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <section className="journey" id="journey" ref={sectionRef}>
      <div className="journey-sticky" ref={stickyRef}>
        <canvas className="sea-canvas" ref={canvasRef} aria-hidden="true" />
        <div className={`j-loading${loaded ? " gone" : ""}`} aria-hidden="true">
          Loading 3D scene…
        </div>
        <div className="j-shade" />
        <div className="j-badge">
          <i /> Live shipment view
        </div>
        <div className="j-ui">
          <div className="wrap j-wrap">
            <div className="j-head">
              <span className="eyebrow">How it works</span>
              <h2>Watch your order travel from China to India.</h2>
            </div>
            <ol className="j-steps" aria-live="polite">
              {JOURNEY_STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className={["j-step", i === step && "on", i < step && "done"].filter(Boolean).join(" ")}
                  aria-current={i === step ? "step" : undefined}
                >
                  <span className="n">{i + 1}</span>
                  <div>
                    <h4>{s.title}</h4>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="j-route">
              <div className="j-port">
                <Flag country="cn" />
                <div>
                  <span className="pname">Shanghai</span>
                  <small>Origin port</small>
                </div>
              </div>
              <div className="j-track">
                <div className="j-fill" ref={fillRef} />
                <div className="j-boat" ref={boatRef}>
                  <Icon name="i-ship" />
                </div>
              </div>
              <div className="j-port">
                <div className="to">
                  <span className="pname">Chennai</span>
                  <small>Destination</small>
                </div>
                <Flag country="in" />
              </div>
              <div className="j-day" ref={dayRef}>
                Day 0
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
