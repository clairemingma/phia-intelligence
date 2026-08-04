import ProductCard from "./ProductCard";

// A uniform grid of results: 4 columns at lg (each one column of the page's
// 5-column rhythm), 16px between columns and 64px between rows. Two up on a
// phone, where the gutters close to 12px and the rows to 32px so a pair of cards
// still fills the width. `count` is one page's worth of results, so the last
// page can come up short.
export default function ProductGrid({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-4 md:gap-y-16">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCard key={i} />
      ))}
    </div>
  );
}
