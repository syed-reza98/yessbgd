"use server";

import { revalidateTag, updateTag } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  cmsSitePages,
  cmsVentures,
  cmsServices,
  cmsIndustries,
  cmsInsights,
  cmsOpenings,
  cmsMenuItems,
  cmsSettings,
  cmsMedia,
  contactMessages,
  jobApplications,
  auditLogs,
  newsletterSubscribers,
} from "@/lib/db/schema";
import { eq, desc, asc, and, or, sql } from "drizzle-orm";
import { CMS_TAGS } from "@/lib/cms";
import { saveMediaFile, deleteMediaFile } from "@/lib/storage";

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

// ── Audit Log Helper ────────────────────────────────────────────────────────
async function recordAudit(
  action: string,
  tableName: string,
  recordId?: string | null,
  newData?: any,
  oldData?: any
) {
  try {
    const session = await auth();
    const actorId = (session?.user as any)?.id || null;
    await db.insert(auditLogs).values({
      actorId,
      action,
      tableName,
      recordId: recordId || null,
      newData: newData || null,
      oldData: oldData || null,
    });
  } catch (e) {
    console.warn("Could not write audit log:", e);
  }
}

// ── 1. Site Page Actions ───────────────────────────────────────────────────
export async function updateSitePageAction(pageKey: string, payload: any) {
  const [existing] = await db
    .select()
    .from(cmsSitePages)
    .where(eq(cmsSitePages.page, pageKey))
    .limit(1);

  await db
    .update(cmsSitePages)
    .set({
      heroEyebrow: payload.hero_eyebrow,
      heroEyebrowBn: payload.hero_eyebrow_bn,
      heroTitle: payload.hero_title,
      heroTitleBn: payload.hero_title_bn,
      heroSubtitle: payload.hero_subtitle,
      heroSubtitleBn: payload.hero_subtitle_bn,
      heroImage: payload.hero_image,
      body: payload.body,
      bodyBn: payload.body_bn,
      seoTitle: payload.seo_title,
      seoTitleBn: payload.seo_title_bn,
      seoDescription: payload.seo_description,
      seoDescriptionBn: payload.seo_description_bn,
      isPublished: payload.is_published ?? true,
      data: payload.data !== undefined ? payload.data : existing?.data,
      updatedAt: new Date(),
    })
    .where(eq(cmsSitePages.page, pageKey));

  await recordAudit("UPDATE", "cms_site_pages", pageKey, payload, existing);
  purgeTag(CMS_TAGS.page(pageKey));
  purgeTag(CMS_TAGS.pages);
  return { success: true };
}

// ── 2. Venture Actions ─────────────────────────────────────────────────────
export async function saveVentureAction(slug: string, payload: any, previousSlug?: string) {
  const lookupSlug = previousSlug || slug;
  let [existing] = await db
    .select()
    .from(cmsVentures)
    .where(eq(cmsVentures.slug, lookupSlug))
    .limit(1);

  if (existing) {
    if (existing.slug !== slug) {
      const [conflict] = await db
        .select()
        .from(cmsVentures)
        .where(eq(cmsVentures.slug, slug))
        .limit(1);
      if (conflict) {
        throw new Error(`The slug "${slug}" is already in use by another venture.`);
      }
    }

    await db
      .update(cmsVentures)
      .set({
        slug,
        title: payload.title,
        tagline: payload.tagline,
        description: payload.description,
        category: payload.category,
        status: payload.status || "active",
        imagePath: payload.image_path || payload.image,
        sortOrder: payload.sort_order || 0,
        isPublished: payload.is_published ?? true,
        data: payload.data || {},
        updatedAt: new Date(),
      })
      .where(eq(cmsVentures.id, existing.id));

    await recordAudit("UPDATE", "cms_ventures", slug, payload, existing);
    if (existing.slug !== slug) {
      purgeTag(CMS_TAGS.venture(existing.slug));
    }
  } else {
    const [conflict] = await db
      .select()
      .from(cmsVentures)
      .where(eq(cmsVentures.slug, slug))
      .limit(1);
    if (conflict) {
      throw new Error(`A venture with slug "${slug}" already exists.`);
    }

    await db.insert(cmsVentures).values({
      slug,
      title: payload.title,
      tagline: payload.tagline,
      description: payload.description,
      category: payload.category,
      status: payload.status || "active",
      imagePath: payload.image_path || payload.image,
      sortOrder: payload.sort_order || 0,
      isPublished: payload.is_published ?? true,
      data: payload.data || {},
    });

    await recordAudit("INSERT", "cms_ventures", slug, payload, null);
  }

  purgeTag(CMS_TAGS.venture(slug));
  purgeTag(CMS_TAGS.ventures);
  return { success: true };
}

