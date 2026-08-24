import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import SubmissionSuccess from "@/components/SubmissionSuccess";

export const metadata: Metadata = {
  title: "Request received — Phia Intelligence",
  description: "Your placement request is with the Phia team",
};

export default function PromoteThankYouPage() {
  // Where every promote flow lands once its form has been submitted.
  return (
    <main className="flex flex-col items-stretch w-full">
      <NavBar />
      <div className="h-[68px] w-full" />
      <SubmissionSuccess />
    </main>
  );
}
