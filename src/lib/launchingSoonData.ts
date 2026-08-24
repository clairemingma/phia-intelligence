import type { CSSProperties } from "react";

export type LaunchingSoonSection = {
  label: string;
  subtitle: string;
  /** The eyebrow above the active label. Only the unshipped surface is soon. */
  status: "Now Live" | "Launching Soon";
  image: string;
  /**
   * Where the artwork sits in the square tile. The browser tiles come out of
   * Figma complete — backdrop, chrome and all — so they fill the frame. The
   * device shots are transparent cut-outs and are placed by hand over the
   * tile's own background.
   */
  imageStyle: CSSProperties;
};

// Longhand `left`/`top` rather than `inset`, so every tile in the set styles
// the same properties — React warns when a reused node mixes the two forms.
const FULL_BLEED: CSSProperties = {
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export const LAUNCHING_SOON_SECTIONS: LaunchingSoonSection[] = [
  {
    label: "Phia.com",
    subtitle:
      "Premium shopping and editorial destination with app data powering content strategy and merchant discovery.",
    status: "Now Live",
    image: "/assets/tile-phia-com.png",
    imageStyle: FULL_BLEED,
  },
  {
    label: "Marketplace",
    subtitle:
      "Every store searchable at once, surfacing your catalog against new and resale inventory with prices compared side by side.",
    status: "Now Live",
    image: "/assets/tile-marketplace.png",
    imageStyle: FULL_BLEED,
  },
  {
    label: "Digital Closet",
    subtitle:
      "Increases consumer engagement and retention, new merchandising opportunities.",
    status: "Now Live",
    image: "/assets/phone-closet-v2.png",
    imageStyle: { left: "20.42%", top: "8.1%", width: "59.15%", height: "120.95%" },
  },
  {
    label: "Creator Network",
    subtitle:
      "Luxury creators, editors, stylists, tastemakers with easy affiliate link creation in-app.",
    status: "Launching Soon",
    image: "/assets/phone-creator.png",
    imageStyle: {
      left: "50%",
      top: "8.1%",
      width: "59.15%",
      height: "120.95%",
      transform: "translateX(-50%)",
    },
  },
];
