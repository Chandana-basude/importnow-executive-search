import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ElementType } from "react";

type Callback = () => void;
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, Callback>();

/** One IntersectionObserver shared by every revealed element on the page. */
function sharedObserver() {
  observer ??= new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        callbacks.get(e.target)?.();
        callbacks.delete(e.target);
        observer?.unobserve(e.target);
      }),
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
  );
  return observer;
}

/** True once the element has scrolled into view (immediately with reduced motion). */
export function useReveal<T extends Element>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = sharedObserver();
    callbacks.set(el, () => setShown(true));
    io.observe(el);
    return () => {
      callbacks.delete(el);
      io.unobserve(el);
    };
  }, []);

  return [ref, shown] as const;
}

export type RevealDelay = 0 | 1 | 2 | 3 | 4 | 5;

export const revealClass = (shown: boolean, delay: RevealDelay = 0, className?: string) =>
  [className, "rv", delay ? `d${delay}` : "", shown ? "in" : ""].filter(Boolean).join(" ");

type RevealProps<T extends ElementType> = {
  as?: T;
  delay?: RevealDelay;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/** Fades and lifts its content in when scrolled into view; `delay` staggers siblings (styles: .rv / .d1-.d5). */
export function Reveal<T extends ElementType = "div">({ as, delay = 0, className, ...rest }: RevealProps<T>) {
  const Tag: ElementType = as ?? "div";
  const [ref, shown] = useReveal<HTMLElement>();
  return <Tag ref={ref} className={revealClass(shown, delay, className)} {...rest} />;
}
