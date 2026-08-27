/** Whose portal this is. Products carry a brand, and the answer to "is this
 *  ours?" is needed in more than one place, so it is settled here. */
export const OWN_BRAND = "Frame";

export function isOwnBrand(brand?: string): boolean {
  return brand?.toLowerCase() === OWN_BRAND.toLowerCase();
}
