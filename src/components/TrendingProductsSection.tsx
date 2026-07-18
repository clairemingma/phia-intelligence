const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), 'Playfair Display', Georgia, serif";

const products = [
  { name: "Multipocket Tote Bag", brand: "Nike", price: "$1,000", original: "$1,750", discount: "14% off" },
  { name: "Multipocket Tote Bag", brand: "Nike", price: "$1,000", original: "$1,750", discount: "14% off" },
  { name: "Multipocket Tote Bag", brand: "Nike", price: "$1,000", original: "$1,750", discount: "14% off" },
  { name: "Multipocket Tote Bag", brand: "Nike", price: "$1,000", original: "$1,750", discount: "14% off" },
  { name: "Multipocket Tote Bag", brand: "Nike", price: "$1,000", original: "$1,750", discount: "14% off" },
];

function ProductCard({ name, brand, price, original, discount }: typeof products[number]) {
  return (
    <div className="flex flex-[1_0_0] flex-col items-start justify-center min-w-0">
      <div className="flex flex-col gap-[12px] items-start w-full">

        {/* 4:5 image placeholder */}
        <div
          className="aspect-[400/500] border border-[rgba(227,227,227,0.4)] rounded-[6px] overflow-hidden shrink-0 w-full bg-[#e5eaf5]"
        />

        {/* Info */}
        <div className="flex flex-col gap-[6px] items-start overflow-hidden w-full">
          <div className="flex flex-col gap-[8px] items-start w-full">

            {/* Name + brand */}
            <div className="flex flex-col gap-[4px] items-start text-[14px] w-full">
              <p
                className="leading-none text-[#1a1a1a] truncate w-full whitespace-nowrap"
                style={{ fontFamily: PP, fontWeight: 500 }}
              >
                {name}
              </p>
              <p
                className="leading-[20px] text-[#666] truncate w-full"
                style={{ fontFamily: PP, fontWeight: 400 }}
              >
                {brand}
              </p>
            </div>

            {/* Price row */}
            <div className="flex gap-[8px] items-center w-full">
              {/* Current + original price */}
              <div className="flex gap-[4px] items-center whitespace-nowrap">
                <p
                  className="leading-none text-[#1a1a1a] text-[14px] overflow-hidden text-ellipsis"
                  style={{ fontFamily: PP, fontWeight: 500 }}
                >
                  {price}
                </p>
                <p
                  className="leading-[18px] line-through text-[#666] text-[12px] overflow-hidden text-ellipsis"
                  style={{ fontFamily: PP, fontWeight: 400 }}
                >
                  {original}
                </p>
              </div>

              {/* Discount badge */}
              <div className="flex gap-[4px] items-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/tag.svg"
                  alt=""
                  aria-hidden
                  className="shrink-0 size-[12px] block"
                />
                <p
                  className="leading-none text-[#14774f] text-[14px] whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ fontFamily: PP, fontWeight: 500 }}
                >
                  {discount}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

function CardRow() {
  return (
    <div className="flex gap-[16px] items-start w-full shrink-0">
      {products.map((p, i) => (
        <ProductCard key={i} {...p} />
      ))}
    </div>
  );
}

export default function TrendingProductsSection() {
  return (
    <div className="flex flex-col gap-[48px] items-start justify-center px-[120px] py-[64px] w-full">

      {/* Section title */}
      <div className="flex flex-col gap-[16px] items-start w-full shrink-0">
        <div className="w-full h-px bg-[#e3e3e3]" />
        <h2
          className="text-[36px] leading-[40px] tracking-[-0.72px] text-[#1a1a1a] whitespace-nowrap"
          style={{ fontFamily: GT, fontWeight: 300 }}
        >
          Trending Products
        </h2>
      </div>

      {/* Row 1 */}
      <CardRow />

      {/* Row 2 */}
      <CardRow />

    </div>
  );
}
