import { supabase } from "@/lib/supabase/client";
import { ventures as localVentures, type Venture } from "@/data/ventures";
import { services as localServices, type ServiceItem } from "@/data/services";
import { industries as localIndustries, type IndustryItem } from "@/data/industries";
import { insights as localInsights, type Insight } from "@/data/insights";
import { openings as localOpenings, type Opening } from "@/data/openings";
import companyContact from "@/data/company-contact.json";

export type CmsSitePage = {
  id?: string;
  page: string;
  path: string;
  name: string;
  name_bn?: string | null;
  hero_eyebrow?: string | null;
  hero_eyebrow_bn?: string | null;
  hero_title?: string | null;
  hero_title_bn?: string | null;
  hero_subtitle?: string | null;
  hero_subtitle_bn?: string | null;
  hero_image?: string | null;
  body?: string | null;
  body_bn?: string | null;
  seo_title?: string | null;
  seo_title_bn?: string | null;
  seo_description?: string | null;
  seo_description_bn?: string | null;
  is_published?: boolean;
  data?: any;
};

// ── Cache Tags ─────────────────────────────────────────────────────────────
export const CMS_TAGS = {
  ventures: "ventures:collection",
  venture: (slug: string) => `venture:${slug}`,
  services: "services:collection",
  service: (slug: string) => `service:${slug}`,
  industries: "industries:collection",
  industry: (slug: string) => `industry:${slug}`,
  insights: "insights:collection",
  insight: (slug: string) => `insight:${slug}`,
  openings: "openings:collection",
  opening: (slug: string) => `opening:${slug}`,
  pages: "pages:collection",
  page: (page: string) => `page:${page}`,
  settings: "settings:global",
  menus: "menus:global",
};

// ── Resilient Data Fetchers (Dynamic-with-Fallback) ─────────────────────────

/**
 * Fetch all published ventures from Supabase with instant local fallback.
 */
export async function getVentures(): Promise<Omit<Venture, "icon">[]> {
  try {
    const { data, error } = await supabase
      .from("cms_ventures")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return localVentures.map(({ icon, ...rest }) => rest);
    }

    return data.map((row) => {
      const fallback = localVentures.find((v) => v.slug === row.slug) || localVentures[0];
      const { icon, ...cleanFallback } = fallback;
      const extra = (row.data as any) || {};

      return {
        ...cleanFallback,
        slug: row.slug,
        title: row.title,
        tagline: row.tagline || fallback.tagline,
        desc: row.description || fallback.desc,
        category: row.category || fallback.category,
        status: (row.status as any) || fallback.status || "active",
        image: row.image_path || fallback.image,
        longDesc: extra.longDesc || fallback.longDesc,
        highlights: extra.highlights || fallback.highlights,
        services: extra.services || fallback.services,
        audience: extra.audience || fallback.audience,
        features: extra.features || fallback.features,
        founded: extra.founded || fallback.founded,
        reach: extra.reach || fallback.reach,
        domain: extra.domain || fallback.domain,
        caseStudy: extra.caseStudy || fallback.caseStudy,
        testimonial: extra.testimonial || fallback.testimonial,
        milestones: extra.milestones || fallback.milestones,
        packages: extra.packages || fallback.packages,
        faqs: extra.faqs || fallback.faqs,
        gallery: extra.gallery || fallback.gallery,
        logoUrl: extra.logoUrl || fallback.logoUrl,
      };
    });
  } catch (err) {
    console.warn("⚠️ getVentures fallback triggered:", err);
    return localVentures.map(({ icon, ...rest }) => rest);
  }
}

/**
 * Fetch a single venture by slug with fallback.
 */
export async function getVentureBySlug(slug: string): Promise<Venture | null> {
  try {
    const { data, error } = await supabase
      .from("cms_ventures")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    const fallback = localVentures.find((v) => v.slug === slug);

    if (error || !data) {
      return fallback || null;
    }

    const extra = (data.data as any) || {};
    return {
      ...(fallback || (localVentures[0] as Venture)),
      slug: data.slug,
      title: data.title,
      tagline: data.tagline || fallback?.tagline || "",
      desc: data.description || fallback?.desc || "",
      category: data.category || fallback?.category || "",
      status: (data.status as any) || fallback?.status || "active",
      image: data.image_path || fallback?.image || "",
      longDesc: extra.longDesc || fallback?.longDesc || "",
      highlights: extra.highlights || fallback?.highlights || [],
      services: extra.services || fallback?.services || [],
      audience: extra.audience || fallback?.audience || "",
      features: extra.features || fallback?.features || [],
      founded: extra.founded || fallback?.founded,
      reach: extra.reach || fallback?.reach,
      domain: extra.domain || fallback?.domain,
      caseStudy: extra.caseStudy || fallback?.caseStudy,
      testimonial: extra.testimonial || fallback?.testimonial,
      milestones: extra.milestones || fallback?.milestones,
      packages: extra.packages || fallback?.packages,
      faqs: extra.faqs || fallback?.faqs,
      gallery: extra.gallery || fallback?.gallery,
      logoUrl: extra.logoUrl || fallback?.logoUrl,
    };
  } catch (err) {
    console.warn(`⚠️ getVentureBySlug(${slug}) fallback triggered:`, err);
    return localVentures.find((v) => v.slug === slug) || null;
  }
}

