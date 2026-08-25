/**
 * The Phia editorials FRAME appears in. Titles and cover art come from the
 * editorial catalogue; the exclusives are the two published editorials
 * dedicated solely to FRAME, so they lead the grid.
 */
export type Editorial = {
  eyebrow: "Exclusive" | "Featured";
  title: string;
  description: string;
  image: string;
};

export const EDITORIALS: Editorial[] = [
  {
    eyebrow: "Exclusive",
    title: "The Vibrant Summer Frame Edit",
    description: "A summer edit built entirely from your seasonal colour range.",
    image: "/assets/editorials/01-the-vibrant-summer-frame-edit.jpg",
  },
  {
    eyebrow: "Exclusive",
    title: "Foundations for 2026",
    description: "Your core denim and knitwear framed as the year's building blocks.",
    image: "/assets/editorials/02-foundations-for-2026.jpg",
  },
  {
    eyebrow: "Featured",
    title: "Editor's Denim Picks",
    description: "Editor-selected denim across fits, with your washes in the mix.",
    image: "/assets/editorials/03-editor-s-denim-picks.jpg",
  },
  {
    eyebrow: "Featured",
    title: "The Denim Edit",
    description: "A broad denim round-up spanning every fit shoppers search for.",
    image: "/assets/editorials/04-the-denim-edit.jpg",
  },
  {
    eyebrow: "Featured",
    title: "Premium Denim Edit",
    description: "Higher-price denim grouped for shoppers already prepared to spend.",
    image: "/assets/editorials/05-premium-denim-edit.jpg",
  },
  {
    eyebrow: "Featured",
    title: "Denim Diva",
    description: "Statement denim styling, for shoppers who lead with a strong pair.",
    image: "/assets/editorials/06-denim-diva.jpg",
  },
  {
    eyebrow: "Featured",
    title: "Jeans You Live in, Not Just Own",
    description: "Everyday denim judged on how it wears rather than how it looks new.",
    image: "/assets/editorials/07-jeans-you-live-in-not-just-own.jpg",
  },
  {
    eyebrow: "Featured",
    title: "A Perfect Combo: Jeans and a White Tee",
    description: "The plainest outfit there is, and the one where good denim shows.",
    image: "/assets/editorials/08-a-perfect-combo-jeans-and-a-white-tee.jpg",
  },
  {
    eyebrow: "Featured",
    title: "Best Wide Leg Jeans",
    description: "Wide-leg fits ranked — one of the shapes you index highest on.",
    image: "/assets/editorials/09-best-wide-leg-jeans.jpg",
  },
  {
    eyebrow: "Featured",
    title: "My Leather Edit",
    description: "Leather and suede pieces gathered into a single shoppable edit.",
    image: "/assets/editorials/10-my-leather-edit.jpg",
  },
  {
    eyebrow: "Featured",
    title: "Buying Cashmere",
    description: "A guide to judging cashmere, with your knitwear beside the advice.",
    image: "/assets/editorials/11-buying-cashmere.jpg",
  },
  {
    eyebrow: "Featured",
    title: "Off-Duty Edit",
    description: "Weekend dressing, where denim and easy knits do most of the work.",
    image: "/assets/editorials/12-off-duty-edit.jpg",
  },
];

/** Two rows of four, as the design pages them. */
export const EDITORIALS_PER_PAGE = 8;
