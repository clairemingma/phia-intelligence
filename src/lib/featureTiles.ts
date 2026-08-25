export type FeatureTile = {
  title: string;
  description: string;
  /** Omitted while a slot is still a placeholder, which shows the flat tint. */
  image?: string;
};

/** The looks styled for FRAME, as laid out in the design. */
export const OUTFIT_FEATURES: FeatureTile[] = [
  {
    title: "Blouse and Leather Trouser",
    description: "A ruffled blouse softening a clean leather trouser.",
    image: "/assets/outfits/01-blouse-and-leather-trouser.jpg",
  },
  {
    title: "Leather Jacket and Denim Mini",
    description: "Outerwear carrying a short denim skirt into autumn.",
    image: "/assets/outfits/02-leather-jacket-and-denim-mini.jpg",
  },
];

/** Only placed social posts are listed; empty slots are not shown. */
export const SOCIAL_FEATURES: FeatureTile[] = [
  {
    title: "Trending Products This Week",
    description:
      "see what’s trending this week! which items are you adding to your new in-app shopping cart?",
    image: "/assets/social/01-trending-products-this-week.jpg",
  },
];
