export default function EditorialCardLarge() {
  return (
    <a href="#" className="flex flex-col gap-[16px] items-start w-full min-w-0">
      {/* Image placeholder */}
      <div className="aspect-square w-full bg-[#e5eaf5] shrink-0" />

      {/* Text */}
      <div className="flex flex-col gap-[12px] items-start w-full">
        <p className="text-[14px] font-medium leading-[normal] text-[#002d9f] w-full overflow-hidden text-ellipsis whitespace-nowrap">
          Trending
        </p>
        <p
          className="text-[36px] font-light leading-[40px] tracking-[-0.72px] text-[#1a1a1a] w-full overflow-hidden text-ellipsis"
          style={{ fontFamily: "var(--font-gt-super-display)" }}
        >
          Strappy Heels For Every Event
        </p>
        <p className="text-[14px] font-normal leading-[20px] text-[#666] w-full overflow-hidden text-ellipsis">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
        </p>
        <p className="text-[14px] font-medium leading-[normal] text-[#002d9f] h-[20px] w-full overflow-hidden text-ellipsis whitespace-nowrap">
          Read Editorial
        </p>
      </div>
    </a>
  );
}
