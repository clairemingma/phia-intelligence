"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import SuccessOverlay from "@/components/SuccessOverlay";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), 'Playfair Display', Georgia, serif";

/** The left half of the page gutter — these flows only have a left one. */
const PAGE_GUTTER_LEFT = "pl-6 lg:pl-16 xl:pl-[120px]";

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
 * Shared layout for the create-a-placement flows: a 568px form column on the
 * left, and a warm-white field on the right holding a live preview of whatever
 * the form is building.
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
  return (
    <section className="w-full bg-white">
      {/* Only the form column has height, so the page scrolls it while the
          preview beside it stays put. `items-start` keeps the preview from
          stretching, which is what lets it stick. */}
      <div className="flex items-start">

        {/* Form column — the design's 568px form behind the page gutter, with
            64px of air before the preview field. It keeps its width and hands
            the rest of the desktop to the preview. The min-height is the
            design's, and holds the page steady across a flow's steps. */}
        <div className={`shrink-0 pr-[64px] py-[64px] ${PAGE_GUTTER_LEFT}`}>
          <div className="flex min-h-[819px] w-[568px] max-w-full flex-col gap-[64px] items-start">

            <div className="flex w-full flex-col gap-[24px] items-start">
              <div className="flex w-full items-center gap-[10px] py-[4px] pr-[12px]">
                <Link
                  href={crumbHref}
                  className="text-[12px] leading-[16px] tracking-[-0.154px] text-[#1a1a1a] transition-opacity hover:opacity-60"
                  style={{ fontFamily: PP, fontWeight: 500 }}
                >
                  Promote
                </Link>
                <span
                  className="text-[14px] leading-[21px] tracking-[-0.154px] text-[#1a1a1a] opacity-50"
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
                  className="text-[56px] leading-[1.1] tracking-[-2.24px] text-[#292929] whitespace-nowrap"
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
        <div className="sticky top-[68px] flex h-[calc(100vh-68px)] flex-1 min-w-0 items-center justify-center overflow-hidden bg-[#f9f8f7] px-[24px]">
          {preview}
        </div>
      </div>
    </section>
  );
}
