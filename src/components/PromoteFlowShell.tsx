"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import SuccessOverlay from "@/components/SuccessOverlay";

/* eslint-disable @next/next/no-img-element */

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), 'Playfair Display', Georgia, serif";

/** The page gutter. On phones the form has the width to itself, so it takes
 *  a gutter on both sides; on desktop the preview owns the right edge. */
const PAGE_GUTTER = "px-6 lg:pr-[64px] lg:pl-16 xl:pl-[120px]";

/**
 * Hands back the "this flow is done" action, plus the acknowledgement it
 * raises. Submitting flashes the success overlay over the form and clears
 * itself, rather than navigating away — so the brand keeps its place and its
 * work stays on screen behind it.
 *
 * Render `overlay` anywhere in the flow; it is fixed to the viewport, so it
 * takes no part in the form's layout.
 */
export function useFlowSubmit(): { submit: () => void; overlay: ReactNode } {
  const [submitted, setSubmitted] = useState(false);
  return {
    submit: () => setSubmitted(true),
    overlay: submitted ? <SuccessOverlay onDone={() => setSubmitted(false)} /> : null,
  };
}

/** The black pill that closes every promote flow. */
export function FlowSubmitButton({
  label = "Submit",
  type = "submit",
  onClick,
}: {
  label?: string;
  /** "button" for the steps that sit outside a <form>. */
  type?: "submit" | "button";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex h-[48px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-black px-[20px] transition-opacity hover:opacity-80"
    >
      <span
        className="text-[14px] leading-[11.673px] tracking-[-0.2335px] text-white whitespace-nowrap"
        style={{ fontFamily: PP, fontWeight: 500 }}
      >
        {label}
      </span>
    </button>
  );
}

/**
 * The promote pages scroll inside their wrapper rather than down the document,
 * so the preview column can stick. Flows call this to land at the top of a step.
 */
export function scrollFlowToTop() {
  document.querySelector("[data-page-scroll]")?.scrollTo({ top: 0 });
}

/**
 * Moves between the form and the preview once they are stacked. Only earns its
 * place on a phone, and only while its destination is off screen — over the
 * thing it points at it would just be in the way.
 */
function JumpPill({
  icon,
  label,
  onClick,
  shown,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  shown: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className={`fixed right-6 bottom-6 z-40 flex h-[48px] cursor-pointer items-center gap-[8px] rounded-full bg-black px-[20px] shadow-[0_4px_16px_rgba(0,5,20,0.24)] transition-opacity lg:hidden ${
        shown ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* The icons are stored in their resting grey, so they are driven to
          white for the black pill rather than kept as a second copy. */}
      <img
        src={icon}
        alt=""
        aria-hidden
        className="block size-[18px] max-w-none brightness-0 invert"
      />
      <span
        className="text-[14px] leading-none tracking-[-0.2335px] whitespace-nowrap text-white"
        style={{ fontFamily: PP, fontWeight: 500 }}
      >
        {label}
      </span>
    </button>
  );
}

/**
 * Shared layout for the create-a-placement flows: a 568px form column on the
 * left, and a warm-white field on the right holding a live preview of whatever
 * the form is building.
 *
 * There is no room to set those side by side on a phone, so below `lg` they
 * stack — form first, since that is what the brand came to fill in, with the
 * preview under it rather than pushing the fields off the screen.
 */
export default function PromoteFlowShell({
  title,
  subtitle,
  crumbHref,
  preview,
  children,
}: {
  title: string;
  subtitle: string;
  /** Where the "Promote" crumb goes back to. */
  crumbHref: string;
  preview: ReactNode;
  children: ReactNode;
}) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [previewInView, setPreviewInView] = useState(false);

  // The jump button is only worth showing while the preview is out of sight.
  // These pages scroll inside their own wrapper, so that is the root to watch
  // against rather than the viewport.
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setPreviewInView(entry.intersectionRatio > 0.2),
      {
        root: document.querySelector("[data-page-scroll]"),
        threshold: [0, 0.2, 0.5],
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="w-full bg-white">
      {/* Only the form column has height, so the page scrolls it while the
          preview beside it stays put. `items-start` keeps the preview from
          stretching, which is what lets it stick. */}
      <div className="flex flex-col lg:flex-row lg:items-start">

        {/* Form column — the design's 568px form behind the page gutter, with
            64px of air before the preview field. It keeps its width and hands
            the rest of the desktop to the preview. The min-height is the
            design's, and holds the page steady across a flow's steps. */}
        <div className={`w-full py-[48px] lg:w-auto lg:shrink-0 lg:py-[64px] ${PAGE_GUTTER}`}>
          {/* The min-height holds the page steady across a flow's steps, which
              only matters where the preview sits alongside. */}
          <div className="flex w-full max-w-full flex-col gap-[40px] items-start lg:min-h-[819px] lg:w-[568px] lg:gap-[64px]">

            <div className="flex w-full flex-col gap-[24px] items-start">
              <div className="flex w-full items-center gap-[10px] py-[4px] pr-[12px]">
                <Link
                  href={crumbHref}
                  className="text-[12px] leading-[16px] tracking-[-0.154px] text-[#666] transition-colors hover:text-[#1a1a1a]"
                  style={{ fontFamily: PP, fontWeight: 500 }}
                >
                  Promote
                </Link>
                <span
                  className="text-[14px] leading-[21px] tracking-[-0.154px] text-[#999]"
                  style={{ fontFamily: PP, fontWeight: 500 }}
                >
                  /
                </span>
                <span
                  className="text-[12px] leading-[16px] tracking-[-0.154px] text-[#1a1a1a]"
                  style={{ fontFamily: PP, fontWeight: 500 }}
                >
                  {title}
                </span>
              </div>

              <div className="flex w-full flex-col gap-[12px] items-start">
                <h1
                  className="text-[36px] leading-[1.1] tracking-[-1.44px] text-[#292929] lg:text-[56px] lg:tracking-[-2.24px] lg:whitespace-nowrap"
                  style={{ fontFamily: GT, fontWeight: 300 }}
                >
                  {title}
                </h1>
                <p
                  className="text-[16px] leading-[20px] text-[#6b7280]"
                  style={{ fontFamily: PP, fontWeight: 400 }}
                >
                  {subtitle}
                </p>
              </div>
            </div>

            {children}
          </div>
        </div>

        {/* Live preview — the warm-white field hangs below the navbar and takes
            whatever width is left, running to the right edge of the screen, so
            the preview stays centered while the form scrolls past it. Nothing
            here scrolls, so a wheel over this side falls through to the page
            and moves the form anyway. */}
        <div
          ref={previewRef}
          className={`w-full min-w-0 items-center justify-center overflow-hidden bg-[#f9f8f7] px-[24px] py-[48px] lg:sticky lg:top-[68px] lg:h-[calc(100vh-68px)] lg:w-auto lg:flex-1 lg:py-0 lg:flex ${
            // A flow with nothing to mock up holds the field open on desktop,
            // but an empty band below the form on a phone is just dead space.
            preview ? "flex" : "hidden"
          }`}
        >
          {preview}
        </div>
      </div>

      <JumpPill
        icon="/assets/icon-eye.svg"
        label="Preview"
        shown={Boolean(preview) && !previewInView}
        onClick={() =>
          previewRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      />
      <JumpPill
        icon="/assets/icon-pencil-simple.svg"
        label="Edit"
        shown={Boolean(preview) && previewInView}
        onClick={() =>
          document
            .querySelector("[data-page-scroll]")
            ?.scrollTo({ top: 0, behavior: "smooth" })
        }
      />
    </section>
  );
}