export async function deleteVentureAction(slug: string) {
  const [existing] = await db
    .select()
    .from(cmsVentures)
    .where(eq(cmsVentures.slug, slug))
    .limit(1);

  if (existing) {
    await db.delete(cmsVentures).where(eq(cmsVentures.slug, slug));
    await recordAudit("DELETE", "cms_ventures", slug, null, existing);
  }

  purgeTag(CMS_TAGS.venture(slug));
  purgeTag(CMS_TAGS.ventures);
  return { success: true };
}

// ── 3. Service Actions ─────────────────────────────────────────────────────
export async function saveServiceAction(slug: string, payload: any, previousSlug?: string) {
  const lookupSlug = previousSlug || slug;
  let [existing] = await db
    .select()
    .from(cmsServices)
    .where(eq(cmsServices.slug, lookupSlug))
    .limit(1);

  if (existing) {
    await db
      .update(cmsServices)
      .set({
        slug,
        title: payload.title,
        description: payload.description,
        bullets: payload.bullets || [],
        pricing: payload.pricing || {},
        sortOrder: payload.sort_order || 0,
        isPublished: payload.is_published ?? true,
        data: payload.data || {},
        updatedAt: new Date(),
      })
      .where(eq(cmsServices.id, existing.id));

    await recordAudit("UPDATE", "cms_services", slug, payload, existing);
    if (existing.slug !== slug) {
      purgeTag(CMS_TAGS.service(existing.slug));
    }
  } else {
    await db.insert(cmsServices).values({
      slug,
      title: payload.title,
      description: payload.description,
      bullets: payload.bullets || [],
      pricing: payload.pricing || {},
      sortOrder: payload.sort_order || 0,
      isPublished: payload.is_published ?? true,
      data: payload.data || {},
    });

    await recordAudit("INSERT", "cms_services", slug, payload, null);
  }

  purgeTag(CMS_TAGS.service(slug));
  purgeTag(CMS_TAGS.services);
  return { success: true };
}

export async function deleteServiceAction(slug: string) {
  const [existing] = await db
    .select()
    .from(cmsServices)
    .where(eq(cmsServices.slug, slug))
    .limit(1);

  if (existing) {
    await db.delete(cmsServices).where(eq(cmsServices.slug, slug));
    await recordAudit("DELETE", "cms_services", slug, null, existing);
  }

  purgeTag(CMS_TAGS.service(slug));
  purgeTag(CMS_TAGS.services);
  return { success: true };
}

// ── 4. Industry Actions ────────────────────────────────────────────────────
export async function saveIndustryAction(slug: string, payload: any, previousSlug?: string) {
  const lookupSlug = previousSlug || slug;
  let [existing] = await db
    .select()
    .from(cmsIndustries)
    .where(eq(cmsIndustries.slug, lookupSlug))
    .limit(1);

  if (existing) {
    await db
      .update(cmsIndustries)
      .set({
        slug,
        title: payload.title,
        description: payload.description,
        outcomes: payload.outcomes || [],
        sortOrder: payload.sort_order || 0,
        isPublished: payload.is_published ?? true,
        data: payload.data || {},
        updatedAt: new Date(),
      })
      .where(eq(cmsIndustries.id, existing.id));

    await recordAudit("UPDATE", "cms_industries", slug, payload, existing);
    if (existing.slug !== slug) {
      purgeTag(CMS_TAGS.industry(existing.slug));
    }
  } else {
    await db.insert(cmsIndustries).values({
      slug,
      title: payload.title,
      description: payload.description,
      outcomes: payload.outcomes || [],
      sortOrder: payload.sort_order || 0,
      isPublished: payload.is_published ?? true,
      data: payload.data || {},
    });

    await recordAudit("INSERT", "cms_industries", slug, payload, null);
  }

  purgeTag(CMS_TAGS.industry(slug));
  purgeTag(CMS_TAGS.industries);
  return { success: true };
}

