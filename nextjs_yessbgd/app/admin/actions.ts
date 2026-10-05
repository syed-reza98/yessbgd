"use server";

import { revalidateTag, updateTag } from "next/cache";
const purgeTag = (tag: string) => {
  try {
    if (typeof updateTag === "function") {
      updateTag(tag);
    } else {
      (revalidateTag as any)(tag, "max");
    }
  } catch {
    try {
      (revalidateTag as any)(tag, "max");
    } catch {
      (revalidateTag as any)(tag);
    }
  }
};
import { createClient } from "@/lib/supabase/server";
import { CMS_TAGS } from "@/lib/cms";

// ── Audit Log Helper ────────────────────────────────────────────────────────
async function recordAudit(
  supabase: any,
  action: string,
  tableName: string,
  recordId: string,
  newData?: any,
  oldData?: any
) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("audit_logs").insert({
      actor_id: user?.id || null,
      action,
      table_name: tableName,
      record_id: recordId,
      new_data: newData || null,
      old_data: oldData || null,
    });
  } catch (e) {
    console.warn("Could not write audit log:", e);
  }
}

// ── 1. Site Page Actions ───────────────────────────────────────────────────
export async function updateSitePageAction(pageKey: string, payload: any) {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("cms_site_pages")
    .select("*")
    .eq("page", pageKey)
    .maybeSingle();

  const { error } = await supabase
    .from("cms_site_pages")
    .update({
      hero_eyebrow: payload.hero_eyebrow,
      hero_eyebrow_bn: payload.hero_eyebrow_bn,
      hero_title: payload.hero_title,
      hero_title_bn: payload.hero_title_bn,
      hero_subtitle: payload.hero_subtitle,
      hero_subtitle_bn: payload.hero_subtitle_bn,
      hero_image: payload.hero_image,
      body: payload.body,
      body_bn: payload.body_bn,
      seo_title: payload.seo_title,
      seo_title_bn: payload.seo_title_bn,
      seo_description: payload.seo_description,
      seo_description_bn: payload.seo_description_bn,
      is_published: payload.is_published ?? true,
      data: payload.data !== undefined ? payload.data : existing?.data,
      updated_at: new Date().toISOString(),
    })
    .eq("page", pageKey);

  if (error) throw new Error(error.message);

  await recordAudit(supabase, "UPDATE", "cms_site_pages", pageKey, payload, existing);
  purgeTag(CMS_TAGS.page(pageKey));
  purgeTag(CMS_TAGS.pages);
  return { success: true };
}

// ── Generic CMS Entity Upsert Helper (Supports Slug Renaming) ─────────────
async function saveCmsEntity({
  tableName,
  slug,
  previousSlug,
  payload,
  row,
  tagSingle,
  tagCollection,
}: {
  tableName: string;
  slug: string;
  previousSlug?: string;
  payload: any;
  row: any;
  tagSingle: (s: string) => string;
  tagCollection: string;
}) {
  const supabase = await createClient();
  const lookupSlug = previousSlug || slug;

  let existing: any = null;
  if (payload.id) {
    const { data } = await supabase
      .from(tableName)
      .select("*")
      .eq("id", payload.id)
      .maybeSingle();
    existing = data;
  } else if (lookupSlug) {
    const { data } = await supabase
      .from(tableName)
      .select("*")
      .eq("slug", lookupSlug)
      .maybeSingle();
    existing = data;
  }

  if (existing) {
    // If slug changed, ensure new slug doesn't conflict with another record
    if (existing.slug !== slug) {
      const { data: conflict } = await supabase
        .from(tableName)
        .select("id")
        .eq("slug", slug)
        .neq("id", existing.id)
        .maybeSingle();

      if (conflict) {
        throw new Error(`The slug "${slug}" is already in use by another record.`);
      }
    }

    const { error } = await supabase
      .from(tableName)
      .update(row)
      .eq("id", existing.id);

    if (error) throw new Error(error.message);

    await recordAudit(supabase, "UPDATE", tableName, slug, row, existing);
    if (existing.slug !== slug) {
      purgeTag(tagSingle(existing.slug));
    }
  } else {
    // Check if new slug conflicts
    const { data: conflict } = await supabase
      .from(tableName)
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (conflict) {
      throw new Error(`A record with slug "${slug}" already exists.`);
    }

    const { error } = await supabase
      .from(tableName)
      .insert(row);

    if (error) throw new Error(error.message);

    await recordAudit(supabase, "INSERT", tableName, slug, row, null);
  }

  purgeTag(tagSingle(slug));
  purgeTag(tagCollection);
  return { success: true };
}

// ── 2. Venture Actions ─────────────────────────────────────────────────────
export async function saveVentureAction(slug: string, payload: any, previousSlug?: string) {
  const ventureRow = {
    slug,
    title: payload.title,
    tagline: payload.tagline,
    description: payload.description,
    category: payload.category,
    status: payload.status || "active",
    image_path: payload.image_path,
    sort_order: payload.sort_order || 0,
    is_published: payload.is_published ?? true,
    data: payload.data || {},
    updated_at: new Date().toISOString(),
  };

  return saveCmsEntity({
    tableName: "cms_ventures",
    slug,
    previousSlug,
    payload,
    row: ventureRow,
    tagSingle: CMS_TAGS.venture,
    tagCollection: CMS_TAGS.ventures,
  });
}

export async function deleteVentureAction(slug: string) {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("cms_ventures")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  const { error } = await supabase.from("cms_ventures").delete().eq("slug", slug);
  if (error) throw new Error(error.message);

  await recordAudit(supabase, "DELETE", "cms_ventures", slug, null, existing);
  purgeTag(CMS_TAGS.venture(slug));
  purgeTag(CMS_TAGS.ventures);
  return { success: true };
}

