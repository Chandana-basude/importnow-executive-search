import { SectionHead } from "@/components/site/SectionHead";
import { FAQS } from "@/data/home";
import { Reveal } from "@/components/site/Reveal";

/** Native <details> accordion: keyboard and screen-reader friendly with no extra script. */
export function Faq() {
  return (
    <section className="section tight" id="faq">
      <div className="wrap">
        <SectionHead eyebrow="Questions" title="Before you import" />
        <Reveal className="faq" delay={2}>
          {FAQS.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>
                {f.q}
                <i aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