export async function deleteIndustryAction(slug: string) {
  const [existing] = await db
    .select()
    .from(cmsIndustries)
    .where(eq(cmsIndustries.slug, slug))
    .limit(1);

  if (existing) {
    await db.delete(cmsIndustries).where(eq(cmsIndustries.slug, slug));
    await recordAudit("DELETE", "cms_industries", slug, null, existing);
  }

  purgeTag(CMS_TAGS.industry(slug));
  purgeTag(CMS_TAGS.industries);
  return { success: true };
}

// ── 5. Insight Actions ─────────────────────────────────────────────────────
export async function saveInsightAction(slug: string, payload: any, previousSlug?: string) {
  const lookupSlug = previousSlug || slug;
  let [existing] = await db
    .select()
    .from(cmsInsights)
    .where(eq(cmsInsights.slug, lookupSlug))
    .limit(1);

  if (existing) {
    await db
      .update(cmsInsights)
      .set({
        slug,
        title: payload.title,
        excerpt: payload.excerpt,
        bodyMd: payload.body_md || payload.bodyMd,
        category: payload.category,
        author: payload.author,
        coverImage: payload.cover_image || payload.coverImage,
        tags: payload.tags || [],
        isPublished: payload.is_published ?? true,
        data: payload.data || {},
        updatedAt: new Date(),
      })
      .where(eq(cmsInsights.id, existing.id));

    await recordAudit("UPDATE", "cms_insights", slug, payload, existing);
    if (existing.slug !== slug) {
      purgeTag(CMS_TAGS.insight(existing.slug));
    }
  } else {
    await db.insert(cmsInsights).values({
      slug,
      title: payload.title,
      excerpt: payload.excerpt,
      bodyMd: payload.body_md || payload.bodyMd,
      category: payload.category,
      author: payload.author,
      coverImage: payload.cover_image || payload.coverImage,
      tags: payload.tags || [],
      isPublished: payload.is_published ?? true,
      data: payload.data || {},
    });

    await recordAudit("INSERT", "cms_insights", slug, payload, null);
  }

  purgeTag(CMS_TAGS.insight(slug));
  purgeTag(CMS_TAGS.insights);
  return { success: true };
}

export async function deleteInsightAction(slug: string) {
  const [existing] = await db
    .select()
    .from(cmsInsights)
    .where(eq(cmsInsights.slug, slug))
    .limit(1);

  if (existing) {
    await db.delete(cmsInsights).where(eq(cmsInsights.slug, slug));
    await recordAudit("DELETE", "cms_insights", slug, null, existing);
  }

  purgeTag(CMS_TAGS.insight(slug));
  purgeTag(CMS_TAGS.insights);
  return { success: true };
}

// ── 6. Job Opening Actions ─────────────────────────────────────────────────
export async function saveOpeningAction(slug: string, payload: any, previousSlug?: string) {
  const lookupSlug = previousSlug || slug;
  let [existing] = await db
    .select()
    .from(cmsOpenings)
    .where(eq(cmsOpenings.slug, lookupSlug))
    .limit(1);

  if (existing) {
    await db
      .update(cmsOpenings)
      .set({
        slug,
        title: payload.title,
        department: payload.department,
        location: payload.location,
        jobType: payload.job_type || payload.type || "Full-time",
        level: payload.level || "Mid",
        salaryRange: payload.salary_range || payload.salaryRange,
        summary: payload.summary,
        responsibilities: payload.responsibilities || [],
        requirements: payload.requirements || [],
        isPublished: payload.is_published ?? true,
        sortOrder: payload.sort_order || 0,
        updatedAt: new Date(),
      })
      .where(eq(cmsOpenings.id, existing.id));

    await recordAudit("UPDATE", "cms_openings", slug, payload, existing);
    if (existing.slug !== slug) {
      purgeTag(CMS_TAGS.opening(existing.slug));
    }
  } else {
    await db.insert(cmsOpenings).values({
      slug,
      title: payload.title,
      department: payload.department,
      location: payload.location,
      jobType: payload.job_type || payload.type || "Full-time",
      level: payload.level || "Mid",
      salaryRange: payload.salary_range || payload.salaryRange,
      summary: payload.summary,
      responsibilities: payload.responsibilities || [],
      requirements: payload.requirements || [],
      isPublished: payload.is_published ?? true,
      sortOrder: payload.sort_order || 0,
    });

    await recordAudit("INSERT", "cms_openings", slug, payload, null);
  }

  purgeTag(CMS_TAGS.opening(slug));
  purgeTag(CMS_TAGS.openings);
  return { success: true };
}

