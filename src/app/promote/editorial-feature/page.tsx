import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import EditorialFeatureFlow from "@/components/EditorialFeatureFlow";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Editorial Feature — Phia Intelligence",
  description: "Feature your brand in Phia editorial content, style guides, and trend reports",
};

export default function EditorialFeaturePage() {
  // Matches /placements: the design is specified at 1440px only.
  return (
    <div className="w-full overflow-x-auto">
      <main className="flex flex-col items-center w-[1440px]">
        <NavBar />
        <div className="h-[68px] w-full" />
        <EditorialFeatureFlow />
        <Footer />
      </main>
    </div>
  );
}
