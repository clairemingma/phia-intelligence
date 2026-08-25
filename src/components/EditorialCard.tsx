const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

/* eslint-disable @next/next/no-img-element */

export type EditorialCardData = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};

export default function EditorialCard({ eyebrow, title, description, image }: EditorialCardData) {
  return (
    <div className="flex flex-col gap-[12px] items-start w-full">

      {/* 4:3 image well. The cover is positioned against this box rather than
          sized in flow — a percentage height inside a flex child resolves to
          auto, which lets each cover's own proportions set the well's height. */}
      <div className="relative aspect-[388/291] w-full shrink-0 overflow-hidden rounded-[6px] bg-[#e5eaf5]">
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      {/* Info — capped at the designed 283px text column */}
      <div className="flex flex-col items-start min-h-[102px] w-full max-w-[283px]">
        <div className="flex flex-col gap-[4px] items-start text-[14px] w-full">
          <p
            className="leading-none text-[#002d9f] truncate whitespace-nowrap"
            style={{ fontFamily: PP, fontWeight: 500 }}
          >
            {eyebrow}
          </p>
          <p
            className="leading-none text-[#1a1a1a] truncate w-full whitespace-nowrap"
            style={{ fontFamily: PP, fontWeight: 500 }}
          >
            {title}
          </p>
          <p
            className="leading-[20px] text-[#666] w-full"
            style={{ fontFamily: PP, fontWeight: 400 }}
          >
            {description}
          </p>
        </div>
      </div>

    </div>
  );
}
