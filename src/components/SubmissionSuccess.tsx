"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/* eslint-disable @next/next/no-img-element */

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), 'Playfair Display', Georgia, serif";

/**
 * The collage, at the sizes the design lays them out. They butt up against one
 * another with no gap and are centred on their midlines, so the tall frame in
 * the middle overhangs its neighbours top and bottom.
 */
const COLLAGE = [
  { src: "/assets/success-collage-1.png", width: 146.683, height: 220.025 },
  { src: "/assets/success-collage-2.png", width: 123.84, height: 128.656 },
  { src: "/assets/success-collage-3.png", width: 208.5, height: 417 },
  { src: "/assets/success-collage-4.png", width: 85.58, height: 128.326 },
  { src: "/assets/success-collage-5.png", width: 177.068, height: 221.391 },
];

/** The beat between frames — well under the 1000ms fade, so they overlap. */
const STAGGER_MS = 150;

/** The copy follows the collage in, once the last frames are landing. */
const HEADLINE_DELAY = 700;
const LINK_DELAY = 840;

/**
 * What a brand lands on once a promote flow has been submitted.
 *
 * The collage is a fixed 742px wide, so the section clips rather than letting a
 * narrow window scroll the whole page sideways; centring keeps the crop even.
 */
export default function SubmissionSuccess() {
  const rowRef = useRef<HTMLDivElement>(null);

  // The frames arrive in a fresh random order on every visit. The shuffle has
  // to happen here rather than during render: the page is prerendered, so a
  // draw made up front would be baked in and identical every time. The result
  // is written straight to the nodes, which both starts the animation and
  // keeps a one-shot entrance from costing any re-renders.
  useEffect(() => {
    const frames = Array.from(rowRef.current?.children ?? []) as HTMLElement[];
    if (!frames.length) return;

    // Nothing to stagger if the viewer would rather not have motion — just
    // clear the holding state so the collage is simply there.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frames.forEach((frame) => {
        frame.style.opacity = "1";
      });
      return;
    }

    const order = frames.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    order.forEach((frame, position) => {
      frames[frame].style.animationDelay = `${position * STAGGER_MS}ms`;
      // The keyframes hold opacity 0 through the delay, then override the
      // inline value the frame was parked at.
      frames[frame].classList.add("rise-in");
    });
  }, []);

  return (
    // 64px of air between the navbar and the top of the tallest frame. The bar
    // is 69px tall but the page spacer above this is 68px, so the padding
    // carries the extra pixel.
    <section className="flex w-full flex-col items-center overflow-hidden px-[64px] pt-[65px] pb-[60px]">
      <div className="flex flex-col gap-[48px] items-center">

        <div ref={rowRef} className="flex items-center justify-center">
          {COLLAGE.map(({ src, width, height }) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden
              className="block max-w-none shrink-0 object-cover"
              style={{ width, height, opacity: 0 }}
            />
          ))}
        </div>

        <h1
          className="rise-in text-[56px] leading-[1.1] tracking-[-2.24px] text-[#292929] text-center"
          style={{ fontFamily: GT, fontWeight: 300, animationDelay: `${HEADLINE_DELAY}ms` }}
        >
          Thanks for your request.
          <br />
          Our team will be in touch.
        </h1>

        <Link
          href="/promote"
          className="rise-in text-[14px] leading-[16px] tracking-[0.14px] text-[#666] underline underline-offset-2 transition-opacity hover:opacity-60"
          style={{ fontFamily: PP, fontWeight: 500, animationDelay: `${LINK_DELAY}ms` }}
        >
          Back to Promote
        </Link>
      </div>
    </section>
  );
}
