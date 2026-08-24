/** FRAME product data behind the performance page. Names, prices and
 *  photography come from their public collection feeds; the view and
 *  purchase figures are mock. */

export type Product = { name: string; price: string; image: string; metric: string };

export const SORT_FILTERS = ["Impressions", "Top Selling"] as const;
export type SortFilter = (typeof SORT_FILTERS)[number];

/** Each sort has its own ranking, and reports its own unit. */
export const TRENDING: Record<SortFilter, Product[]> = {
  "Impressions": [
    { name: "The Garden Dress", price: "$598", image: "/assets/products/the-garden-dress.jpg", metric: "4,820 views" },
    { name: "The Suede Gray", price: "$1,998", image: "/assets/products/the-suede-gray.jpg", metric: "4,315 views" },
    { name: "The Bow Crop", price: "$398", image: "/assets/products/the-bow-crop.jpg", metric: "3,940 views" },
    { name: "The Ranger Pant", price: "$348", image: "/assets/products/the-ranger-pant.jpg", metric: "3,602 views" },
    { name: "The Henley Rib Tee", price: "$348", image: "/assets/products/the-henley-rib-tee.jpg", metric: "3,188 views" },
    { name: "The Postcard Dress", price: "$698", image: "/assets/products/the-postcard-dress.jpg", metric: "2,974 views" },
    { name: "The Chain Belt", price: "$248", image: "/assets/products/the-chain-belt.jpg", metric: "2,510 views" },
    { name: "Le Slim Palazzo", price: "$278", image: "/assets/products/le-slim-palazzo.jpg", metric: "2,236 views" },
    { name: "The Square Buckle Belt", price: "$198", image: "/assets/products/the-square-buckle-belt.jpg", metric: "1,879 views" },
    { name: "The Classic Cami", price: "$148", image: "/assets/products/the-classic-cami.jpg", metric: "1,544 views" },
  ],
  "Top Selling": [
    { name: "The Classic Cami", price: "$148", image: "/assets/products/the-classic-cami.jpg", metric: "548 purchases" },
    { name: "Le Sleek Straight", price: "$194", image: "/assets/products/le-sleek-straight.jpg", metric: "501 purchases" },
    { name: "Le Slim Palazzo", price: "$278", image: "/assets/products/le-slim-palazzo.jpg", metric: "437 purchases" },
    { name: "The Henley Rib Tee", price: "$348", image: "/assets/products/the-henley-rib-tee.jpg", metric: "402 purchases" },
    { name: "Le Pixie Slim Palazzo", price: "$194", image: "/assets/products/le-pixie-slim-palazzo.jpg", metric: "366 purchases" },
    { name: "The Ghost Tee", price: "$148", image: "/assets/products/the-ghost-tee.jpg", metric: "318 purchases" },
    { name: "The Boxy Tee", price: "$148", image: "/assets/products/the-boxy-tee.jpg", metric: "274 purchases" },
    { name: "Cashmere Crewneck Sweater", price: "$598", image: "/assets/products/cashmere-crewneck-sweater.jpg", metric: "241 purchases" },
    { name: "The Ranger Pant", price: "$348", image: "/assets/products/the-ranger-pant.jpg", metric: "198 purchases" },
    { name: "The Ghost Tank", price: "$128", image: "/assets/products/the-ghost-tank.jpg", metric: "176 purchases" },
  ],
};

export type Category = {
  name: string;
  shade: string;
  /** Shown while no subcategory is selected. */
  products: Product[];
  subs: { name: string; products: Product[] }[];
};