export async function deleteOpeningAction(slug: string) {
  const [existing] = await db
    .select()
    .from(cmsOpenings)
    .where(eq(cmsOpenings.slug, slug))
    .limit(1);

  if (existing) {
    await db.delete(cmsOpenings).where(eq(cmsOpenings.slug, slug));
    await recordAudit("DELETE", "cms_openings", slug, null, existing);
  }

  purgeTag(CMS_TAGS.opening(slug));
  purgeTag(CMS_TAGS.openings);
  return { success: true };
}

// ── 7. Settings Actions ────────────────────────────────────────────────────
export async function saveSettingAction(key: string, value: any, label?: string, group?: string) {
  const [existing] = await db
    .select()
    .from(cmsSettings)
    .where(eq(cmsSettings.key, key))
    .limit(1);

  if (existing) {
    await db
      .update(cmsSettings)
      .set({
        value,
        label: label || existing.label || key,
        group: group || existing.group || "general",
        updatedAt: new Date(),
      })
      .where(eq(cmsSettings.key, key));
  } else {
    await db.insert(cmsSettings).values({
      key,
      value,
      label: label || key,
      group: group || "general",
    });
  }

  await recordAudit("UPDATE", "cms_settings", key, value, existing?.value);
  purgeTag(CMS_TAGS.settings);
  return { success: true };
}

// ── 8. Menu Actions ────────────────────────────────────────────────────────
export async function saveMenuItemAction(item: any) {
  if (item.id && !item.id.startsWith("new_") && item.id.length > 10) {
    await db
      .update(cmsMenuItems)
      .set({
        location: item.location || "header",
        parentId: item.parent_id || item.parentId || null,
        depth: item.depth || 0,
        label: item.label,
        labelBn: item.label_bn || item.labelBn || null,
        href: item.href,
        groupLabel: item.group_label || item.groupLabel || null,
        badge: item.badge || null,
        badgeBn: item.badge_bn || item.badgeBn || null,
        icon: item.icon || null,
        sortOrder: item.sort_order ?? item.sortOrder ?? 0,
        isExternal: item.is_external ?? item.isExternal ?? false,
        isPublished: item.is_published ?? item.isPublished ?? true,
        updatedAt: new Date(),
      })
      .where(eq(cmsMenuItems.id, item.id));
  } else {
    await db.insert(cmsMenuItems).values({
      location: item.location || "header",
      parentId: item.parent_id || item.parentId || null,
      depth: item.depth || 0,
      label: item.label,
      labelBn: item.label_bn || item.labelBn || null,
      href: item.href,
      groupLabel: item.group_label || item.groupLabel || null,
      badge: item.badge || null,
      badgeBn: item.badge_bn || item.badgeBn || null,
      icon: item.icon || null,
      sortOrder: item.sort_order ?? item.sortOrder ?? 0,
      isExternal: item.is_external ?? item.isExternal ?? false,
      isPublished: item.is_published ?? item.isPublished ?? true,
    });
  }

  await recordAudit("UPSERT", "cms_menu_items", item.id || item.label, item);
  purgeTag(CMS_TAGS.menus);
  return { success: true };
}

export async function reorderMenuItemsAction(orderedItems: { id: string; sort_order: number }[]) {
  for (const item of orderedItems) {
    await db
      .update(cmsMenuItems)
      .set({ sortOrder: item.sort_order, updatedAt: new Date() })
      .where(eq(cmsMenuItems.id, item.id));
  }

  await recordAudit("REORDER", "cms_menu_items", "batch", orderedItems);
  purgeTag(CMS_TAGS.menus);
  return { success: true };
}

