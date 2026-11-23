import { Link, useRouterState } from "@tanstack/react-router";
import type { MouseEvent, ReactNode } from "react";
import type { SectionId } from "@/data/site";

/**
 * Link to a section of the home page. On the home page it smooth-scrolls in place;
 * from any other page it navigates to /#section.
 */
export function SectionLink({
  section,
  className,
  children,
  onNavigate,
  ...rest
}: {
  section: SectionId;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
  "aria-label"?: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (pathname !== "/" || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const el = document.getElementById(section);
    if (!el) return;
    e.preventDefault();
    const top = section === "home" ? 0 : el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(window.history.state, "", `#${section}`);
  };

  return (
    <Link to="/" hash={section} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
