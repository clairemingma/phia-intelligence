export type Product = {
  id: string;
  brand: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  retailer: string;
};

export type Editorial = {
  id: string;
  category: string;
  title: string;
  body: string;
  image: string;
};

export const products: Product[] = [
  { id: "p1", brand: "Stone Island", name: "Garment Dyed Overshirt Jacket", price: 495, image: "https://picsum.photos/seed/phia-p1/400/500", retailer: "Stone Island" },
  { id: "p2", brand: "C.P. Company", name: "Goggle Metropolis Shell Jacket", price: 620, image: "https://picsum.photos/seed/phia-p2/400/500", retailer: "END Clothing" },
  { id: "p3", brand: "Carhartt WIP", name: "Active Liner Jacket", price: 180, salePrice: 126, image: "https://picsum.photos/seed/phia-p3/400/500", retailer: "Carhartt WIP" },
  { id: "p4", brand: "Needles", name: "Track Jacket — Poly Smooth", price: 340, image: "https://picsum.photos/seed/phia-p4/400/500", retailer: "HAVEN" },
  { id: "p5", brand: "Human Made", name: "Nyco Boa Fleece Jacket", price: 530, image: "https://picsum.photos/seed/phia-p5/400/500", retailer: "Human Made" },
  { id: "p6", brand: "NEIGHBORHOOD", name: "Riders Quilted Liner Jacket", price: 420, image: "https://picsum.photos/seed/phia-p6/400/500", retailer: "NEIGHBORHOOD" },
  { id: "p7", brand: "Brain Dead", name: "Boa Fleece Track Jacket", price: 295, image: "https://picsum.photos/seed/phia-p7/400/500", retailer: "Brain Dead" },
  { id: "p8", brand: "Moncler", name: "Genius Himalaya Down Jacket", price: 1890, image: "https://picsum.photos/seed/phia-p8/400/500", retailer: "SSENSE" },
  { id: "p9", brand: "Fear of God", name: "Eternal Coaches Jacket", price: 850, image: "https://picsum.photos/seed/phia-p9/400/500", retailer: "Fear of God" },
  { id: "p10", brand: "Rick Owens", name: "DRKSHDW Jumbo Bauhaus Parka", price: 1240, image: "https://picsum.photos/seed/phia-p10/400/500", retailer: "SSENSE" },
  { id: "p11", brand: "Wales Bonner", name: "Denim Blouson Jacket", price: 680, image: "https://picsum.photos/seed/phia-p11/400/500", retailer: "Wales Bonner" },
  { id: "p12", brand: "Undercover", name: "Panelled Cotton Overshirt Jacket", price: 560, salePrice: 390, image: "https://picsum.photos/seed/phia-p12/400/500", retailer: "MATCHESFASHION" },
];

export const editorialHero: Editorial = {
  id: "e1",
  category: "Trending",
  title: "The Season's Most Wanted Outerwear",
  body: "From technical shells to heritage wools — our editors' definitive guide to the jackets worth investing in this season.",
  image: "https://picsum.photos/seed/phia-hero/1200/800",
};

export const editorialCards: Editorial[] = [
  {
    id: "e2",
    category: "Style Guide",
    title: "Layering Essentials for the Transitional Season",
    body: "How to build a wardrobe that works across every temperature.",
    image: "https://picsum.photos/seed/phia-ed2/400/267",
  },
  {
    id: "e3",
    category: "Deep Dive",
    title: "Technical Fabrics, Explained",
    body: "Gore-Tex, Polartec, and the materials redefining modern outerwear.",
    image: "https://picsum.photos/seed/phia-ed3/400/267",
  },
  {
    id: "e4",
    category: "Editors' Picks",
    title: "The Best New Drops This Week",
    body: "Our team's favourite pieces from the latest brand arrivals.",
    image: "https://picsum.photos/seed/phia-ed4/400/267",
  },
];

// How many results there are in total, and how many of them one page of the grid
// shows. Shared so the count above the grid, the grid itself and the pagination
// can never disagree.
export const resultCount = 2586;
export const productsPerPage = 48;
export const pageCount = Math.ceil(resultCount / productsPerPage);

// A page is full everywhere but the last, which holds the remainder.
export function pageSize(page: number) {
  return page < pageCount
    ? productsPerPage
    : resultCount - (pageCount - 1) * productsPerPage;
}