/**
 * Fetch all published services with fallback.
 */
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const { data, error } = await supabase
      .from("cms_services")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return localServices;
    }

    return data.map((row) => {
      const fallback = localServices.find((s) => s.slug === row.slug) || localServices[0];
      const extra = (row.data as any) || {};

      return {
        ...fallback,
        slug: row.slug,
        title: row.title,
        desc: row.description || fallback.desc,
        bullets: (row.bullets as any) || fallback.bullets,
        pricing: (row.pricing as any) || fallback.pricing,
        intro: extra.intro || fallback.intro,
        cta: extra.cta || fallback.cta,
        capabilities: extra.capabilities || fallback.capabilities,
        deliverables: extra.deliverables || fallback.deliverables,
        techStack: extra.techStack || fallback.techStack,
        process: extra.process || fallback.process,
        faqs: extra.faqs || fallback.faqs,
      };
    });
  } catch (err) {
    console.warn("⚠️ getServices fallback triggered:", err);
    return localServices;
  }
}

/**
 * Fetch a single service by slug.
 */
export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  try {
    const { data, error } = await supabase
      .from("cms_services")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    const fallback = localServices.find((s) => s.slug === slug);
    if (error || !data) return fallback || null;

    const extra = (data.data as any) || {};
    return {
      ...(fallback || localServices[0]),
      slug: data.slug,
      title: data.title,
      desc: data.description || fallback?.desc || "",
      bullets: (data.bullets as any) || fallback?.bullets || [],
      pricing: (data.pricing as any) || fallback?.pricing || { from: "", model: "", timeline: "" },
      intro: extra.intro || fallback?.intro || "",
      cta: extra.cta || fallback?.cta || { label: "Contact Us", sub: "" },
      capabilities: extra.capabilities || fallback?.capabilities || [],
      deliverables: extra.deliverables || fallback?.deliverables || [],
      techStack: extra.techStack || fallback?.techStack || [],
      process: extra.process || fallback?.process || [],
      faqs: extra.faqs || fallback?.faqs || [],
    };
  } catch (err) {
    return localServices.find((s) => s.slug === slug) || null;
  }
}

/**
 * Fetch all published industries with fallback.
 */
export async function getIndustries(): Promise<IndustryItem[]> {
  try {
    const { data, error } = await supabase
      .from("cms_industries")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return localIndustries;
    }

    return data.map((row) => {
      const fallback = localIndustries.find((i) => i.slug === row.slug) || localIndustries[0];
      const extra = (row.data as any) || {};

      return {
        ...fallback,
        slug: row.slug,
        title: row.title,
        desc: row.description || fallback.desc,
        outcomes: (row.outcomes as any) || fallback.outcomes,
        intro: extra.intro || fallback.intro,
        challenges: extra.challenges || fallback.challenges,
        solutions: extra.solutions || fallback.solutions,
        keyMetrics: extra.keyMetrics || fallback.keyMetrics,
        caseHighlights: extra.caseHighlights || fallback.caseHighlights,
        compliance: extra.compliance || fallback.compliance,
        faqs: extra.faqs || fallback.faqs,
      };
    });
  } catch (err) {
    return localIndustries;
  }
}

/**
 * Fetch a single industry by slug.
 */
