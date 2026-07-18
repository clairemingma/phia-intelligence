const genderData = [
  { label: "Women", pct: "68%", color: "#1a1a1a" },
  { label: "Men", pct: "24%", color: "#767676" },
  { label: "Non-binary / Other", pct: "8%", color: "#cecece" },
];

const locationData = [
  { rank: 1, city: "New York", pct: "18%" },
  { rank: 2, city: "Los Angeles", pct: "14%" },
  { rank: 3, city: "Chicago", pct: "8%" },
  { rank: 4, city: "Houston", pct: "6%" },
  { rank: 5, city: "Miami", pct: "5%" },
];

function DonutChart() {
  return (
    <div className="flex items-center justify-center size-[256px] -rotate-90">
      <svg
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-[256px]"
      >
        {/* Background track */}
        <path
          d="M24 128C24 185.399 70.6008 232 128 232C185.399 232 232 185.399 232 128C232 70.6008 185.399 24 128 24C70.6008 24 24 70.6008 24 128Z"
          stroke="black"
          strokeOpacity="0.06"
          strokeWidth="20"
        />
        {/* Women — 68% */}
        <path
          d="M232 128C232 146.609 227.007 164.878 217.541 180.9C208.075 196.922 194.484 210.111 178.184 219.091C161.885 228.071 143.474 232.512 124.873 231.953C106.272 231.393 88.1622 225.853 72.4318 215.91C56.7015 205.967 43.9273 191.985 35.4416 175.423C26.9558 158.861 23.0695 140.325 24.188 121.749C25.3064 103.174 31.3886 85.2383 41.8002 69.814C52.2118 54.3897 66.5714 42.0416 83.3811 34.0576"
          stroke="#1A42A9"
          strokeWidth="20"
        />
        {/* Men — 24% */}
        <path
          d="M83.3813 34.0578C107.255 22.7188 134.55 20.8944 159.72 28.9553C184.89 37.0161 206.047 54.3575 218.892 77.4556"
          stroke="#6681C5"
          strokeWidth="20"
        />
      </svg>
    </div>
  );
}

export default function ShopperDemographicSection() {
  return (
    <div className="flex flex-col gap-[48px] items-center py-[64px] w-full">
      {/* Section title */}
      <div className="flex flex-col gap-[16px] items-start w-[1200px]">
        <div className="w-full h-px bg-[#e3e3e3]" />
        <h2
          className="text-[36px] leading-[40px] tracking-[-0.72px] text-[#1a1a1a]"
          style={{
            fontFamily: "var(--font-gt-super-display), 'Playfair Display', Georgia, serif",
            fontWeight: 300,
          }}
        >
          Shopper Demographic
        </h2>
      </div>

      {/* Cards row */}
      <div className="flex gap-[16px] items-stretch w-[1200px]">

        {/* Gender card */}
        <div className="border border-[rgba(0,0,0,0.08)] flex flex-1 flex-col gap-[16px] items-start min-w-0 p-[21px] rounded-[6px]">
          {/* Header */}
          <div className="flex flex-col gap-[4px] w-full">
            <p
              className="text-[14px] leading-none text-[#1a1a1a] truncate"
              style={{ fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif", fontWeight: 500 }}
            >
              Gender
            </p>
            <p
              className="text-[14px] leading-[20px] text-[#666] truncate"
              style={{ fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif", fontWeight: 400 }}
            >
              By reported identity
            </p>
          </div>

          {/* Chart + legend */}
          <div className="flex flex-col gap-[20px] items-center w-full">
            <div className="flex items-center h-[354.64px]">
              <DonutChart />
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-[8px] w-full">
              {genderData.map(({ label, pct, color }) => (
                <div key={label} className="flex gap-[8px] items-center w-full">
                  <div
                    className="shrink-0 size-[8px] rounded-full"
                    style={{ background: color }}
                  />
                  <p
                    className="flex-1 min-w-0 text-[12px] leading-[18px] tracking-[0.12px] text-[#1a1a1a]"
                    style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 400 }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-[12px] leading-[18px] text-black whitespace-nowrap"
                    style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 500 }}
                  >
                    {pct}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Locations card */}
        <div className="border border-[rgba(0,0,0,0.08)] flex flex-1 flex-col gap-[20px] items-center justify-center min-w-0 p-[21px] rounded-[6px]">
          {/* Header */}
          <div className="flex flex-col gap-[4px] w-full">
            <p
              className="text-[14px] leading-none text-[#1a1a1a] truncate"
              style={{ fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif", fontWeight: 500 }}
            >
              Top Locations
            </p>
            <p
              className="text-[14px] leading-[20px] text-[#666] truncate"
              style={{ fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif", fontWeight: 400 }}
            >
              By city
            </p>
          </div>

          {/* Map */}
          <div className="relative flex items-center justify-center h-[354.64px] w-full">
            <div className="relative" style={{ width: "510.671px", height: "298.743px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/usa-map.svg"
                alt="Top locations map"
                style={{ width: "100%", height: "100%", display: "block" }}
              />
            </div>
          </div>

          {/* Ranked list */}
          <div className="flex flex-col gap-[8px] w-full">
            {locationData.map(({ rank, city, pct }) => (
              <div key={rank} className="flex gap-[8px] items-center w-full">
                <div className="w-[12px] flex justify-end shrink-0">
                  <span
                    className="text-[10px] leading-[15px] text-[#afafaf] text-right"
                    style={{ fontFamily: "var(--font-roboto-mono), monospace", fontWeight: 400 }}
                  >
                    {rank}
                  </span>
                </div>
                <p
                  className="flex-1 min-w-0 text-[12px] leading-[18px] tracking-[0.12px] text-[#1a1a1a]"
                  style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 400 }}
                >
                  {city}
                </p>
                <p
                  className="text-[12px] leading-[18px] text-black whitespace-nowrap"
                  style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 500 }}
                >
                  {pct}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
