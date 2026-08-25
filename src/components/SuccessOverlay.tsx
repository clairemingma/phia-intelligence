"use client";

import { useEffect, useRef, useState } from "react";

import SubmissionSuccess from "@/components/SubmissionSuccess";

/**
 * When the last frame of the collage has finished arriving: the link carries
 * the longest delay in SubmissionSuccess, and every entrance runs for 1000ms.
 */
const SETTLE_MS = 1840;

/** How long the assembled collage holds before the overlay starts clearing. */
const HOLD_MS = 1600;

/** The overlay's own fade, both directions. */
const FADE_MS = 450;

/**
 * The submission success screen as a transient full-screen takeover: it fades
 * in over whatever the brand was reading, plays its entrance, holds, and clears
 * itself. Mounting is what opens it — render it only while it should be up, so
 * SubmissionSuccess gets a fresh mount and replays its animation each time.
 *
 * It announces rather than asks, so it is a live region and not a dialog: there
 * is nothing to confirm and no control to focus. Tapping it or pressing Escape
 * dismisses it early.
 */
export default function SuccessOverlay({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(false);

  // Kept in a ref so a caller passing an inline arrow cannot restart the timers.
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  // Filled in by the effect below, so a tap can cut the sequence short.
  const dismissRef = useRef<() => void>(() => {});

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // With motion off the collage is simply there, so there is no entrance to
    // wait out before the hold begins.
    const settle = reduced ? 0 : SETTLE_MS;

    // The page must not scroll underneath. Taking the scrollbar away would
    // widen the content by its width, so give that width back as padding.
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = "hidden";
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;

    // Flip on the next frame, so the transition has an opacity 0 to run from.
    const raf = requestAnimationFrame(() => setVisible(true));

    const timers = [
      window.setTimeout(() => setVisible(false), settle + HOLD_MS),
      window.setTimeout(() => onDoneRef.current(), settle + HOLD_MS + FADE_MS),
    ];

    const dismiss = () => {
      setVisible(false);
      timers.forEach(clearTimeout);
      timers.push(window.setTimeout(() => onDoneRef.current(), FADE_MS));
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);

    dismissRef.current = dismiss;

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={() => dismissRef.current()}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-white transition-opacity motion-reduce:transition-none"
      style={{ opacity: visible ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
    >
      <SubmissionSuccess variant="overlay" />
    </div>
  );
}
