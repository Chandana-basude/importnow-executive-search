import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV_LINKS, type NavItem } from "@/data/site";
import { Logo } from "./Logo";
import { SectionLink } from "./SectionLink";

function NavLinkItem({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  if ("to" in item) {
    return (
      <Link to={item.to} activeProps={{ className: "active" }} onClick={onNavigate}>
        {item.label}
      </Link>
    );
  }
  return (
    <SectionLink section={item.section} {...(onNavigate ? { onNavigate } : {})}>
      {item.label}
    </SectionLink>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation, Escape, or when the screen grows past the mobile breakpoint.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 861px)");
    const onWide = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
    };
  }, [open]);

  const close = () => setOpen(false);
  const navClass = ["nav", !isHome && "solid", (scrolled || open) && "scrolled"].filter(Boolean).join(" ");

  return (
    <>
      <header className={navClass}>
        <div className="wrap">
          <Logo />
          <nav className="nav-links" aria-label="Main">
            {NAV_LINKS.map((item) => (
              <NavLinkItem key={item.label} item={item} />
            ))}
          </nav>
          <SectionLink section="contact" className="btn btn-primary nav-cta">
            Get a free quote
          </SectionLink>
          <button
            type="button"
            className="burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </header>
      <nav id="mobile-menu" className={`mobile-menu${open ? " open" : ""}`} aria-label="Mobile">
        {NAV_LINKS.map((item) => (
          <NavLinkItem key={item.label} item={item} onNavigate={close} />
        ))}
        <SectionLink section="contact" className="btn btn-primary btn-block" onNavigate={close}>
          Get a free quote →
        </SectionLink>
      </nav>
    </>
  );
}
