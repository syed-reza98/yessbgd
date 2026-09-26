"use server";

import { revalidateTag } from "next/cache";
const purgeTag = (tag: string) => (revalidateTag as any)(tag);
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
      updated_at: new Date().toISOString(),
    })
    .eq("page", pageKey);

  if (error) throw new Error(error.message);

  await recordAudit(supabase, "UPDATE", "cms_site_pages", pageKey, payload, existing);
  purgeTag(CMS_TAGS.page(pageKey));
  purgeTag(CMS_TAGS.pages);
  return { success: true };
}

// ── 2. Venture Actions ─────────────────────────────────────────────────────
export async function saveVentureAction(slug: string, payload: any) {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("cms_ventures")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  const isNew = !existing;
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

  const { error } = await supabase
    .from("cms_ventures")
    .upsert(ventureRow, { onConflict: "slug" });

  if (error) throw new Error(error.message);

  await recordAudit(supabase, isNew ? "INSERT" : "UPDATE", "cms_ventures", slug, ventureRow, existing);
  purgeTag(CMS_TAGS.venture(slug));
  purgeTag(CMS_TAGS.ventures);
  return { success: true };
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
export async function saveServiceAction(slug: string, payload: any) {
  const supabase = await createClient();

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

  const { error } = await supabase
    .from("cms_services")
    .upsert(serviceRow, { onConflict: "slug" });

  if (error) throw new Error(error.message);

  await recordAudit(supabase, "UPSERT", "cms_services", slug, serviceRow);
  purgeTag(CMS_TAGS.service(slug));
  purgeTag(CMS_TAGS.services);
  return { success: true };
}

// ── 4. Industry Actions ────────────────────────────────────────────────────
export async function saveIndustryAction(slug: string, payload: any) {
  const supabase = await createClient();

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

  const { error } = await supabase
    .from("cms_industries")
    .upsert(industryRow, { onConflict: "slug" });

  if (error) throw new Error(error.message);

  await recordAudit(supabase, "UPSERT", "cms_industries", slug, industryRow);
  purgeTag(CMS_TAGS.industry(slug));
  purgeTag(CMS_TAGS.industries);
  return { success: true };
}

// ── 5. Insight Actions ─────────────────────────────────────────────────────
export async function saveInsightAction(slug: string, payload: any) {
  const supabase = await createClient();

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

  const { error } = await supabase
    .from("cms_insights")
    .upsert(insightRow, { onConflict: "slug" });

  if (error) throw new Error(error.message);

  await recordAudit(supabase, "UPSERT", "cms_insights", slug, insightRow);
  purgeTag(CMS_TAGS.insight(slug));
  purgeTag(CMS_TAGS.insights);
  return { success: true };
}

// ── 6. Job Opening Actions ─────────────────────────────────────────────────
export async function saveOpeningAction(slug: string, payload: any) {
  const supabase = await createClient();

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

  const { error } = await supabase
    .from("cms_openings")
    .upsert(openingRow, { onConflict: "slug" });

  if (error) throw new Error(error.message);

  await recordAudit(supabase, "UPSERT", "cms_openings", slug, openingRow);
  purgeTag(CMS_TAGS.opening(slug));
  purgeTag(CMS_TAGS.openings);
  return { success: true };
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

  const { error } = await supabase
    .from("cms_menu_items")
    .upsert(item);

  if (error) throw new Error(error.message);

  await recordAudit(supabase, "UPSERT", "cms_menu_items", item.id || item.label, item);
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
