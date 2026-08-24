import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import PromoteIndex from "@/components/PromoteIndex";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Promote — Phia Intelligence",
  description: "Editorial, outfit, and social features plus promotional codes for your brand",
};

export default function PromotePage() {
  return (
    <main className="flex flex-col items-stretch w-full">
      <NavBar />
      <div className="h-[68px] w-full" />
      <PromoteIndex />
      <Footer />
    </main>
  );
}
