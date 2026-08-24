import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import EditorialFeatureFlow from "@/components/EditorialFeatureFlow";

export const metadata: Metadata = {
  title: "Editorial Feature",
  description: "Feature your brand in Phia editorial content, style guides, and trend reports",
};

export default function EditorialFeaturePage() {
  // The flow fills whatever desktop width it is given, as /placements does.
  // Unlike the other pages, this one scrolls inside the wrapper rather than
  // down the document: the wrapper is the sticky preview column's scroll
  // container, so giving it a height is what lets that column stick.
  return (
    <div data-page-scroll className="h-screen w-full overflow-auto">
      <main className="flex flex-col items-stretch w-full">
        <NavBar />
        <div className="h-[68px] w-full" />
        <EditorialFeatureFlow />
      </main>
    </div>
  );
}