export async function getIndustryBySlug(slug: string): Promise<IndustryItem | null> {
  try {
    const { data, error } = await supabase
      .from("cms_industries")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    const fallback = localIndustries.find((i) => i.slug === slug);
    if (error || !data) return fallback || null;

    const extra = (data.data as any) || {};
    return {
      ...(fallback || localIndustries[0]),
      slug: data.slug,
      title: data.title,
      desc: data.description || fallback?.desc || "",
      outcomes: (data.outcomes as any) || fallback?.outcomes || [],
      intro: extra.intro || fallback?.intro || "",
      challenges: extra.challenges || fallback?.challenges || [],
      solutions: extra.solutions || fallback?.solutions || [],
      keyMetrics: extra.keyMetrics || fallback?.keyMetrics || [],
      caseHighlights: extra.caseHighlights || fallback?.caseHighlights || [],
      compliance: extra.compliance || fallback?.compliance || [],
      faqs: extra.faqs || fallback?.faqs || [],
    };
  } catch (err) {
    return localIndustries.find((i) => i.slug === slug) || null;
  }
}

/**
 * Fetch all published insights with fallback.
 */
export async function getInsights(): Promise<Insight[]> {
  try {
    const { data, error } = await supabase
      .from("cms_insights")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return localInsights;
    }

    return data.map((row) => {
      const fallback = localInsights.find((ins) => ins.slug === row.slug) || localInsights[0];
      const extra = (row.data as any) || {};

      return {
        slug: row.slug,
        tag: row.category || fallback.tag,
        date: extra.date || fallback.date,
        readTime: extra.readTime || fallback.readTime,
        title: row.title,
        excerpt: row.excerpt || fallback.excerpt,
        author: {
          name: row.author ? row.author.split("(")[0].trim() : fallback.author.name,
          role: row.author ? row.author.replace(/^[^(]*\(|\)[^)]*$/g, "") : fallback.author.role,
        },
        content: extra.content || fallback.content,
      };
    });
  } catch (err) {
    return localInsights;
  }
}

/**
 * Fetch a single insight article by slug.
 */
export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  try {
    const { data, error } = await supabase
      .from("cms_insights")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    const fallback = localInsights.find((i) => i.slug === slug);
    if (error || !data) return fallback || null;

    const extra = (data.data as any) || {};
    return {
      slug: data.slug,
      tag: data.category || fallback?.tag || "Research",
      date: extra.date || fallback?.date || "Recent",
      readTime: extra.readTime || fallback?.readTime || "5 min read",
      title: data.title,
      excerpt: data.excerpt || fallback?.excerpt || "",
      author: {
        name: data.author ? data.author.split("(")[0].trim() : fallback?.author.name || "YESS Research",
        role: data.author ? data.author.replace(/^[^(]*\(|\)[^)]*$/g, "") : fallback?.author.role || "Editorial Board",
      },
      content: extra.content || fallback?.content || [{ body: data.body_md || "" }],
    };
  } catch (err) {
    return localInsights.find((i) => i.slug === slug) || null;
  }
}

/**
 * Fetch all published job openings with fallback.
 */
export async function getOpenings(): Promise<Opening[]> {
  try {
    const { data, error } = await supabase
      .from("cms_openings")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return localOpenings;
    }

    return data.map((row) => ({
      slug: row.slug,
      title: row.title,
      dept: row.department,
      location: row.location,
      type: row.job_type || "Full-time",
      level: (row.level as any) || "Mid",
      summary: row.summary || "",
      responsibilities: (row.responsibilities as any) || [],
      requirements: (row.requirements as any) || [],
    }));
  } catch (err) {
    return localOpenings;
  }
}

/**
 * Fetch a single job opening by slug.
 */
export async function getOpeningBySlug(slug: string): Promise<Opening | null> {
  try {
    const { data, error } = await supabase
      .from("cms_openings")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    const fallback = localOpenings.find((o) => o.slug === slug);
    if (error || !data) return fallback || null;

    return {
      slug: data.slug,
      title: data.title,
      dept: data.department,
      location: data.location,
      type: data.job_type || "Full-time",
      level: (data.level as any) || "Mid",
      summary: data.summary || "",
      responsibilities: (data.responsibilities as any) || [],
      requirements: (data.requirements as any) || [],
    };
  } catch (err) {
    return localOpenings.find((o) => o.slug === slug) || null;
  }
}

/**
 * Fetch site page metadata and hero blocks.
 */
export async function getSitePage(pageKey: string): Promise<CmsSitePage | null> {
  try {
    const { data, error } = await supabase
      .from("cms_site_pages")
      .select("*")
      .eq("page", pageKey)
      .maybeSingle();

    if (error || !data) return null;
    return data as CmsSitePage;
  } catch (err) {
    return null;
  }
}

/**
 * Fetch corporate settings by group or key.
 */
export async function getSetting<T = any>(key: string): Promise<T | null> {
  try {
    const { data, error } = await supabase
      .from("cms_settings")
      .select("value")
      .eq("key", key)
      .maybeSingle();

    if (error || !data) return null;
    return data.value as T;
  } catch (err) {
    return null;
  }
}

