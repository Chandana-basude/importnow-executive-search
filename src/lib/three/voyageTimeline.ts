/**
 * Scroll timeline for the "How it works" voyage, shared by the 3D scene and its no-WebGL fallback.
 * `p` is scroll progress through the journey section, 0..1.
 */
export const DOCK_OUT = 0.4; // ship leaves Shanghai
export const DOCK_IN = 0.84; // ship docks in Chennai
/** Scroll progress at which each of the six steps becomes active. */
export const STEP_AT = [0, 0.12, 0.24, DOCK_OUT, DOCK_IN, 0.92] as const;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** How far along the sea route the ship is, 0 (Shanghai) .. 1 (Chennai). */
export function routeProgress(p: number): number {
  if (p < DOCK_OUT) return 0;
  if (p > DOCK_IN) return 1;
  return easeInOutCubic((p - DOCK_OUT) / (DOCK_IN - DOCK_OUT));
}

export function stepAt(p: number): number {
  let index = 0;
  STEP_AT.forEach((at, i) => {
    if (p >= at) index = i;
  });
  return index;
}

/** Day counter: ~7 days loading, ~23 days at sea, ~5 days clearance and delivery. */
export function dayAt(p: number): number {
  const q = clamp(p, 0, 1);
  if (q < DOCK_OUT) return Math.round((q / DOCK_OUT) * 7);
  if (q < DOCK_IN) return 7 + Math.round(((q - DOCK_OUT) / (DOCK_IN - DOCK_OUT)) * 23);
  return 30 + Math.round(((q - DOCK_IN) / (1 - DOCK_IN)) * 5);
}

/** Scroll progress through a tall sticky section. */
export function sectionProgress(section: HTMLElement): number {
  const r = section.getBoundingClientRect();
  return clamp(-r.top / (r.height - window.innerHeight), 0, 1);
}
