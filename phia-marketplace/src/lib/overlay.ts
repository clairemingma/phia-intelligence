"use client";

import { useEffect, useRef } from "react";

// Shared behaviour for the panels that cover the page below lg — the filter
// sheet and the nav drawer. While one is up the page behind it holds still,
// Escape dismisses it, and focus moves to the control that closes it.
export function useOverlay({
  open,
  onDismiss,
  focusRef,
}: {
  open: boolean;
  onDismiss: () => void;
  focusRef?: React.RefObject<HTMLElement | null>;
}) {
  // Read through a ref so a caller's inline handler doesn't re-run the effect —
  // re-running would capture `hidden` as the overflow to restore and leave the
  // page locked once the panel came down.
  const dismiss = useRef(onDismiss);
  dismiss.current = onDismiss;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    focusRef?.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss.current();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, focusRef]);
}