// ── Menus & Navigation ──────────────────────────────────────────────────────

export type CmsMenuItem = {
  id: string;
  location: string;
  parent_id?: string | null;
  depth?: number;
  label: string;
  label_bn?: string | null;
  href: string;
  group_label?: string | null;
  badge?: string | null;
  badge_bn?: string | null;
  icon?: string | null;
  sort_order: number;
  is_external?: boolean;
  is_published?: boolean;
};

const DEFAULT_HEADER_MENUS: CmsMenuItem[] = [
  { id: "1", location: "header", label: "Home", label_bn: "হোম", href: "/", sort_order: 1, is_published: true },
  { id: "2", location: "header", label: "About", label_bn: "আমাদের সম্পর্কে", href: "/about", sort_order: 2, is_published: true },
  { id: "3", location: "header", label: "Ventures", label_bn: "ভেঞ্চার", href: "/ventures", badge: "13 Active", sort_order: 3, is_published: true },
  { id: "4", location: "header", label: "Services", label_bn: "সার্ভিস", href: "/services", sort_order: 4, is_published: true },
  { id: "5", location: "header", label: "Industries", label_bn: "ইন্ডাস্ট্রি", href: "/industries", sort_order: 5, is_published: true },
  { id: "6", location: "header", label: "Insights", label_bn: "ইনসাইট", href: "/insights", badge: "Research", sort_order: 6, is_published: true },
  { id: "7", location: "header", label: "Careers", label_bn: "ক্যারিয়ার", href: "/careers", badge: "Hiring", sort_order: 7, is_published: true },
  { id: "8", location: "header", label: "Contact", label_bn: "যোগাযোগ", href: "/contact", sort_order: 8, is_published: true },
];

const DEFAULT_FOOTER_MENUS: CmsMenuItem[] = [
  { id: "f1", location: "footer", label: "Board of Directors", label_bn: "পরিচালনা পর্ষদ", href: "/about/leadership", sort_order: 1, is_published: true },
  { id: "f2", location: "footer", label: "Impact & Sustainability", label_bn: "টেকসই প্রভাব", href: "/about/standards", sort_order: 2, is_published: true },
  { id: "f3", location: "footer", label: "Annual Reports & Awards", label_bn: "বার্ষিক প্রতিবেদন ও সম্মাননা", href: "/about/awards", sort_order: 3, is_published: true },
  { id: "f4", location: "footer", label: "Careers at YESS", label_bn: "ইয়েস-এ ক্যারিয়ার", href: "/careers", sort_order: 4, is_published: true },
  { id: "f5", location: "footer", label: "Privacy Policy", label_bn: "গোপনীয়তা নীতি", href: "/privacy", sort_order: 5, is_published: true },
  { id: "f6", location: "footer", label: "Terms of Service", label_bn: "ব্যবহারের শর্তাবলী", href: "/terms", sort_order: 6, is_published: true },
];

/**
 * Fetch navigation menu items for header or footer with resilient fallback.
 */
export async function getMenuItems(location: "header" | "footer" = "header"): Promise<CmsMenuItem[]> {
  try {
    const { data, error } = await supabase
      .from("cms_menu_items")
      .select("*")
      .eq("location", location)
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return location === "header" ? DEFAULT_HEADER_MENUS : DEFAULT_FOOTER_MENUS;
    }

    return data as CmsMenuItem[];
  } catch (err) {
    console.warn(`⚠️ getMenuItems(${location}) fallback triggered:`, err);
    return location === "header" ? DEFAULT_HEADER_MENUS : DEFAULT_FOOTER_MENUS;
  }
}

// ── Global Company Settings ─────────────────────────────────────────────────

export type CompanySettings = {
  branding: {
    companyName: string;
    companyNameBn?: string;
    legalName: string;
    registrationNo?: string;
    logoUrl?: string;
    letterheadUrl?: string;
    faviconUrl?: string;
  };
  contact: {
    phone: string;
    email: string;
    investEmail?: string;
    careersEmail?: string;
    whatsapp?: string;
    address: string;
    addressBn?: string;
  };
  offices: {
    motijheel: {
      name: string;
      nameBn?: string;
      address: string;
      badge?: string;
      hours?: string;
      lat?: number;
      lng?: number;
    };
    gulshan: {
      name: string;
      nameBn?: string;
      address: string;
      badge?: string;
      hours?: string;
      lat?: number;
      lng?: number;
    };
  };
  socials: {
    twitter?: string;
    youtube?: string;
    facebook?: string;
    linkedin?: string;
  };
};

