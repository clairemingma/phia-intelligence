/** The look the outfit-feature preview is built around, as laid out in the
 *  design. Names and prices come from the FRAME product pages; the cover is
 *  the design's own photography. */

export type OutfitProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
};

export const OUTFIT_COVER = "/assets/outfits/03-sunday-casual.jpg";

/** The model stands right of this frame's middle, so the phone's narrow crop
 *  needs telling where to look to centre her. Only applies to the cover above —
 *  an uploaded one is centred, having no known subject. */
export const OUTFIT_COVER_POSITION = "67% center";

export const OUTFIT_TITLE = "The Back To it All Edit.";
export const OUTFIT_DESCRIPTION =
  "Tailored for every part of your day. Explore versatile essentials that evolve effortlessly between moments, seasons and states of mind.";

/** Ordered as worn, so the rail reads down the look. */
export const OUTFIT_PRODUCTS: OutfitProduct[] = [
  {
    id: "femme-leather-blazer",
    name: "The Femme Leather Blazer",
    price: "$1,898",
    image: "/assets/outfits/sunday-casual-blazer.jpg",
  },
  {
    id: "bubble-stitch-shirt",
    name: "The Bubble Stitch Shirt",
    price: "$348",
    image: "/assets/outfits/sunday-casual-shirt.jpg",
  },
  {
    id: "mini-denim-utility-skirt",
    name: "The Mini Denim Utility Skirt",
    price: "$278",
    image: "/assets/outfits/sunday-casual-skirt.jpg",
  },
];
