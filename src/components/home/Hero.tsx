import { useEffect, useRef } from "react";
import { Flag } from "@/components/icons/Sprite";
import { CountUp } from "@/components/site/CountUp";
import { SectionLink } from "@/components/site/SectionLink";
import { SplitText } from "@/components/site/SplitText";
import { HERO_STATS } from "@/data/home";
import { Reveal } from "@/components/site/Reveal";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // three.js loads only in the browser, after the page is interactive.
  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import("@/lib/three/globe").then(({ createGlobe }) => {
      const [host, canvas, labelsEl] = [heroRef.current, canvasRef.current, labelsRef.current];
      if (cancelled || !host || !canvas || !labelsEl) return;
      dispose = createGlobe({ canvas, labelsEl, host, textEl: textRef.current });
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <canvas className="globe-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="globe-labels" ref={labelsRef} aria-hidden="true" />
      <div className="wrap hero-wrap">
        <div className="hero-content" ref={textRef}>
          <Reveal as="span" className="chip">
            <Flag country="cn" />
            <span className="arrow">→</span>
            <Flag country="in" /> Trusted by 500+ Indian businesses
          </Reveal>
          <SplitText as="h1" className="d1">
            Import directly from China. <span className="grad-text">Without the guesswork.</span>
          </SplitText>
          <Reveal as="p" className="lead" delay={2}>
            Sourcing, factory inspection, shipping and customs, handled end to end by a team with its own company in
            Shanghai. You choose the product. We bring it to your door.
          </Reveal>
          <Reveal className="hero-btns" delay={3}>
            <SectionLink section="contact" className="btn btn-primary">
              Get a free sourcing quote <span aria-hidden="true">→</span>
            </SectionLink>
            <SectionLink section="journey" className="btn btn-ghost">
              See how it works
            </SectionLink>
          </Reveal>
          <Reveal className="hero-stats" delay={4}>
            {HERO_STATS.map((s) => (
              <div className="stat" key={s.label.join(" ")}>
                <b>
                  {s.count !== undefined ? <CountUp to={s.count} /> : s.value}
                  {s.suffix}
                </b>
                <span>
                  {s.label[0]}
                  <br />
                  {s.label[1]}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true">
        Scroll
        <i />
      </div>
    </section>
  );
}
