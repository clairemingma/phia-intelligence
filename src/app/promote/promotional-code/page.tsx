import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import PromoCodeFlow from "@/components/PromoCodeFlow";

export const metadata: Metadata = {
  title: "Promotional Code",
  description: "Exclusive or site-wide discount codes surfaced directly to Phia shoppers",
};

export default function PromotionalCodePage() {
  // Matches /promote/editorial-feature: the flow fills the desktop width, and
  // the page scrolls inside the wrapper rather than down the document so the
  // flow's preview column can stick. See PromoteFlowShell.
  return (
    <div data-page-scroll className="h-screen w-full overflow-auto">
      <main className="flex flex-col items-stretch w-full">
        <NavBar />
        <div className="h-[68px] w-full" />
        <PromoCodeFlow />
      </main>
    </div>
  );
}