const DEFAULT_COMPANY_SETTINGS: CompanySettings = {
  branding: {
    companyName: "YESS Bangladesh",
    companyNameBn: "ইয়েস বাংলাদেশ",
    legalName: (companyContact as any).legalName || "Yess Bangla Private Limited",
    registrationNo: "C-184920",
    logoUrl: "/assets/yess-bangla-logo.png",
    faviconUrl: "/favicon.png",
  },
  contact: {
    phone: (companyContact as any).phone?.display || "+880 1805-464343",
    email: (companyContact as any).email || "yessbangla.bd@gmail.com",
    investEmail: "invest@yessbgd.com",
    careersEmail: "careers@yessbgd.com",
    whatsapp: "+880 1805-464343",
    address: (companyContact as any).office || "Block-A, Road-3, House-127 (Green View), 1st Floor, Mirpur-12, Dhaka-1216",
    addressBn: "ব্লক-এ, রোড-৩, হাউজ-১২৭ (গ্রিন ভিউ), ১ম তলা, মিরপুর-১২, ঢাকা-১২১৬",
  },
  offices: {
    motijheel: {
      name: "Corporate Headquarters",
      nameBn: "কর্পোরেট হেডকোয়ার্টার",
      address: "Suite 804, City Center Tower, Motijheel C/A, Dhaka-1000",
      badge: "Statutory & Board",
      hours: "BST 09:00 - 18:00 (Sun - Thu)",
      lat: 23.7289,
      lng: 90.4184,
    },
    gulshan: {
      name: "Regional Innovation Lab",
      nameBn: "ইনোভেশন ও ডেলিভারি ল্যাব",
      address: "House 42, Road 11, Gulshan-2, Dhaka-1212",
      badge: "NOC / SRE Hub",
      hours: "24/7 Operations",
      lat: 23.7925,
      lng: 90.4078,
    },
  },
  socials: {
    twitter: "https://x.com/yessbangla",
    youtube: "https://youtube.com/@yessbangla",
    facebook: "https://facebook.com/yessbangla",
    linkedin: "https://linkedin.com/company/yessbangla",
  },
};

/**
 * Fetch consolidated company settings (branding, contact, offices, socials) with fallback.
 */
export async function getCompanySettings(): Promise<CompanySettings> {
  try {
    const { data, error } = await supabase
      .from("cms_settings")
      .select("key, value");

    if (error || !data || data.length === 0) {
      return DEFAULT_COMPANY_SETTINGS;
    }

    const brand = data.find((s) => s.key === "branding")?.value || {};
    const contact = data.find((s) => s.key === "contact")?.value || {};
    const offices = data.find((s) => s.key === "offices")?.value || {};
    const socials = data.find((s) => s.key === "socials")?.value || {};

    return {
      branding: {
        ...DEFAULT_COMPANY_SETTINGS.branding,
        ...brand,
      },
      contact: {
        ...DEFAULT_COMPANY_SETTINGS.contact,
        ...contact,
      },
      offices: {
        motijheel: {
          ...DEFAULT_COMPANY_SETTINGS.offices.motijheel,
          ...(offices.motijheel || {}),
        },
        gulshan: {
          ...DEFAULT_COMPANY_SETTINGS.offices.gulshan,
          ...(offices.gulshan || {}),
        },
      },
      socials: {
        ...DEFAULT_COMPANY_SETTINGS.socials,
        ...socials,
      },
    };
  } catch (err) {
    console.warn("⚠️ getCompanySettings fallback triggered:", err);
    return DEFAULT_COMPANY_SETTINGS;
  }
}

/**
 * Fetch a site page by path or slug (supports both core routes and custom /p/[slug] routes).
 */
export async function getPageByPathOrSlug(slugOrPath: string): Promise<CmsSitePage | null> {
  try {
    const cleanSlug = slugOrPath.replace(/^\/p\//, "").replace(/^\//, "");
    const possiblePaths = [`/p/${cleanSlug}`, `/${cleanSlug}`, cleanSlug];

    const { data, error } = await supabase
      .from("cms_site_pages")
      .select("*")
      .or(`page.eq.${cleanSlug},path.in.(${possiblePaths.map((p) => `"${p}"`).join(",")})`)
      .eq("is_published", true)
      .maybeSingle();

    if (error || !data) return null;
    return data as CmsSitePage;
  } catch (err) {
    return null;
  }
}

