import ProductCard from "./ProductCard";

// A uniform grid of results: 4 columns at lg (each one column of the page's
// 5-column rhythm), 16px between columns and 64px between rows. `count` is one
// page's worth of results, so the last page can come up short.
export default function ProductGrid({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-16">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCard key={i} />
      ))}
    </div>
  );
}
