// Changing what the grid shows — a filter, or the page — returns the shopper to
// the top of the results, since everything below them just changed.
export function scrollToTop() {
  // Deferred a frame: focusing a control scrolls it into view during the click,
  // and that scroll would cancel a smooth one started synchronously.
  requestAnimationFrame(() => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  });
}