export async function deleteMenuItemAction(id: string) {
  await db.delete(cmsMenuItems).where(eq(cmsMenuItems.id, id));
  await recordAudit("DELETE", "cms_menu_items", id);
  purgeTag(CMS_TAGS.menus);
  return { success: true };
}

// ── 9. Operational Actions (ATS & Messages) ────────────────────────────────
export async function updateApplicationStatusAction(id: string, status: string, note?: string) {
  await db
    .update(jobApplications)
    .set({
      status,
      statusNote: note || null,
      statusUpdatedAt: new Date(),
    })
    .where(eq(jobApplications.id, id));

  await recordAudit("UPDATE_STATUS", "job_applications", id, { status, note });
  return { success: true };
}

export async function updateApplicationFeedbackAction(
  id: string,
  feedback: string,
  scheduledAt?: string | null
) {
  await db
    .update(jobApplications)
    .set({
      feedback,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      statusUpdatedAt: new Date(),
    })
    .where(eq(jobApplications.id, id));

  await recordAudit("UPDATE_FEEDBACK", "job_applications", id, { feedback, scheduledAt });
  return { success: true };
}

export async function updateMessageStatusAction(id: string, status: string, note?: string) {
  await db
    .update(contactMessages)
    .set({
      status,
      statusNote: note || null,
      statusUpdatedAt: new Date(),
    })
    .where(eq(contactMessages.id, id));

  await recordAudit("UPDATE_STATUS", "contact_messages", id, { status, note });
  return { success: true };
}

export async function toggleMessageReadAction(id: string, isRead: boolean) {
  await db
    .update(contactMessages)
    .set({ isRead })
    .where(eq(contactMessages.id, id));

  await recordAudit("MARK_READ", "contact_messages", id, { isRead });
  return { success: true };
}

export async function toggleMessageArchiveAction(id: string, isArchived: boolean) {
  await db
    .update(contactMessages)
    .set({ isArchived })
    .where(eq(contactMessages.id, id));

  await recordAudit("ARCHIVE", "contact_messages", id, { isArchived });
  return { success: true };
}

export async function deleteMessageAction(id: string) {
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
  await recordAudit("DELETE", "contact_messages", id);
  return { success: true };
}

// ── 10. Media Management Actions ───────────────────────────────────────────
export async function uploadMediaAction(formData: FormData) {
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) || "general";

  if (!file || file.size === 0) {
    throw new Error("No file provided for upload.");
  }

  const saved = await saveMediaFile(file, folder);

  const [record] = await db
    .insert(cmsMedia)
    .values({
      fileName: saved.fileName,
      url: saved.url,
      path: saved.path,
      mimeType: saved.mimeType,
      sizeBytes: saved.sizeBytes,
      folder,
    })
    .returning();

  await recordAudit("UPLOAD", "cms_media", record.id, saved);
  return { success: true, item: record };
}

export async function deleteMediaAction(id: string) {
  const [record] = await db
    .select()
    .from(cmsMedia)
    .where(eq(cmsMedia.id, id))
    .limit(1);

  if (record) {
    if (record.path) {
      await deleteMediaFile(record.path);
    }
    await db.delete(cmsMedia).where(eq(cmsMedia.id, id));
    await recordAudit("DELETE", "cms_media", id, null, record);
  }
  return { success: true };
}

export async function getAdminMediaItemsAction() {
  const rows = await db
    .select()
    .from(cmsMedia)
    .orderBy(desc(cmsMedia.createdAt));

  return rows.map((r) => ({
    id: r.id,
    file_name: r.fileName,
    url: r.url,
    path: r.path,
    mime_type: r.mimeType,
    size_bytes: r.sizeBytes,
    alt_text: r.altText,
    folder: r.folder,
    created_at: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
  }));
}

