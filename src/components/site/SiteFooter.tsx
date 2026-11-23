import { Link } from "@tanstack/react-router";
import { InstagramIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons/LineIcon";
import { POSTS } from "@/data/posts";
import { CHINA_COMPANY, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL, type SectionId } from "@/data/site";
import { Logo } from "./Logo";
import { SectionLink } from "./SectionLink";

const SERVICE_LINKS = [
  "Product sourcing",
  "Factory inspection",
  "Quality control",
  "Shipping & logistics",
  "Customs clearance",
  "Doorstep delivery",
];
const IMPORT_LINKS: [string, SectionId][] = [
  ["Furniture & interiors", "products"],
  ["Electronics & tech", "products"],
  ["EV & automotive", "products"],
  ["Lighting", "products"],
  ["Supermarket goods", "products"],
  ["Canton Fair trips", "trips"],
];

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <Logo />
            <p>
              End-to-end imports from China to India: sourcing, factory inspection, shipping and customs. Save time.
              Reduce costs.
            </p>
            <div className="ft-social">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
              <a href={PHONE_TEL} aria-label="Call">
                <PhoneIcon />
              </a>
            </div>
          </div>
          <div>
            <h4>Our services</h4>
            <ul>
              {SERVICE_LINKS.map((label) => (
                <li key={label}>
                  <SectionLink section="services">{label}</SectionLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>What we import</h4>
            <ul>
              {IMPORT_LINKS.map(([label, section]) => (
                <li key={label}>
                  <SectionLink section={section}>{label}</SectionLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Import guides</h4>
            <ul>
              {POSTS.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link to="/blog/$slug" params={{ slug: p.slug }}>
                    {p.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/blog" className="ft-all">
                  All articles →
                </Link>
              </li>
            </ul>
          </div>
          <div className="ft-contact">
            <h4>Get in touch</h4>
            <ul>
              <li>
                <b>Call / WhatsApp</b>
                <br />
                <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <b>India</b>
                <br />
                Hyderabad, Telangana
              </li>
              <li>
                <b>China</b>
                <br />
                {CHINA_COMPANY}, Shanghai
              </li>
              <li>
                <b>Instagram</b>
                <br />
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="ft-bottom">
          <span>© {new Date().getFullYear()} ImportNow.in · All rights reserved.</span>
          <span className="concept">Concept design · preview prepared for ImportNow</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <a className="wa" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <WhatsAppIcon detailed />
    </a>
  );
}