// ?page= arrives as untrusted text: anything missing, non-numeric or off the end
// of the results lands on page 1 rather than on an empty grid.
export function resolvePage(value?: string) {
  const page = Number(value);
  return Number.isInteger(page) && page >= 1 && page <= pageCount ? page : 1;
}

// The active category lives in the URL, so the nav, the sidebar and the
// breadcrumb all read from one place: /?category=Women&subcategory=Jackets
export function categoryHref(category: string, subcategory?: string) {
  return pageHref(1, category, subcategory);
}

// Paging keeps you where you are in the taxonomy — only the page moves. Page 1
// is the canonical URL for a set of results, so it carries no ?page=.
export function pageHref(page: number, category?: string, subcategory?: string) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (subcategory) params.set("subcategory", subcategory);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/?${query}` : "/";
}

// The masthead taxonomy: one entry per category link, each opening a hover
// panel of subcategory columns. Order here is the order in the nav.
export type CategoryColumn = {
  heading: string;
  items: string[];
  // "Shop By"-style columns are merchandising shortcuts rather than taxonomy,
  // so they appear in the hover panel but not in the sidebar's drill-down.
  promo?: boolean;
};

export type CategoryMenu = {
  label: string;
  // Doubles as the page's on-screen description and its meta description, so
  // each one is written to sit inside the ~155 characters Google renders.
  description: string;
  columns: CategoryColumn[];
};

export function categoryDescription(category: string): string | undefined {
  return categoryMenus.find((menu) => menu.label === category)?.description;
}

// The taxonomy one level beneath a category, e.g. Women → Clothing, Shoes,
// Accessories. Unknown categories have none, so the caller falls back to the
// top-level list.
export function subcategoriesOf(category: string): string[] {
  return (
    categoryMenus
      .find((menu) => menu.label === category)
      ?.columns.filter((column) => !column.promo)
      .map((column) => column.heading) ?? []
  );
}

export const categoryMenus: CategoryMenu[] = [
  {
    label: "Women",
    description:
      "Women's clothing, shoes and accessories from 20+ retail and resale sites, compared in one place so you never overpay for the pieces you want.",
    columns: [
      {
        heading: "Clothing",
        items: ["Dresses", "Tops", "Jackets & Coats", "Knitwear", "Denim", "Skirts", "Trousers", "Activewear"],
      },
      { heading: "Shoes", items: ["Sneakers", "Boots", "Heels", "Flats", "Sandals"] },
      { heading: "Accessories", items: ["Bags", "Jewelry", "Belts", "Scarves", "Sunglasses"] },
      { heading: "Shop By", items: ["New Arrivals", "Trending", "Under $100", "On Sale"], promo: true },
    ],
  },
  {
    label: "Men",
    description:
      "Menswear from 20+ retail and resale sites, compared in one place — catch every markdown and never overpay for the pieces you actually want.",
    columns: [
      {
        heading: "Clothing",
        items: ["Shirts", "Tops", "Jackets & Coats", "Knitwear", "Denim", "Trousers", "Suiting", "Activewear"],
      },
      { heading: "Shoes", items: ["Sneakers", "Boots", "Loafers", "Sandals"] },
      { heading: "Accessories", items: ["Bags", "Watches", "Belts", "Hats", "Sunglasses"] },
      { heading: "Shop By", items: ["New Arrivals", "Trending", "Under $100", "On Sale"], promo: true },
    ],
  },
  {
    label: "Accessories",
    description:
      "Bags, jewelry and everything that finishes an outfit, priced across 20+ retail and resale sites so the cheapest listing always finds you first.",
    columns: [
      { heading: "Bags", items: ["Totes", "Shoulder Bags", "Crossbody", "Clutches", "Backpacks", "Weekenders"] },
      { heading: "Jewelry", items: ["Rings", "Necklaces", "Earrings", "Bracelets", "Watches"] },
      { heading: "Leather Goods", items: ["Wallets", "Card Holders", "Belts", "Keychains"] },
      { heading: "Hats & Eyewear", items: ["Caps", "Beanies", "Bucket Hats", "Sunglasses", "Optical"] },
      { heading: "Shop By", items: ["New Arrivals", "Trending", "Under $150", "On Sale"], promo: true },
    ],
  },
  {
    label: "Beauty",
    description:
      "Skincare, makeup, hair and fragrance from 20+ retailers, compared side by side so every restock lands at the lowest price available.",
    columns: [
      { heading: "Skincare", items: ["Cleansers", "Moisturizers", "Serums", "Masks", "SPF"] },
      { heading: "Makeup", items: ["Face", "Eyes", "Lips", "Cheeks", "Tools"] },
      { heading: "Hair", items: ["Shampoo", "Conditioner", "Styling", "Treatments"] },
      { heading: "Fragrance", items: ["Women's", "Men's", "Unisex", "Candles"] },
    ],
  },
  {
    label: "Home",
    description:
      "Furniture, lighting, kitchen and bedding from 20+ retailers, compared side by side so the piece you've been eyeing arrives at the price you wanted.",
    columns: [
      { heading: "Living", items: ["Furniture", "Lighting", "Rugs", "Mirrors", "Decor"] },
      { heading: "Kitchen & Dining", items: ["Cookware", "Tableware", "Glassware", "Barware"] },
      { heading: "Bed & Bath", items: ["Sheets", "Duvets", "Pillows", "Towels"] },
      { heading: "Shop By", items: ["New Arrivals", "Trending", "Under $100", "On Sale"], promo: true },
    ],
  },
  {
    label: "Shoes",
    description:
      "Sneakers, boots and everything between, priced across 20+ retail and resale sites — including the sold-out pairs resellers still have in your size.",
    columns: [
      { heading: "Women's", items: ["Sneakers", "Boots", "Heels", "Flats", "Sandals"] },
      { heading: "Men's", items: ["Sneakers", "Boots", "Loafers", "Sandals", "Slides"] },
      { heading: "Shop By Brand", items: ["New Balance", "adidas Originals", "Rick Owens", "Thom Browne"], promo: true },
      { heading: "Shop By", items: ["New Arrivals", "Trending", "Under $200", "On Sale"], promo: true },
    ],
  },
  {
    label: "Sale",
    description:
      "Every markdown worth knowing about, gathered from 20+ retail and resale sites and ranked by how much you actually save.",
    columns: [
      { heading: "Women", items: ["Clothing", "Shoes", "Bags", "Accessories"] },
      { heading: "Men", items: ["Clothing", "Shoes", "Bags", "Accessories"] },
      { heading: "Beauty & Home", items: ["Skincare", "Makeup", "Fragrance", "Home"] },
      { heading: "By Discount", items: ["Up to 30% Off", "30–50% Off", "50–70% Off", "70% Off & More"], promo: true },
    ],
  },
];

export const brands = [
  "66°North", "adidas Originals", "Alpha Industries", "Basketcase",
  "Brain Dead", "C.P. Company", "Carhartt WIP", "Dime",
  "Fear of God", "Human Made", "Junya Watanabe Man", "KidSuper",
  "Moncler", "Needles", "NEIGHBORHOOD", "New Balance",
  "Rick Owens", "Stone Island", "Thom Browne", "Undercover",
  "WACKO MARIA", "Wales Bonner",
];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

// Stores are the sellers phia compares across — retail and resale alike.
export const stores = [
  "Depop", "eBay", "END Clothing", "Farfetch", "Fashionphile",
  "Grailed", "MATCHESFASHION", "Mytheresa", "Net-a-Porter", "Nordstrom",
  "Poshmark", "Rebag", "Revolve", "Saks Fifth Avenue", "Shopbop",
  "SSENSE", "The RealReal", "ThredUp", "Vestiaire Collective",
];

export const materials = [
  "100% Cotton", "100% Polyester", "Acrylic/elastic/cotton", "Chinlon",
  "Cotton", "Cotton/polyester", "Elastodiene", "Lace", "Nylon",
  "Nylon/spandex Blend", "Organic Cotton",
];

export const conditions = ["New", "Used"];

export const colors = [
  { name: "Beige", hex: "#D4C5A9" },
  { name: "Black", hex: "#0A0A0A" },
  { name: "Blue", hex: "#2C4E8A" },
  { name: "Brown", hex: "#6B3A2A" },
  { name: "Green", hex: "#2D5A3D" },
  { name: "Grey", hex: "#8A8A8A" },
  { name: "Purple", hex: "#5C3A6E" },
  { name: "Red", hex: "#B82C2C" },
  { name: "White", hex: "#F5F5F5" },
  { name: "Yellow", hex: "#D4AC2C" },
];
