"use client";

/* eslint-disable @next/next/no-img-element */

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

/**
 * Small white pill that moves a multi-step promote flow forward or back. The
 * caret leads on the way back and trails on the way on, so the button always
 * points where it goes.
 */
export default function StepButton({
  label,
  direction,
  onClick,
}: {
  label: string;
  direction: "next" | "back";
  onClick: () => void;
}) {
  // 16px icon box with the glyph inset, as the design draws it
  const caret = (
    <span className="relative block size-[16px] shrink-0">
      <span
        className="absolute"
        style={{
          inset:
            direction === "next"
              ? "16.46% 28.91% 16.46% 35.21%"
              : "16.46% 35.1% 16.35% 28.91%",
        }}
      >
        <img
          src={
            direction === "next"
              ? "/assets/icon-caret-right-sm.svg"
              : "/assets/icon-caret-left-sm.svg"
          }
          alt=""
          aria-hidden
          className="block size-full max-w-none"
        />
      </span>
    </span>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 cursor-pointer items-center justify-center gap-[8px] rounded-[999px] bg-white px-[18px] py-[14px] transition-opacity hover:opacity-60"
    >
      {direction === "back" && caret}
      <span
        className="text-[12px] leading-none whitespace-nowrap text-black"
        style={{ fontFamily: PP, fontWeight: 500 }}
      >
        {label}
      </span>
      {direction === "next" && caret}
    </button>
  );
}
