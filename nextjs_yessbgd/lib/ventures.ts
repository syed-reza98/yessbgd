/**
 * Single CMS-driven source for venture selection and counts.
 * Header and Footer both receive the same `ventures` CMS array from the
 * root layout; these helpers keep featured slicing and the "View all"
 * total computed from that one array instead of hardcoded per component.
 */

export const FEATURED_VENTURE_COUNT = 7;

/** Portfolio size used when no CMS list is available. */
export const FALLBACK_VENTURE_TOTAL = 13;

/**
 * First `count` ventures from the CMS list, or the component's own
 * display fallback when the CMS list is empty.
 */
export function selectFeaturedVentures<T>(cmsVentures: unknown, fallback: T[], count = FEATURED_VENTURE_COUNT): T[] {
  if (Array.isArray(cmsVentures) && cmsVentures.length > 0) {
    return (cmsVentures as T[]).slice(0, count);
  }
  return fallback.slice(0, count);
}

/** CMS list length, or the fallback total when the list is empty. */
export function getVentureTotal(cmsVentures: unknown, fallbackTotal = FALLBACK_VENTURE_TOTAL): number {
  if (Array.isArray(cmsVentures) && cmsVentures.length > 0) {
    return cmsVentures.length;
  }
  return fallbackTotal;
}

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Latin digits rendered as Bengali numerals for bn UI strings. */
export function toBnDigits(value: number): string {
  return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}
