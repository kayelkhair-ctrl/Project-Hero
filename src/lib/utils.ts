export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouch = () =>
  window.matchMedia("(hover: none), (pointer: coarse)").matches;

export const $ = <T extends Element = HTMLElement>(
  sel: string,
  root: ParentNode = document
) => root.querySelector<T>(sel);

export const $$ = <T extends Element = HTMLElement>(
  sel: string,
  root: ParentNode = document
) => Array.from(root.querySelectorAll<T>(sel));
