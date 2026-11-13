/**
 * Locks a scroll container so wheel/touch/keyboard input cannot advance it
 * (used to freeze the tour while a modal is open). Returns a restore function.
 */
export function lockScroll(el: HTMLElement): () => void {
  const prev = el.style.overflow;
  el.style.overflow = "hidden";
  return () => {
    el.style.overflow = prev;
  };
}
