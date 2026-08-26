"use client";

import { useEffect, useState, type RefObject } from "react";

/* eslint-disable @next/next/no-img-element */

/** How far the pane travels, and how long each leg of the nudge takes. */
const DIP_PX = 56;
const DOWN_MS = 620;
const HOLD_MS = 140;
const UP_MS = 520;

/** The circle moves less than the pane, so it reads as leading rather than
 *  racing it. */
const PUCK_PX = 16;

/** Long enough for the page to settle, and its images to land, before moving. */
const DELAY_MS = 750;
/** How long the circle stays after the nudge, and its own fade. */
const LINGER_MS = 900;
/** With motion off there is no nudge, so the circle alone has to carry it. */
const LINGER_REDUCED_MS = 3600;
const FADE_MS = 400;

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Signals that a pane carries on below its own edge: it nudges down and back
 * once settled, with a circle drifting the same way to name the gesture. These
 * previews hide their scrollbars to read as phones, which leaves nothing else
 * to give it away.
 *
 * Runs once per mount, only when there is enough below the fold to be worth
 * pointing at, and hands control back the moment the viewer touches it. With
 * motion turned off nothing moves, but the circle still appears — the
 * affordance matters more than the animation.
 */
export default function useScrollHint(ref: RefObject<HTMLElement | null>) {
  const [showing, setShowing] = useState(false);
  const [dy, setDy] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let fadeTimer = 0;
    let cancelled = false;

    const stop = () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(fadeTimer);
      setShowing(false);
    };

    // The viewer's own scrolling wins outright — the hint never fights it.
    const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    events.forEach((e) => el.addEventListener(e, stop, { passive: true }));

    const timer = window.setTimeout(() => {
      // Measured now rather than on mount, so late-loading images count.
      if (cancelled || el.scrollHeight - el.clientHeight < DIP_PX * 1.5) return;
      setShowing(true);

      if (reduced) {
        fadeTimer = window.setTimeout(() => setShowing(false), LINGER_REDUCED_MS);
        return;
      }

      const total = DOWN_MS + HOLD_MS + UP_MS;
      const start = performance.now();

      const tick = (now: number) => {
        if (cancelled) return;
        const t = now - start;
        let progress: number;
        if (t < DOWN_MS) progress = easeInOut(t / DOWN_MS);
        else if (t < DOWN_MS + HOLD_MS) progress = 1;
        else progress = 1 - easeInOut((t - DOWN_MS - HOLD_MS) / UP_MS);

        el.scrollTop = DIP_PX * progress;
        setDy(PUCK_PX * progress);

        if (t < total) frame = requestAnimationFrame(tick);
        else fadeTimer = window.setTimeout(() => setShowing(false), LINGER_MS);
      };
      frame = requestAnimationFrame(tick);
    }, DELAY_MS);

    return () => {
      window.clearTimeout(timer);
      stop();
      events.forEach((e) => el.removeEventListener(e, stop));
    };
  }, [ref]);

  /**
   * Sits over the pane, never in the way of it. Decorative — the pane scrolls
   * whether or not this is on screen, so there is nothing here to announce.
   */
  const indicator = (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-[30px] z-20 flex justify-center transition-opacity"
      style={{ opacity: showing ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
    >
      <div
        className="flex size-[30px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.92)] shadow-[0_2px_12px_rgba(0,5,20,0.22)] backdrop-blur-[2px]"
        style={{ transform: `translateY(${dy}px)` }}
      >
        {/* The caret only exists pointing right, so it is turned to point down */}
        <img
          src="/assets/icon-caret-right-sm.svg"
          alt=""
          className="block h-[10.73px] w-[5.74px] max-w-none rotate-90"
        />
      </div>
    </div>
  );

  return { indicator };
}