export const CATEGORIES: Category[] = [
  {
    name: "Denim",
    shade: "#002D9F",
    products: [
      { name: "Le Slim Palazzo", price: "$278", image: "/assets/products/le-slim-palazzo.jpg", metric: "2,600 views" },
      { name: "Le Pixie Slim Palazzo", price: "$194", image: "/assets/products/le-pixie-slim-palazzo.jpg", metric: "2,170 views" },
      { name: "Le Slim Palazzo Honeymoon", price: "$278", image: "/assets/products/le-slim-palazzo-honeymoon.jpg", metric: "1,740 views" },
    ],
    subs: [
      { name: "Straight", products: [
        { name: "Le Sleek Straight", price: "$194", image: "/assets/products/le-sleek-straight.jpg", metric: "2,220 views" },
        { name: "Le Sleek Straight Long", price: "$258", image: "/assets/products/le-sleek-straight-long.jpg", metric: "1,790 views" },
        { name: "Le Slim Palazzo", price: "$278", image: "/assets/products/le-slim-palazzo.jpg", metric: "1,360 views" },
      ] },
      { name: "Wide Leg", products: [
        { name: "Le Slim Palazzo", price: "$278", image: "/assets/products/le-slim-palazzo.jpg", metric: "2,030 views" },
        { name: "Le Slim Palazzo Honeymoon", price: "$278", image: "/assets/products/le-slim-palazzo-honeymoon.jpg", metric: "1,600 views" },
        { name: "Le Pixie Modern Pocket", price: "$298", image: "/assets/products/le-pixie-modern-pocket.jpg", metric: "1,170 views" },
      ] },
      { name: "Cropped", products: [
        { name: "Jetset Weekend Capri", price: "$198", image: "/assets/products/jetset-weekend-capri.jpg", metric: "1,840 views" },
        { name: "Le Pixie Slim Palazzo", price: "$194", image: "/assets/products/le-pixie-slim-palazzo.jpg", metric: "1,410 views" },
        { name: "Le Slim Palazzo Honeymoon", price: "$278", image: "/assets/products/le-slim-palazzo-honeymoon.jpg", metric: "980 views" },
      ] },
    ],
  },
  {
    name: "Tops & Blouses",
    shade: "#002D9F",
    products: [
      { name: "Ritz Feminine Silk Blouse", price: "$598", image: "/assets/products/ritz-feminine-silk-blouse.jpg", metric: "2,410 views" },
      { name: "The Wednesday Shirt", price: "$398", image: "/assets/products/the-wednesday-shirt.jpg", metric: "1,980 views" },
      { name: "The Ghost Tank", price: "$128", image: "/assets/products/the-ghost-tank.jpg", metric: "1,550 views" },
    ],
    subs: [
      { name: "Silk", products: [
        { name: "Ritz Feminine Silk Blouse", price: "$598", image: "/assets/products/ritz-feminine-silk-blouse.jpg", metric: "2,220 views" },
        { name: "The Sheer Balloon Blouse", price: "$558", image: "/assets/products/the-sheer-balloon-blouse.jpg", metric: "1,790 views" },
        { name: "The Gillian Top", price: "$348", image: "/assets/products/the-gillian-top.jpg", metric: "1,360 views" },
      ] },
      { name: "Shirts", products: [
        { name: "The Wednesday Shirt", price: "$398", image: "/assets/products/the-wednesday-shirt.jpg", metric: "2,030 views" },
        { name: "The Striped Classic Shirt", price: "$224", image: "/assets/products/the-striped-classic-shirt.jpg", metric: "1,600 views" },
        { name: "V-Neck Popover Top", price: "$298", image: "/assets/products/v-neck-popover-top.jpg", metric: "1,170 views" },
      ] },
      { name: "Tanks & Tees", products: [
        { name: "The Ghost Tank", price: "$128", image: "/assets/products/the-ghost-tank.jpg", metric: "1,840 views" },
        { name: "The Boxy Tee", price: "$148", image: "/assets/products/the-boxy-tee.jpg", metric: "1,410 views" },
        { name: "The Ghost Tee", price: "$148", image: "/assets/products/the-ghost-tee.jpg", metric: "980 views" },
      ] },
      { name: "Bodysuits", products: [
        { name: "Ritz Mesh Bodysuit", price: "$448", image: "/assets/products/ritz-mesh-bodysuit.jpg", metric: "1,650 views" },
        { name: "The Postcard Tank", price: "$448", image: "/assets/products/the-postcard-tank.jpg", metric: "1,220 views" },
        { name: "The Getaway Top", price: "$348", image: "/assets/products/the-getaway-top.jpg", metric: "790 views" },
      ] },
    ],
  },
  {
    name: "Sweaters",
    shade: "#002D9F",
    products: [
      { name: "Cashmere Crewneck Sweater", price: "$598", image: "/assets/products/cashmere-crewneck-sweater.jpg", metric: "2,220 views" },
      { name: "Ritz Cable Cardigan", price: "$498", image: "/assets/products/ritz-cable-cardigan.jpg", metric: "1,790 views" },
      { name: "Ritz Room Service Hoodie", price: "$298", image: "/assets/products/ritz-room-service-hoodie.jpg", metric: "1,360 views" },
    ],
    subs: [
      { name: "Cashmere", products: [
        { name: "Cashmere Crewneck Sweater", price: "$598", image: "/assets/products/cashmere-crewneck-sweater.jpg", metric: "2,030 views" },
        { name: "Ritz Cashmere Sweater", price: "$598", image: "/assets/products/ritz-cashmere-sweater.jpg", metric: "1,600 views" },
        { name: "Ritz Unisex Cashmere Sweater", price: "$798", image: "/assets/products/ritz-unisex-cashmere-sweater.jpg", metric: "1,170 views" },
      ] },
      { name: "Crewneck", products: [
        { name: "Ritz Concierge Crew", price: "$328", image: "/assets/products/ritz-concierge-crew.jpg", metric: "1,840 views" },
        { name: "Ritz Tonal Logo Crewneck", price: "$348", image: "/assets/products/ritz-tonal-logo-crewneck.jpg", metric: "1,410 views" },
        { name: "Ritz Mixed Stitch Sweater", price: "$598", image: "/assets/products/ritz-mixed-stitch-sweater.jpg", metric: "980 views" },
      ] },
      { name: "Cardigans", products: [
        { name: "Ritz Cable Cardigan", price: "$498", image: "/assets/products/ritz-cable-cardigan.jpg", metric: "1,650 views" },
        { name: "Ritz Cardigan", price: "$698", image: "/assets/products/ritz-cardigan.jpg", metric: "1,220 views" },
        { name: "Ritz Button Detail Sweater", price: "$898", image: "/assets/products/ritz-button-detail-sweater.jpg", metric: "790 views" },
      ] },
      { name: "Sweatshirts", products: [
        { name: "Ritz Room Service Hoodie", price: "$298", image: "/assets/products/ritz-room-service-hoodie.jpg", metric: "1,460 views" },
        { name: "Ritz Terry Cropped Sweatshirt", price: "$298", image: "/assets/products/ritz-terry-cropped-sweatshirt.jpg", metric: "1,030 views" },
        { name: "Ritz Sport Sweatshirt", price: "$398", image: "/assets/products/ritz-sport-sweatshirt.jpg", metric: "600 views" },
      ] },
    ],
  },
  {
    name: "Leather & Suede",
    shade: "#002D9F",
    products: [
      { name: "The Small Leather Jacket", price: "$1,598", image: "/assets/products/the-small-leather-jacket.jpg", metric: "2,030 views" },
      { name: "The Slim Stacked Leather Pant", price: "$1,298", image: "/assets/products/the-slim-stacked-leather-pant.jpg", metric: "1,600 views" },
      { name: "The Suede Mini Skirt", price: "$499", image: "/assets/products/the-suede-mini-skirt.jpg", metric: "1,170 views" },
    ],
    subs: [
      { name: "Jackets", products: [
        { name: "The Small Leather Jacket", price: "$1,598", image: "/assets/products/the-small-leather-jacket.jpg", metric: "1,840 views" },
        { name: "The Leather Trucker Jacket", price: "$899", image: "/assets/products/the-leather-trucker-jacket.jpg", metric: "1,410 views" },
        { name: "The Suede Harrington Jacket", price: "$1,998", image: "/assets/products/the-suede-harrington-jacket.jpg", metric: "980 views" },
      ] },
      { name: "Pants", products: [
        { name: "The Slim Stacked Leather Pant", price: "$1,298", image: "/assets/products/the-slim-stacked-leather-pant.jpg", metric: "1,650 views" },
        { name: "Le Slim Palazzo Leather", price: "$1,298", image: "/assets/products/le-slim-palazzo-leather.jpg", metric: "1,220 views" },
        { name: "The Leather Boy Short", price: "$519", image: "/assets/products/the-leather-boy-short.jpg", metric: "790 views" },
      ] },
      { name: "Skirts", products: [
        { name: "The Suede Mini Skirt", price: "$499", image: "/assets/products/the-suede-mini-skirt.jpg", metric: "1,460 views" },
        { name: "The Leather Reboot Crop", price: "$1,198", image: "/assets/products/the-leather-reboot-crop.jpg", metric: "1,030 views" },
        { name: "The Leather Rodeo", price: "$898", image: "/assets/products/the-leather-rodeo.jpg", metric: "600 views" },
      ] },
      { name: "Accessories", products: [
        { name: "The Leather Bow", price: "$749", image: "/assets/products/the-leather-bow.jpg", metric: "1,270 views" },
        { name: "The Chain Belt", price: "$248", image: "/assets/products/the-chain-belt.jpg", metric: "840 views" },
        { name: "The Square Buckle Belt", price: "$198", image: "/assets/products/the-square-buckle-belt.jpg", metric: "410 views" },
      ] },
    ],
  },
  {
    name: "Dresses & Jumpsuits",
    shade: "#002D9F",
    products: [
      { name: "The Postcard Dress", price: "$698", image: "/assets/products/the-postcard-dress.jpg", metric: "1,840 views" },
      { name: "The Serene Midi Dress", price: "$268", image: "/assets/products/the-serene-midi-dress.jpg", metric: "1,410 views" },
      { name: "The Eyelet Play Dress", price: "$498", image: "/assets/products/the-eyelet-play-dress.jpg", metric: "980 views" },
    ],
    subs: [
      { name: "Maxi", products: [
        { name: "The Postcard Dress", price: "$698", image: "/assets/products/the-postcard-dress.jpg", metric: "1,650 views" },
        { name: "The Heirloom Dress", price: "$498", image: "/assets/products/the-heirloom-dress.jpg", metric: "1,220 views" },
        { name: "The Embroidered Day Dress", price: "$498", image: "/assets/products/the-embroidered-day-dress.jpg", metric: "790 views" },
      ] },
      { name: "Midi", products: [
        { name: "The Serene Midi Dress", price: "$268", image: "/assets/products/the-serene-midi-dress.jpg", metric: "1,460 views" },
        { name: "The Denim Day Dress", price: "$448", image: "/assets/products/the-denim-day-dress.jpg", metric: "1,030 views" },
        { name: "The Skipper Dress", price: "$398", image: "/assets/products/the-skipper-dress.jpg", metric: "600 views" },
      ] },
      { name: "Mini", products: [
        { name: "The Eyelet Play Dress", price: "$498", image: "/assets/products/the-eyelet-play-dress.jpg", metric: "1,270 views" },
        { name: "The Tennis Pleated Mini Dress", price: "$498", image: "/assets/products/the-tennis-pleated-mini-dress.jpg", metric: "840 views" },
        { name: "The Crochet Keyhole Dress", price: "$299", image: "/assets/products/the-crochet-keyhole-dress.jpg", metric: "410 views" },
      ] },
      { name: "Day", products: [
        { name: "The Vista Day Dress", price: "$498", image: "/assets/products/the-vista-day-dress.jpg", metric: "1,080 views" },
        { name: "The Linen Belted Dress", price: "$498", image: "/assets/products/the-linen-belted-dress.jpg", metric: "650 views" },
        { name: "The Garden Dress", price: "$598", image: "/assets/products/the-garden-dress.jpg", metric: "220 views" },
      ] },
    ],
  },
];
