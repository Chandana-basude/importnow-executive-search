import type { ReactNode } from "react";
import { SplitText } from "./SplitText";
import { Reveal } from "@/components/site/Reveal";

/** Eyebrow + split-reveal headline + optional intro, used at the top of most home sections. */
export function SectionHead({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: string }) {
  return (
    <div className="section-head">
      <Reveal as="span" className="eyebrow">{eyebrow}</Reveal>
      <SplitText className="d1">{title}</SplitText>
      {intro && <Reveal as="p" delay={2}>{intro}</Reveal>}
    </div>
  );
}
