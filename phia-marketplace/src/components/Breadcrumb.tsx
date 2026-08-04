import { Fragment } from "react";
import Link from "next/link";
import { categoryHref } from "@/lib/data";

// "Shop" is the catalog root; `path` is the taxonomy beneath it, so
// ["Women", "Jackets"] renders Shop / Women / Jackets and the landing's
// ["Trending"] renders Shop / Trending. An empty path has no hierarchy to
// describe, so nothing renders rather than a decorative one-item trail.
export default function Breadcrumb({ path }: { path: string[] }) {
  if (path.length === 0) return null;

  const [category] = path;
  const crumbs = [
    { label: "Shop", href: "/" },
    ...path.map((label, i) => ({
      label,
      // The category crumb links to the category; anything deeper links to
      // itself as a subcategory of that same category.
      href: i === 0 ? categoryHref(label) : categoryHref(category, label),
    })),
  ];

  return (
    <nav className="flex items-center gap-1.5 text-[12px] pb-5" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <Fragment key={`${crumb.label}-${i}`}>
            {i > 0 && <span className="text-[#e3e3e3]">/</span>}
            {isLast ? (
              // The current page is stated, not linked.
              <span className="text-[#1a1a1a] font-medium">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="text-[#999] hover:text-[#666] transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
