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
