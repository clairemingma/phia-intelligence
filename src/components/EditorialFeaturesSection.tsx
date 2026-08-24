"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import CreateButton from "@/components/CreateButton";
import EditorialGrid from "@/components/EditorialGrid";
import Pagination from "@/components/Pagination";
import StackedSection from "@/components/StackedSection";
import type { EditorialCardData } from "@/components/EditorialCard";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.";

/** Two rows of four, as the design pages them. */
const PER_PAGE = 8;
const TOTAL_PAGES = 10;

/** The lead slot of the first page is the exclusive placement. */
function cardsForPage(page: number): EditorialCardData[] {
  return Array.from({ length: PER_PAGE }, (_, i) => ({
    eyebrow: page === 1 && i === 0 ? "Exclusive" : "Featured",
    title: "Multipocket Tote Bag",
    description: LOREM,
  }));
}

export default function EditorialFeaturesSection({ stackIndex }: { stackIndex: number }) {
  const [page, setPage] = useState(1);

  return (
    <StackedSection index={stackIndex}>
      <SectionHeading
        title="Editorial Features"
        action={<CreateButton href="/promote/editorial-feature" />}
      />

      {/* Keyed on the page so turning it closes any open product panel, which
          belongs to a card that is no longer on screen. */}
      <EditorialGrid
        key={page}
        cards={cardsForPage(page)}
        columnsClass="grid grid-cols-4 gap-x-[16px] gap-y-[48px] w-full"
        brand="Acne Studios"
      />

      <Pagination
        page={page}
        totalPages={TOTAL_PAGES}
        onChange={setPage}
        label="Editorial features pages"
      />
    </StackedSection>
  );
}
