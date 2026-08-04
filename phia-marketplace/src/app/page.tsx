import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CatalogSearch from "@/components/CatalogSearch";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ProductGrid from "@/components/ProductGrid";
import ResultsBar from "@/components/ResultsBar";
import Footer from "@/components/Footer";
import { resultCount } from "@/lib/data";

// 149 characters — inside the ~155 Google renders before truncating.
const DESCRIPTION =
  "One search, every store. Compare prices across hundreds of retailers and resale sites, see what's trending now, and never overpay for anything again.";

export const metadata: Metadata = {
  title: "Shop Every Store at Once | phia Marketplace",
  description: DESCRIPTION,
};

// One value can arrive as a string[] if the param is repeated; take the first.
function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category, subcategory } = await searchParams;

  // The breadcrumb trail below "Shop". Unfiltered, the landing is the trending
  // feed — Shop / Trending; a subcategory only counts if a category is set.
  const activeCategory = firstValue(category);
  const activeSubcategory = firstValue(subcategory);
  const categoryPath = activeCategory
    ? [activeCategory, ...(activeSubcategory ? [activeSubcategory] : [])]
    : ["Trending"];

  return (
    <>
      <Navbar />

      {/* One 5-column rhythm across the page: the filter column, each of the
          four product cards, and the search field are all one column wide. */}
      <main className="px-6 md:px-10 lg:px-[60px] pt-8">
        <Breadcrumb path={categoryPath} />

        {/* Page heading — the unfiltered landing state */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start mb-8">
          <div className="lg:col-span-4">
            <h1
              className="text-[36px] font-light leading-[40px] tracking-[-0.72px] text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-gt-super-display)" }}
            >
              Shop Every Store at Once
            </h1>
            {/* Stops at the first product card's right edge. This wrapper spans
                4 of the page's 5 columns, so two columns plus the 16px gutter
                between them is exactly half its width minus half a gutter. */}
            <p className="text-[14px] font-normal leading-[20px] text-[#666] mt-1 lg:max-w-[calc(50%-8px)]">
              {DESCRIPTION}
            </p>
          </div>
          <CatalogSearch />
        </div>

        {/* Result count and sort, spanning the full width above the filters and grid */}
        <ResultsBar count={resultCount} />

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 pb-16">
          <Sidebar />
          <div className="lg:col-span-4 min-w-0">
            <ProductGrid />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
