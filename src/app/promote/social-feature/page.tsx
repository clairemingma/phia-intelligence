import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import FeatureRequestFlow from "@/components/FeatureRequestFlow";

const SUBTITLE =
  "Surface your social posts and creator content alongside your products.";

export const metadata: Metadata = {
  title: "Social Feature",
  description: SUBTITLE,
};

export default function SocialFeaturePage() {
  // Matches the other promote flows: the page scrolls inside the wrapper so the
  // preview column can stick. See PromoteFlowShell.
  return (
    <div data-page-scroll className="h-screen w-full overflow-auto">
      <main className="flex flex-col items-stretch w-full">
        <NavBar />
        <div className="h-[68px] w-full" />
        <FeatureRequestFlow title="Social Feature" subtitle={SUBTITLE} idPrefix="social" />
      </main>
    </div>
  );
}
