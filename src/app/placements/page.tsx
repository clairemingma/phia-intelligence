import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import EditorialFeaturesSection from "@/components/EditorialFeaturesSection";
import ProductFeaturesSection from "@/components/ProductFeaturesSection";
import PromotionsSection from "@/components/PromotionsSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Placements",
  description: "Editorial placements, outfits, and promotional codes for your brand",
};

export default function PlacementsPage() {
  // The design is drawn at 1440px, but the bands are fluid — they fill whatever
  // desktop width they are given, with the gutter shrinking first.
  return (
    <main className="flex flex-col items-stretch w-full">
      <NavBar />
      <div className="h-[68px] w-full" />
      <EditorialFeaturesSection stackIndex={0} />
      <ProductFeaturesSection
        title="Outfit Features"
        stackIndex={1}
        createHref="/promote/outfit-feature"
      />
      <ProductFeaturesSection
        title="Social Features"
        bookmarked
        stackIndex={2}
        createHref="/promote/social-feature"
      />
      <PromotionsSection stackIndex={3} />
      <Footer />
    </main>
  );
}
