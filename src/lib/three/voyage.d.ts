export function createVoyage(opts: {
  section: HTMLElement;
  canvas: HTMLCanvasElement;
  host: HTMLElement;
  onStep: (index: number) => void;
  onRoute: (fraction: number, day: number) => void;
  onLoaded: () => void;
}): (() => void) | null;
