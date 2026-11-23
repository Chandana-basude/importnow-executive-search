import { InstagramIcon, PhoneIcon, PinIcon } from "@/components/icons/LineIcon";
import { SplitText } from "@/components/site/SplitText";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_TEL } from "@/data/site";
import { QuoteForm } from "./QuoteForm";
import { Reveal } from "@/components/site/Reveal";

export function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap ct-grid">
        <div>
          <Reveal as="span" className="eyebrow">Start importing</Reveal>
          <SplitText className="big-head d1">
            Tell us what you want to import. <span className="grad-text">We'll take it from there.</span>
          </SplitText>
          <Reveal as="p" className="lead-muted" delay={2}>
            Share the product and quantity. You'll get supplier options, landed cost and timelines, free of charge.
          </Reveal>
          <div className="ct-lines">
            <Reveal as="a" className="ct-line" delay={2} href={PHONE_TEL}>
              <PhoneIcon />
              <div>
                <small>Call or WhatsApp</small>
                <b>{PHONE_DISPLAY}</b>
              </div>
            </Reveal>
            <Reveal as="a" className="ct-line" delay={3} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
              <div>
                <small>Instagram</small>
                <b>{INSTAGRAM_HANDLE}</b>
              </div>
            </Reveal>
            <Reveal className="ct-line" delay={4}>
              <PinIcon />
              <div>
                <small>Offices</small>
                <b>Hyderabad, India · Shanghai, China</b>
              </div>
            </Reveal>
          </div>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