// ── 11. Admin Queries & Stats Actions ──────────────────────────────────────
export async function getAdminDashboardStatsAction() {
  const [venturesCount] = await db.select({ count: sql<number>`count(*)` }).from(cmsVentures);
  const [servicesCount] = await db.select({ count: sql<number>`count(*)` }).from(cmsServices);
  const [industriesCount] = await db.select({ count: sql<number>`count(*)` }).from(cmsIndustries);
  const [insightsCount] = await db.select({ count: sql<number>`count(*)` }).from(cmsInsights);

  const recentApplications = await db
    .select()
    .from(jobApplications)
    .orderBy(desc(jobApplications.createdAt))
    .limit(5);

  const recentMessages = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt))
    .limit(5);

  return {
    counts: {
      ventures: Number(venturesCount?.count || 0),
      services: Number(servicesCount?.count || 0),
      industries: Number(industriesCount?.count || 0),
      insights: Number(insightsCount?.count || 0),
    },
    recentApplications: recentApplications.map((a) => ({
      id: a.id,
      full_name: a.fullName,
      job_title: a.jobTitle || a.openingTitle,
      status: a.status,
      created_at: a.createdAt.toISOString(),
    })),
    recentMessages: recentMessages.map((m) => ({
      id: m.id,
      name: m.name || m.fullName,
      email: m.email,
      subject: m.subject,
      status: m.status,
      created_at: m.createdAt.toISOString(),
    })),
  };
}

export async function getAdminSitePagesAction() {
  const rows = await db
    .select()
    .from(cmsSitePages)
    .orderBy(asc(cmsSitePages.sortOrder));
  return rows.map((p) => ({
    id: p.id,
    page: p.page,
    path: p.path,
    name: p.name,
    name_bn: p.nameBn,
    hero_eyebrow: p.heroEyebrow,
    hero_title: p.heroTitle,
    hero_subtitle: p.heroSubtitle,
    hero_image: p.heroImage,
    is_published: p.isPublished,
    updated_at: p.updatedAt ? p.updatedAt.toISOString() : null,
  }));
}

export async function getAdminMenuItemsAction() {
  const rows = await db
    .select()
    .from(cmsMenuItems)
    .orderBy(asc(cmsMenuItems.sortOrder));
  return rows.map((m) => ({
    id: m.id,
    location: m.location,
    parent_id: m.parentId,
    depth: m.depth,
    label: m.label,
    label_bn: m.labelBn,
    href: m.href,
    group_label: m.groupLabel,
    badge: m.badge,
    badge_bn: m.badgeBn,
    icon: m.icon,
    sort_order: m.sortOrder,
    is_external: m.isExternal,
    is_published: m.isPublished,
  }));
}

export async function getAdminApplicationsAction() {
  const rows = await db
    .select()
    .from(jobApplications)
    .orderBy(desc(jobApplications.createdAt));
  return rows.map((a) => ({
    id: a.id,
    reference_number: a.referenceNumber,
    job_slug: a.jobSlug,
    job_title: a.jobTitle,
    opening_id: a.openingId,
    opening_title: a.openingTitle,
    full_name: a.fullName,
    email: a.email,
    phone: a.phone,
    linkedin: a.linkedin,
    applicant_location: a.applicantLocation,
    cover_letter: a.coverLetter,
    cover_note: a.coverNote,
    portfolio_url: a.portfolioUrl,
    resume_path: a.resumePath,
    resume_name: a.resumeName,
    resume_size: a.resumeSize,
    resume_type: a.resumeType,
    resume_url: a.resumeUrl,
    status: a.status,
    status_note: a.statusNote,
    feedback: a.feedback,
    scheduled_at: a.scheduledAt ? a.scheduledAt.toISOString() : null,
    status_updated_at: a.statusUpdatedAt.toISOString(),
    created_at: a.createdAt.toISOString(),
  }));
}

export async function getAdminMessagesAction() {
  const rows = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));
  return rows.map((m) => ({
    id: m.id,
    name: m.name,
    full_name: m.fullName,
    email: m.email,
    phone: m.phone,
    organization: m.organization,
    subject: m.subject,
    message: m.message,
    practice_area: m.practiceArea,
    request_nda: m.requestNda,
    status: m.status,
    status_note: m.statusNote,
    is_read: m.isRead,
    is_archived: m.isArchived,
    created_at: m.createdAt.toISOString(),
  }));
}

