import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import MetricsSection from "@/components/MetricsSection";
import TrendingProductsSection from "@/components/TrendingProductsSection";
import TopCategoriesSection from "@/components/TopCategoriesSection";
import ShopperDemographicSection from "@/components/ShopperDemographicSection";
import PartnerSection from "@/components/PartnerSection";
import ReachSection from "@/components/ReachSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col items-stretch w-full">
      <NavBar />
      <div className="h-[68px]" />
      <HeroSection />
      <MetricsSection />
      <TrendingProductsSection />
      <TopCategoriesSection />
      <ShopperDemographicSection />
      <PartnerSection />
      <ReachSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
