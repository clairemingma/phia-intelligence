/** The two editorials the placement choice previews. Names, prices and
 *  photography come from each brand's public collection feed; the engagement
 *  figures and copy are mock. */

export type EditorialProduct = {
  id: string;
  brand: string;
  name: string;
  price: string;
  image: string;
};

export type EditorialPlacement = {
  id: "exclusive" | "inclusion";
  /** The card's own label and blurb in the form. */
  cardTitle: string;
  cardBody: string;
  /** Who the editorial is published under. */
  handle: string;
  avatar: string;
  /** The FRAME mark is a wordmark that has to sit whole in its circle; the
   *  phia app icon is a full-bleed square. */
  avatarFit: "cover" | "contain";
  cover: string;
  title: string;
  description: string;
  /** An exclusive names its own section above the grid; an inclusion, sitting
   *  amongst other brands, goes straight to the products. */
  section?: { title: string; body: string };
  products: EditorialProduct[];
};

/** A brand's own editorial — every product is theirs. */
const FRAME_TROUSERS: EditorialProduct[] = [
  { id: "frame-le-slim-palazzo", brand: "Frame", name: "Le Slim Palazzo", price: "$278", image: "/assets/products/le-slim-palazzo.jpg" },
  { id: "frame-le-sleek-straight", brand: "Frame", name: "Le Sleek Straight", price: "$194", image: "/assets/products/le-sleek-straight.jpg" },
  { id: "frame-the-ranger-pant", brand: "Frame", name: "The Ranger Pant", price: "$348", image: "/assets/products/the-ranger-pant.jpg" },
  { id: "frame-le-pixie-modern-pocket", brand: "Frame", name: "Le Pixie Modern Pocket", price: "$298", image: "/assets/products/le-pixie-modern-pocket.jpg" },
  { id: "frame-le-slim-palazzo-honeymoon", brand: "Frame", name: "Le Slim Palazzo Honeymoon", price: "$278", image: "/assets/products/le-slim-palazzo-honeymoon.jpg" },
  { id: "frame-le-sleek-straight-long", brand: "Frame", name: "Le Sleek Straight Long", price: "$258", image: "/assets/products/le-sleek-straight-long.jpg" },
  { id: "frame-le-pixie-slim-palazzo", brand: "Frame", name: "Le Pixie Slim Palazzo", price: "$194", image: "/assets/products/le-pixie-slim-palazzo.jpg" },
  { id: "frame-jetset-weekend-capri", brand: "Frame", name: "Jetset Weekend Capri", price: "$198", image: "/assets/products/jetset-weekend-capri.jpg" },
];

/** A shared edit — the brand sits amongst its peers at the same price point. */
const PREMIUM_DENIM: EditorialProduct[] = [
  { id: "frame-le-slim-palazzo", brand: "Frame", name: "Le Slim Palazzo", price: "$278", image: "/assets/products/le-slim-palazzo.jpg" },
  { id: "agolde-big-cuff-jean-in-rinse", brand: "AGOLDE", name: "Big Cuff Jean in Rinse", price: "$288", image: "/assets/denim/agolde-big-cuff-jean-in-rinse.jpg" },
  { id: "re-done-1966-selvedge-slim-jean", brand: "Re/Done", name: "1966 Selvedge Slim Jean", price: "$425", image: "/assets/denim/re-done-1966-selvedge-slim-jean-premium-dark.jpg" },
  { id: "frame-le-sleek-straight", brand: "Frame", name: "Le Sleek Straight", price: "$194", image: "/assets/products/le-sleek-straight.jpg" },
  { id: "citizens-of-humanity-adler-slim-cashmere-denim", brand: "Citizens of Humanity", name: "Adler Slim Cashmere Denim", price: "$268", image: "/assets/denim/citizens-of-humanity-adler-slim-cashmere-den.jpg" },
  { id: "agolde-90-s-pinch-waist-straight-long", brand: "AGOLDE", name: "90's Pinch Waist Straight Long", price: "$238", image: "/assets/denim/agolde-90-s-pinch-waist-high-rise-straight-l.jpg" },
  { id: "frame-le-pixie-modern-pocket", brand: "Frame", name: "Le Pixie Modern Pocket", price: "$298", image: "/assets/products/le-pixie-modern-pocket.jpg" },
  { id: "agolde-mid-rise-kick-boot", brand: "AGOLDE", name: "Mid Rise Kick Boot", price: "$258", image: "/assets/denim/agolde-mid-rise-kick-boot-comfort-stretch-in.jpg" },
];

export const EDITORIAL_PLACEMENTS: EditorialPlacement[] = [
  {
    id: "exclusive",
    cardTitle: "Exclusive Editorial",
    cardBody: "An editorial devoted entirely to your brand.",
    handle: "@Frame",
    avatar: "/assets/editorial-brand-frame.jpg",
    avatarFit: "contain",
    cover: "/assets/editorials/cover-the-trouser-edit.jpg",
    title: "The Trouser Edit",
    description:
      "Flattering fits, refined details, and effortless sophistication. Shop the pieces that transition seamlessly from work to everywhere else.",
    section: {
      title: "The Wide Leg",
      body: "Frame's palazzo cuts do the work of a trouser and the talking of a statement. High-rise, sharply pressed, and long enough to wear with anything flat.",
    },
    products: FRAME_TROUSERS,
  },
  {
    id: "inclusion",
    cardTitle: "Editorial Inclusion",
    cardBody: "A considered placement amongst like-minded brands.",
    handle: "@phia",
    avatar: "/assets/editorial-brand-phia.png",
    avatarFit: "cover",
    cover: "/assets/editorials/cover-premium-denim-edit.jpg",
    title: "Premium Denim Edit",
    description: "Higher-price denim grouped for shoppers already prepared to spend.",
    products: PREMIUM_DENIM,
  },
];