export async function getAdminSettingsAction() {
  const rows = await db.select().from(cmsSettings).orderBy(asc(cmsSettings.sortOrder));
  return rows.map((s) => ({
    id: s.id,
    key: s.key,
    label: s.label,
    group: s.group,
    value: s.value,
    sort_order: s.sortOrder,
  }));
}

export async function getAdminAuditLogsAction() {
  const rows = await db
    .select()
    .from(auditLogs)
    .orderBy(desc(auditLogs.createdAt))
    .limit(100);
  return rows.map((l) => ({
    id: l.id,
    actor_id: l.actorId,
    action: l.action,
    table_name: l.tableName,
    record_id: l.recordId,
    old_data: l.oldData,
    new_data: l.newData,
    created_at: l.createdAt.toISOString(),
  }));
}

// ── 12. Public Tracker RPC Replacement ─────────────────────────────────────
export async function lookupApplicationAction(email: string, ref: string) {
  if (!email || !ref) return null;
  const cleanEmail = email.trim().toLowerCase();
  const cleanRef = ref.trim().toLowerCase();

  const [row] = await db
    .select()
    .from(jobApplications)
    .where(
      and(
        sql`lower(trim(${jobApplications.email})) = ${cleanEmail}`,
        or(
          sql`lower(trim(${jobApplications.referenceNumber})) = ${cleanRef}`,
          sql`lower(trim(${jobApplications.id}::text)) = ${cleanRef}`,
          sql`lower(${jobApplications.id}::text) like ${cleanRef + "%"}`
        )
      )
    )
    .limit(1);

  if (!row) return null;

  return {
    id: row.id,
    reference_number: row.referenceNumber || row.id,
    full_name: row.fullName,
    email: row.email,
    phone: row.phone,
    opening_title: row.openingTitle || row.jobTitle,
    status: row.status,
    status_note: row.statusNote,
    feedback: row.feedback || row.statusNote,
    scheduled_at: row.scheduledAt ? row.scheduledAt.toISOString() : null,
    created_at: row.createdAt.toISOString(),
    updated_at: row.statusUpdatedAt.toISOString(),
  };
}

// ── 13. Public Newsletter Subscription ─────────────────────────────────────
export async function subscribeNewsletterAction(email: string, source: string = "footer") {
  if (!email || !email.includes("@")) {
    throw new Error("Please provide a valid corporate email address.");
  }

  const cleanEmail = email.trim().toLowerCase();
  await db
    .insert(newsletterSubscribers)
    .values({ email: cleanEmail, source })
    .onConflictDoNothing();

  return { success: true };
}

// ── 14. Data Backup & Export Actions ──────────────────────────────────────
export async function exportAllAdminDataAction() {
  const [
    pages,
    ventures,
    services,
    industries,
    insights,
    openings,
    settings,
    menus,
    apps,
    msgs,
  ] = await Promise.all([
    db.select().from(cmsSitePages),
    db.select().from(cmsVentures),
    db.select().from(cmsServices),
    db.select().from(cmsIndustries),
    db.select().from(cmsInsights),
    db.select().from(cmsOpenings),
    db.select().from(cmsSettings),
    db.select().from(cmsMenuItems),
    db.select().from(jobApplications),
    db.select().from(contactMessages),
  ]);

  return {
    exportedAt: new Date().toISOString(),
    schema: "cPanel PostgreSQL (Drizzle ORM)",
    tables: {
      cms_site_pages: pages,
      cms_ventures: ventures,
      cms_services: services,
      cms_industries: industries,
      cms_insights: insights,
      cms_openings: openings,
      cms_settings: settings,
      cms_menu_items: menus,
      job_applications: apps,
      contact_messages: msgs,
    },
  };
}

export async function exportTableDataAction(tableName: string) {
  const tableMap: Record<string, any> = {
    cms_site_pages: cmsSitePages,
    cms_ventures: cmsVentures,
    cms_services: cmsServices,
    cms_industries: cmsIndustries,
    cms_insights: cmsInsights,
    cms_openings: cmsOpenings,
    cms_settings: cmsSettings,
    cms_menu_items: cmsMenuItems,
    job_applications: jobApplications,
    contact_messages: contactMessages,
    cms_media: cmsMedia,
  };

  const table = tableMap[tableName];
  if (!table) return [];
  return await db.select().from(table);
}

