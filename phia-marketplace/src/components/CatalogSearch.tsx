"use client";

import { useState } from "react";
import SearchField from "./SearchField";

export default function CatalogSearch() {
  const [query, setQuery] = useState("");

  return (
    <SearchField
      value={query}
      onChange={setQuery}
      placeholder="Search Catalog"
      withIcon
      className="w-full"
    />
  );
}
