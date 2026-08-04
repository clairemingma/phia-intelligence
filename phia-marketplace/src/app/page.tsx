import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CatalogSearch from "@/components/CatalogSearch";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ProductGrid from "@/components/ProductGrid";
import ResultsBar from "@/components/ResultsBar";
import Footer from "@/components/Footer";
import { categoryDescription, resultCount } from "@/lib/data";

const LANDING_TITLE = "Shop Every Store at Once";

// 149 characters — inside the ~155 Google renders before truncating.
const LANDING_DESCRIPTION =
  "One search, every store. Compare prices across hundreds of retailers and resale sites, see what's trending now, and never overpay for anything again.";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// One value can arrive as a string[] if the param is repeated; take the first.
function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

// The heading is the deepest place you've navigated to, and the description is
// the copy for the category you're in. Both fall back to the landing state.
function headingFor(category?: string, subcategory?: string) {
  return subcategory ?? category ?? LANDING_TITLE;
}

function descriptionFor(category?: string) {
  return (category && categoryDescription(category)) || LANDING_DESCRIPTION;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { category, subcategory } = await searchParams;
  const activeCategory = firstValue(category);

  return {
    title: `${headingFor(activeCategory, firstValue(subcategory))} | phia Marketplace`,
    description: descriptionFor(activeCategory),
  };
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
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

        {/* Page heading — the marketplace pitch on the landing, the category
            you're in once you've navigated into one */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start mb-8">
          <div className="lg:col-span-4">
            <h1
              className="text-[36px] font-light leading-[40px] tracking-[-0.72px] text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-gt-super-display)" }}
            >
              {headingFor(activeCategory, activeSubcategory)}
            </h1>
            {/* Stops at the first product card's right edge. This wrapper spans
                4 of the page's 5 columns, so two columns plus the 16px gutter
                between them is exactly half its width minus half a gutter. */}
            <p className="text-[14px] font-normal leading-[20px] text-[#666] mt-1 lg:max-w-[calc(50%-8px)]">
              {descriptionFor(activeCategory)}
            </p>
          </div>
          <CatalogSearch />
        </div>

        {/* Result count and sort, spanning the full width above the filters and grid */}
        <ResultsBar count={resultCount} />

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 pb-16">
          {/* Keyed by location: navigating to another category remounts the
              filters, so the accordion re-opens at its first section and stale
              selections don't carry across an unrelated set of results. */}
          <Sidebar
            key={`${activeCategory ?? ""}:${activeSubcategory ?? ""}`}
            activeCategory={activeCategory}
            activeSubcategory={activeSubcategory}
          />
          <div className="lg:col-span-4 min-w-0">
            <ProductGrid />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
