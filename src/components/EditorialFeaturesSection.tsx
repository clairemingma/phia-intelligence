"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import CreateButton from "@/components/CreateButton";
import EditorialGrid from "@/components/EditorialGrid";
import Pagination from "@/components/Pagination";
import StackedSection from "@/components/StackedSection";
import { EDITORIALS, EDITORIALS_PER_PAGE as PER_PAGE } from "@/lib/editorialData";

const TOTAL_PAGES = Math.ceil(EDITORIALS.length / PER_PAGE);

export default function EditorialFeaturesSection({ stackIndex }: { stackIndex: number }) {
  const [page, setPage] = useState(1);
  const start = (page - 1) * PER_PAGE;

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
        cards={EDITORIALS.slice(start, start + PER_PAGE)}
        columnsClass="grid grid-cols-4 gap-x-[16px] gap-y-[48px] w-full"
        brand="FRAME"
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
