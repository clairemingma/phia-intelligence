import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import BrandHero from "@/components/BrandHero";
import EditorialFeaturesSection from "@/components/EditorialFeaturesSection";
import ProductFeaturesSection from "@/components/ProductFeaturesSection";
import PromotionsSection from "@/components/PromotionsSection";
import PreviouslyFeaturedSection from "@/components/PreviouslyFeaturedSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Acne Studios — Phia Intelligence",
  description: "Editorial placements, outfits, and promotional codes for Acne Studios",
};

export default function PlacementsPage() {
  // The design is specified at 1440px only, so the page keeps that fixed width
  // and scrolls horizontally on anything narrower.
  return (
    <div className="w-full overflow-x-auto">
      <main className="flex flex-col items-center w-[1440px]">
        <NavBar />
        <div className="h-[68px] w-full" />
        <BrandHero />
        <EditorialFeaturesSection />
        <ProductFeaturesSection title="Outfit Features" />
        <ProductFeaturesSection title="Social Features" bookmarked />
        <PromotionsSection />
        <PreviouslyFeaturedSection />
        <Footer />
      </main>
    </div>
  );
}