// ── 3. Service Actions ─────────────────────────────────────────────────────
export async function saveServiceAction(slug: string, payload: any, previousSlug?: string) {
  const serviceRow = {
    slug,
    title: payload.title,
    description: payload.description,
    bullets: payload.bullets || [],
    pricing: payload.pricing || {},
    sort_order: payload.sort_order || 0,
    is_published: payload.is_published ?? true,
    data: payload.data || {},
    updated_at: new Date().toISOString(),
  };

  return saveCmsEntity({
    tableName: "cms_services",
    slug,
    previousSlug,
    payload,
    row: serviceRow,
    tagSingle: CMS_TAGS.service,
    tagCollection: CMS_TAGS.services,
  });
}

// ── 4. Industry Actions ────────────────────────────────────────────────────
export async function saveIndustryAction(slug: string, payload: any, previousSlug?: string) {
  const industryRow = {
    slug,
    title: payload.title,
    description: payload.description,
    outcomes: payload.outcomes || [],
    sort_order: payload.sort_order || 0,
    is_published: payload.is_published ?? true,
    data: payload.data || {},
    updated_at: new Date().toISOString(),
  };

  return saveCmsEntity({
    tableName: "cms_industries",
    slug,
    previousSlug,
    payload,
    row: industryRow,
    tagSingle: CMS_TAGS.industry,
    tagCollection: CMS_TAGS.industries,
  });
}

// ── 5. Insight Actions ─────────────────────────────────────────────────────
export async function saveInsightAction(slug: string, payload: any, previousSlug?: string) {
  const insightRow = {
    slug,
    title: payload.title,
    excerpt: payload.excerpt,
    body_md: payload.body_md,
    category: payload.category,
    author: payload.author,
    cover_image: payload.cover_image,
    tags: payload.tags || [],
    is_published: payload.is_published ?? true,
    data: payload.data || {},
    updated_at: new Date().toISOString(),
  };

  return saveCmsEntity({
    tableName: "cms_insights",
    slug,
    previousSlug,
    payload,
    row: insightRow,
    tagSingle: CMS_TAGS.insight,
    tagCollection: CMS_TAGS.insights,
  });
}

// ── 6. Job Opening Actions ─────────────────────────────────────────────────
export async function saveOpeningAction(slug: string, payload: any, previousSlug?: string) {
  const openingRow = {
    slug,
    title: payload.title,
    department: payload.department,
    location: payload.location,
    job_type: payload.job_type || "Full-time",
    level: payload.level || "Mid",
    salary_range: payload.salary_range,
    summary: payload.summary,
    responsibilities: payload.responsibilities || [],
    requirements: payload.requirements || [],
    is_published: payload.is_published ?? true,
    sort_order: payload.sort_order || 0,
    updated_at: new Date().toISOString(),
  };

  return saveCmsEntity({
    tableName: "cms_openings",
    slug,
    previousSlug,
    payload,
    row: openingRow,
    tagSingle: CMS_TAGS.opening,
    tagCollection: CMS_TAGS.openings,
  });
}

// ── 7. Settings Actions ────────────────────────────────────────────────────
export async function saveSettingAction(key: string, value: any, label?: string, group?: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("cms_settings")
    .upsert({
      key,
      value,
      label: label || key,
      group: group || "general",
      updated_at: new Date().toISOString(),
    }, { onConflict: "key" });

  if (error) throw new Error(error.message);

  await recordAudit(supabase, "UPDATE", "cms_settings", key, value);
  purgeTag(CMS_TAGS.settings);
  return { success: true };
}

// ── 8. Menu Actions ────────────────────────────────────────────────────────
export async function saveMenuItemAction(item: any) {
  const supabase = await createClient();

  const row = {
    ...item,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("cms_menu_items")
    .upsert(row);

  if (error) throw new Error(error.message);

  await recordAudit(supabase, "UPSERT", "cms_menu_items", item.id || item.label, row);
  purgeTag(CMS_TAGS.menus);
  return { success: true };
}

export async function reorderMenuItemsAction(orderedItems: { id: string; sort_order: number }[]) {
  const supabase = await createClient();

  for (const item of orderedItems) {
    const { error } = await supabase
      .from("cms_menu_items")
      .update({ sort_order: item.sort_order, updated_at: new Date().toISOString() })
      .eq("id", item.id);
    if (error) throw new Error(error.message);
  }

  await recordAudit(supabase, "REORDER", "cms_menu_items", "batch", orderedItems);
  purgeTag(CMS_TAGS.menus);
  return { success: true };
}

export async function deleteMenuItemAction(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("cms_menu_items")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  await recordAudit(supabase, "DELETE", "cms_menu_items", id);
  purgeTag(CMS_TAGS.menus);
  return { success: true };
}

// ── 9. Operational Actions (ATS & Messages) ────────────────────────────────
export async function updateApplicationStatusAction(id: string, status: string, note?: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("job_applications")
    .update({
      status,
      status_note: note || null,
      status_updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  await recordAudit(supabase, "UPDATE_STATUS", "job_applications", id, { status, note });
  return { success: true };
}

export async function updateMessageStatusAction(id: string, status: string, note?: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_messages")
    .update({
      status,
      status_note: note || null,
      status_updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  await recordAudit(supabase, "UPDATE_STATUS", "contact_messages", id, { status, note });
  return { success: true };
}

// ── 10. Public Newsletter Subscription ─────────────────────────────────────
export async function subscribeNewsletterAction(email: string, source: string = "footer") {
  if (!email || !email.includes("@")) {
    throw new Error("Please provide a valid corporate email address.");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert({ email: email.trim().toLowerCase(), source }, { onConflict: "email" });

  if (error) {
    console.warn("Newsletter subscription note:", error.message);
  }

  return { success: true };
}

