import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import FeatureRequestFlow from "@/components/FeatureRequestFlow";

const SUBTITLE =
  "Style your products into complete looks shoppers can shop in a single tap.";

export const metadata: Metadata = {
  title: "Outfit Feature — Phia Intelligence",
  description: SUBTITLE,
};

export default function OutfitFeaturePage() {
  // Matches the other promote flows: the page scrolls inside the wrapper so the
  // preview column can stick. See PromoteFlowShell.
  return (
    <div data-page-scroll className="h-screen w-full overflow-auto">
      <main className="flex flex-col items-stretch w-full">
        <NavBar />
        <div className="h-[68px] w-full" />
        <FeatureRequestFlow title="Outfit Feature" subtitle={SUBTITLE} idPrefix="outfit" />
      </main>
    </div>
  );
}
