/**
 * Single source of truth for Yess Bangla contact details.
 *
 * Update values here and they propagate to:
 *   - Header / Footer / Contact / Index components
 *   - briefBranding defaults (PDF + DOCX exports)
 *   - JSON-LD / structured data
 *
 * The Python letterhead generator reads the same fields from
 * `src/data/company-contact.json` — keep both in sync.
 */

export interface PhoneInfo {
  /** Pretty display value, e.g. "+880 1805-464343". */
  display: string;
  /** RFC 3966 tel: link target with no spaces, e.g. "+8801805464343". */
  tel: string;
}

export interface CompanyContact {
  legalName: string;
  shortName: string;
  phone: PhoneInfo;
  email: string;
  web: string;
  webUrl: string;
  /** Primary office address (Mirpur 12). */
  office: string;
  /** Secondary corporate office (Pallabi). */
  corporateOffice: string;
  /** Combined address string used in branded PDF / DOCX letterheads. */
  combinedAddress: string;
}

const PHONE_DISPLAY = "+880 1805-464343";
const PHONE_TEL = "+8801805464343";

export const COMPANY_CONTACT: CompanyContact = {
  legalName: "Yess Bangla Private Limited",
  shortName: "YESS Bangla",
  phone: { display: PHONE_DISPLAY, tel: PHONE_TEL },
  email: "info@yessbd.com",
  web: "www.yessbd.com",
  webUrl: "https://www.yessbd.com",
  office:
    "Section-11, Block-A, Main Road-3, Plot-10, Mirpur, Pallabi, Dhaka-1216 (Metro Rail Pillar -312)",
  corporateOffice:
    "Section-11, Block-A, Main Road-3, Plot-10, Mirpur, Pallabi, Dhaka-1216 (Metro Rail Pillar -312)",
  combinedAddress:
    "Section-11, Block-A, Main Road-3, Plot-10, Mirpur, Pallabi, Dhaka-1216 (Metro Rail Pillar -312)",
};

/** Convenience helpers so call sites read clearly. */
export const phoneDisplay = COMPANY_CONTACT.phone.display;
export const phoneTel = COMPANY_CONTACT.phone.tel;
export const phoneHref = `tel:${COMPANY_CONTACT.phone.tel}`;
