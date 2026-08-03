import CatalogSearch from "@/components/CatalogSearch";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* One 5-column rhythm across the page: the filter column, each of the
          four product cards, and the search field are all one column wide. */}
      <main className="px-6 md:px-10 lg:px-[60px]">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] pt-5 pb-5" aria-label="Breadcrumb">
          <a href="#" className="text-[#999] hover:text-[#666] transition-colors">
            Women
          </a>
          <span className="text-[#e3e3e3]">/</span>
          <span className="text-[#1a1a1a] font-medium">Jackets</span>
        </nav>

        {/* Page heading */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start mb-8">
          <div className="lg:col-span-4">
            <h1
              className="text-[36px] font-light leading-[40px] tracking-[-0.72px] text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-gt-super-display)" }}
            >
              Jackets
            </h1>
            <p className="text-[14px] font-normal leading-[20px] text-[#666] mt-1">
              Outerwear from the world&apos;s best independent brands and boutiques.
            </p>
          </div>
          <CatalogSearch />
        </div>

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
