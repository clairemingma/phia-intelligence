import ProductCard from "./ProductCard";
import { resultCount } from "@/lib/data";

// A uniform grid of results: 4 columns at lg (each one column of the page's
// 5-column rhythm), 16px between columns and 64px between rows.
export default function ProductGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-16">
      {Array.from({ length: resultCount }).map((_, i) => (
        <ProductCard key={i} />
      ))}
    </div>
  );
}
