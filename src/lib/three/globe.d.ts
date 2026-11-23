export function createGlobe(opts: {
  canvas: HTMLCanvasElement;
  labelsEl: HTMLElement;
  host: HTMLElement;
  textEl: HTMLElement | null;
}): () => void;
