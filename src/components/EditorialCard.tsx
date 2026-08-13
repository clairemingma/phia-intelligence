const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

export type EditorialCardData = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function EditorialCard({ eyebrow, title, description }: EditorialCardData) {
  return (
    <div className="flex flex-col gap-[12px] items-start w-full">

      {/* 4:3 image well */}
      <div className="aspect-[388/291] flex flex-col items-start w-full shrink-0">
        <div className="bg-[#e5eaf5] flex-1 min-h-px rounded-[6px] w-full" />
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
