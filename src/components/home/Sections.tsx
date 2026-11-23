/** Static home page sections: content lives in src/data/home.tsx. */
import { Flag } from "@/components/icons/Sprite";
import { CheckIcon, LineIcon } from "@/components/icons/LineIcon";
import { SectionHead } from "@/components/site/SectionHead";
import { SectionLink } from "@/components/site/SectionLink";
import { SplitText } from "@/components/site/SplitText";
import {
  MARQUEE_ROUTES,
  PRODUCTS,
  SERVICES,
  SHANGHAI_POINTS,
  STORIES,
  TRIP_DATES,
  TRIP_INCLUDES,
  TRIP_PLACES,
  WORK,
} from "@/data/home";
import { CHINA_COMPANY } from "@/data/site";
import { useRef, type PointerEvent } from "react";
import { Reveal } from "@/components/site/Reveal";

const delay = (i: number, cycle = 3) => (i % cycle ? ` d${i % cycle}` : "");

export function Marquee() {
  // Rendered twice so the -50% translate loops seamlessly.
  const items = [...MARQUEE_ROUTES, ...MARQUEE_ROUTES];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map(([from, to], i) => (
          <span key={i}>
            {from} <em>→</em> {to}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <SectionHead
          eyebrow="End-to-end imports"
          title={
            <>
              One team from the <span className="grad-text">factory floor</span> to your front door.
            </>
          }
          intro="Anyone can say they import from China. What you actually need is a smooth process, clear communication and a shipment that arrives safely."
        />
        <div className="grid-3">
          {SERVICES.map((s, i) => (
            <Reveal as="article" className="card tilt" delay={stagger(i)} key={s.title}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <div className="icon">
                <LineIcon>{s.icon}</LineIcon>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Products() {
  return (
    <section className="section" id="products">
      <div className="wrap">
        <SectionHead
          eyebrow="What we import"
          title={
            <>
              China has a market for every industry. <span className="grad-text">We know each one.</span>
            </>
          }
          intro="Each industry has its own manufacturing hub. We take you straight to the source."
        />
        <div className="products">
          {PRODUCTS.map((p, i) => (
            <Reveal as="article" className="card prod tilt" delay={stagger(i)} key={p.title}>
              <LineIcon strokeWidth={1.2} className="art">
                {p.art}
              </LineIcon>
              <span className="hub">
                <Flag country="cn" /> {p.hub}
              </span>
              <h3>{p.title}</h3>
              <ul>
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <span className="tag">{p.tag}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Shanghai() {
  const licenceRef = useRef<HTMLDivElement>(null);

  // The licence card turns towards the pointer (mouse only, like the reference).
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !licenceRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    licenceRef.current.style.transform = `rotateY(${x * 24}deg) rotateX(${-y * 16}deg)`;
  };
  const onLeave = () => {
    if (licenceRef.current) licenceRef.current.style.transform = "";
  };

  return (
    <section className="section shanghai" id="shanghai">
      <div className="wrap sh-grid">
        <div>
          <Reveal as="span" className="eyebrow">Officially in China</Reveal>
          <SplitText className="big-head d1">
            Many claim an office in China. <span className="grad-text">We have the licence.</span>
          </SplitText>
          <Reveal as="p" className="lead-muted" delay={2}>
            ImportNow operates through its own registered company in Shanghai, <b>{CHINA_COMPANY}</b> That means we
            can sign contracts with factories, pay suppliers locally and stand behind every order.
          </Reveal>
          <ul className="checks">
            {SHANGHAI_POINTS.map((pt, i) => (
              <Reveal as="li" delay={(i + 2) as RevealDelay} key={pt.strong}>
                <span className="tick">
                  <CheckIcon />
                </span>
                <div>
                  <b>{pt.strong}</b>
                  {pt.rest}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal className="license-stage" delay={2} onPointerMove={onMove} onPointerLeave={onLeave}>
          <div
            className="license"
            ref={licenceRef}
            role="img"
            aria-label={`Business licence of ${CHINA_COMPANY}, Shanghai`}
          >
            <div className="lt" lang="zh">
              营业执照
            </div>
            <div className="ls">BUSINESS LICENCE</div>
            <div className="emblem" />
            <dl>
              <dt>Company</dt>
              <dd>{CHINA_COMPANY}</dd>
              <dt>Location</dt>
              <dd>Shanghai, People's Republic of China</dd>
              <dt>Scope</dt>
              <dd>Supply chain, sourcing &amp; international trade</dd>
              <dt>Serving</dt>
              <dd>Importers across India</dd>
            </dl>
            <div className="qr" />
            <div className="stamp">
              <span>
                SHANGHAI
                <br />
                SHENGQIAO
                <br />
                TRADING
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Trips() {
  return (
    <section className="section" id="trips">
      <div className="wrap">
        <SectionHead
          eyebrow="Business trips to China"
          title={
            <>
              Your business trip doesn't have to <span className="grad-text">feel like work.</span>
            </>
          }
          intro="Guided trips to the Canton Fair, wholesale markets and factories you choose. Our clients often tell us it felt like a personal trip, not a business tour."
        />
        <div className="trips-grid">
          <Reveal as="article" className="card trip-hero">
            <svg className="skyline" viewBox="0 0 600 150" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 150V110h30V80h20v30h25V60h15V40h10v20h15v50h30V70h40v40h20V30l15-25 15 25v80h25V85h30v25h20V50h35v60h25V90h30V20h12V0h6v20h12v90h30V75h40v35h25V95h30v55z" />
            </svg>
            <span className="eyebrow">Canton Fair · Guangzhou</span>
            <h3>Meet factories face to face. We handle everything else.</h3>
            <p>
              Walk the world's biggest trade fair with a guide who speaks the language, then visit the factories you
              shortlist.
            </p>
            <div className="pill-row">
              {TRIP_PLACES.map((p) => (
                <span className="pill" key={p}>
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal as="article" className="card" delay={1}>
            <h3 className="card-title">What's included</h3>
            <div className="inc">
              {TRIP_INCLUDES.map((item) => (
                <div key={item.label}>
                  <LineIcon>{item.icon}</LineIcon>
                  {item.label}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal as="article" className="card" delay={2}>
            <h3 className="card-title sm">Next departures</h3>
            <div className="dates">
              {TRIP_DATES.map((d) => (
                <div className="date" key={d.season}>
                  <b>{d.season}</b>
                  <span>{d.when}</span>
                </div>
              ))}
            </div>
            <SectionLink section="contact" className="btn btn-primary trip-cta">
              Join the next trip →
            </SectionLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section className="section tight" id="work">
      <div className="wrap">
        <SectionHead
          eyebrow="Recently delivered"
          title={
            <>
              Another container unloaded, <span className="grad-text">another happy client.</span>
            </>
          }
        />
        <div className="work-grid">
          {WORK.map((w, i) => (
            <Reveal as="article" className="card work tilt" delay={stagger(i, 4)} key={w.title}>
              <div className={`ph ${w.tone}`}>
                <LineIcon strokeWidth={1.3}>{w.art}</LineIcon>
                <span className="route-chip">
                  <Flag country="cn" />
                  {w.route}
                </span>
              </div>
              <div className="bd">
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <div className="meta">
                  {w.meta.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stories() {
  return (
    <section className="section tight" id="stories">
      <div className="wrap">
        <SectionHead
          eyebrow="Client stories"
          title={
            <>
              Heard from the people <span className="grad-text">who made the trip.</span>
            </>
          }
        />
        <div className="grid-3">
          {STORIES.map((s, i) => (
            <Reveal as="figure" className="card quote" delay={stagger(i)} key={s.name}>
              <blockquote className="q">{s.quote}</blockquote>
              <figcaption className="who">
                <span className="avatar" aria-hidden="true">
                  {s.initials}
                </span>
                <div>
                  <b>{s.name}</b>
                  <span>{s.role}</span>
                </div>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
