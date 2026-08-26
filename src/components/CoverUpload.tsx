"use client";

import { useRef, useState, type ReactNode } from "react";

/* eslint-disable @next/next/no-img-element */

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

/**
 * The settled state a picked thing lands in: the same 60px pill the empty
 * control occupied, now holding a round thumbnail, a name and its controls.
 *
 * Shared so an attached product reads exactly like an uploaded cover image —
 * the two are the same promise kept, and the form shouldn't say it twice.
 */
export function FilledPill({
  image,
  name,
  children,
}: {
  image: string;
  name: string;
  /** The row's controls — Replace, Remove, and so on. */
  children?: ReactNode;
}) {
  return (
    <div className="flex h-[60px] w-full shrink-0 items-center rounded-[999px] border border-[#d2cecb] bg-white">
      <div className="flex h-full w-full items-center gap-[10px] px-[18px] py-[16px]">
        <img
          src={image}
          alt=""
          className="size-[28px] shrink-0 rounded-full bg-[#f2f0ee] object-cover"
        />
        <p
          className="min-w-0 flex-1 truncate text-[16px] leading-[28px] tracking-[0.16px] text-[#1a1a1a]"
          style={{ fontFamily: PP, fontWeight: 400 }}
        >
          {name}
        </p>
        {children}
      </div>
    </div>
  );
}

/** Icon control sitting at the end of a filled pill. */
export function PillAction({
  icon,
  label,
  onClick,
}: {
  icon: string;
  /** Names the control — it has no visible text of its own. */
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="block size-[20px] shrink-0 cursor-pointer transition-opacity hover:opacity-60"
    >
      <img src={icon} alt="" aria-hidden className="block size-full max-w-none" />
    </button>
  );
}

/** Pencil and bin, as the design labels a filled pill's two controls. */
export const PILL_ICON_EDIT = "/assets/icon-pencil-simple.svg";
export const PILL_ICON_REMOVE = "/assets/icon-trash.svg";

/**
 * Cover image field: a pill that takes a drop or a click, and settles into the
 * filled state once an image is chosen.
 */
export default function CoverUpload({
  file,
  previewUrl,
  onPick,
  onClear,
}: {
  file: File | null;
  previewUrl: string | null;
  onPick: (file: File) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function take(list: FileList | null) {
    const next = list?.[0];
    if (next && next.type.startsWith("image/")) onPick(next);
  }

  const picker = (
    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => take(e.target.files)}
    />
  );

  if (previewUrl) {
    return (
      <>
        {picker}
        <FilledPill image={previewUrl} name={file?.name ?? "Cover image"}>
          <PillAction
            icon={PILL_ICON_EDIT}
            label="Replace cover image"
            onClick={() => inputRef.current?.click()}
          />
          <PillAction icon={PILL_ICON_REMOVE} label="Remove cover image" onClick={onClear} />
        </FilledPill>
      </>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        take(e.dataTransfer.files);
      }}
      className={`flex h-[60px] w-full shrink-0 items-center rounded-[999px] border bg-white transition-colors duration-200 ${
        dragging ? "border-[#1a1a1a]" : "border-[#d2cecb] hover:border-[#1a1a1a]"
      }`}
    >
      {picker}
      {/* The whole pill is the control, so the hit area matches the border */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex h-full w-full cursor-pointer items-center gap-[10px] rounded-[999px] px-[18px] py-[16px] text-left"
      >
        {/* 16px icon box with the glyph inset, as the design draws it */}
        <span className="relative block size-[16px] shrink-0">
          <span className="absolute inset-[12.5%]">
            <img
              src="/assets/icon-upload.svg"
              alt=""
              aria-hidden
              className="block size-full max-w-none"
            />
          </span>
        </span>
        <span
          className="text-[16px] leading-[28px] tracking-[0.16px] whitespace-nowrap text-[#1a1a1a]"
          style={{ fontFamily: PP, fontWeight: 400 }}
        >
          Upload cover image
        </span>
      </button>
    </div>
  );
}
