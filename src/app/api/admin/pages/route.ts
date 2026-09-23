import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { cmsSitePages, cmsPages } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const pageKey = searchParams.get("page");
    const sectionsOnly = searchParams.get("sections");

    if (sectionsOnly && pageKey) {
      const rows = await db
        .select()
        .from(cmsPages)
        .where(eq(cmsPages.page, pageKey))
        .orderBy(asc(cmsPages.sortOrder));
      return NextResponse.json(rows);
    }

    if (pageKey) {
      const rows = await db.select().from(cmsSitePages).where(eq(cmsSitePages.page, pageKey)).limit(1);
      return NextResponse.json(rows[0] || null);
    }

    const allPages = await db.select().from(cmsSitePages).orderBy(asc(cmsSitePages.sortOrder));
    return NextResponse.json(allPages);
  } catch (error: any) {
    console.error("GET /api/admin/pages error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch pages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const isSection = Boolean(body.section_key || body.sectionKey);

    if (isSection) {
      const id = body.id || crypto.randomUUID();
      const newSection = {
        id,
        page: body.page,
        sectionKey: body.section_key || body.sectionKey,
        sortOrder: typeof body.sort_order === "number" ? body.sort_order : (typeof body.sortOrder === "number" ? body.sortOrder : 0),
        title: body.title || null,
        titleBn: body.title_bn || body.titleBn || null,
        subtitle: body.subtitle || null,
        subtitleBn: body.subtitle_bn || body.subtitleBn || null,
        body: body.body || null,
        bodyBn: body.body_bn || body.bodyBn || null,
        ctaLabel: body.cta_label || body.ctaLabel || null,
        ctaHref: body.cta_href || body.ctaHref || null,
        imageUrl: body.image_url || body.imageUrl || null,
        isPublished: body.is_published !== undefined ? Boolean(body.is_published) : (body.isPublished !== undefined ? Boolean(body.isPublished) : true),
      };
      await db.insert(cmsPages).values(newSection);
      return NextResponse.json({ success: true, section: newSection });
    }

    // Creating a new site page
    const id = body.id || crypto.randomUUID();
    const newPage = {
      id,
      page: body.page,
      path: body.path,
      name: body.name,
      nameBn: body.name_bn || body.nameBn || null,
      heroEyebrow: body.hero_eyebrow || body.heroEyebrow || null,
      heroEyebrowBn: body.hero_eyebrow_bn || body.heroEyebrowBn || null,
      heroTitle: body.hero_title || body.heroTitle || body.name,
      heroTitleBn: body.hero_title_bn || body.heroTitleBn || body.name_bn || null,
      heroSubtitle: body.hero_subtitle || body.heroSubtitle || null,
      heroSubtitleBn: body.hero_subtitle_bn || body.heroSubtitleBn || null,
      heroImage: body.hero_image || body.heroImage || null,
      body: body.body || null,
      bodyBn: body.body_bn || body.bodyBn || null,
      seoTitle: body.seo_title || body.seoTitle || null,
      seoTitleBn: body.seo_title_bn || body.seoTitleBn || null,
      seoDescription: body.seo_description || body.seoDescription || null,
      seoDescriptionBn: body.seo_description_bn || body.seoDescriptionBn || null,
      ogImage: body.og_image || body.ogImage || null,
      isCustom: Boolean(body.is_custom !== undefined ? body.is_custom : (body.isCustom !== undefined ? body.isCustom : true)),
      isPublished: Boolean(body.is_published !== undefined ? body.is_published : (body.isPublished !== undefined ? body.isPublished : true)),
      sortOrder: typeof body.sort_order === "number" ? body.sort_order : (typeof body.sortOrder === "number" ? body.sortOrder : 0),
    };

    await db.insert(cmsSitePages).values(newPage);
    return NextResponse.json({ success: true, page: newPage });
  } catch (error: any) {
    console.error("POST /api/admin/pages error:", error);
    return NextResponse.json({ error: error.message || "Failed to create page or section" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, isSection, ids, is_published, ...fields } = body;

    // Bulk toggle publish for pages
    if (Array.isArray(ids) && is_published !== undefined) {
      for (const singleId of ids) {
        await db.update(cmsSitePages).set({ isPublished: Boolean(is_published) }).where(eq(cmsSitePages.id, singleId));
      }
      return NextResponse.json({ success: true });
    }

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    if (isSection) {
      const patchData: any = {};
      if (fields.section_key !== undefined || fields.sectionKey !== undefined) {
        patchData.sectionKey = fields.section_key !== undefined ? fields.section_key : fields.sectionKey;
      }
      if (fields.sort_order !== undefined || fields.sortOrder !== undefined) {
        patchData.sortOrder = fields.sort_order !== undefined ? fields.sort_order : fields.sortOrder;
      }
      if (fields.title !== undefined) patchData.title = fields.title;
      if (fields.title_bn !== undefined || fields.titleBn !== undefined) {
        patchData.titleBn = fields.title_bn !== undefined ? fields.title_bn : fields.titleBn;
      }
      if (fields.subtitle !== undefined) patchData.subtitle = fields.subtitle;
      if (fields.subtitle_bn !== undefined || fields.subtitleBn !== undefined) {
        patchData.subtitleBn = fields.subtitle_bn !== undefined ? fields.subtitle_bn : fields.subtitleBn;
      }
      if (fields.body !== undefined) patchData.body = fields.body;
      if (fields.body_bn !== undefined || fields.bodyBn !== undefined) {
        patchData.bodyBn = fields.body_bn !== undefined ? fields.body_bn : fields.bodyBn;
      }
      if (fields.cta_label !== undefined || fields.ctaLabel !== undefined) {
        patchData.ctaLabel = fields.cta_label !== undefined ? fields.cta_label : fields.ctaLabel;
      }
      if (fields.cta_href !== undefined || fields.ctaHref !== undefined) {
        patchData.ctaHref = fields.cta_href !== undefined ? fields.cta_href : fields.ctaHref;
      }
      if (fields.image_url !== undefined || fields.imageUrl !== undefined) {
        patchData.imageUrl = fields.image_url !== undefined ? fields.image_url : fields.imageUrl;
      }
      if (fields.is_published !== undefined || fields.isPublished !== undefined) {
        patchData.isPublished = Boolean(fields.is_published !== undefined ? fields.is_published : fields.isPublished);
      }

      await db.update(cmsPages).set(patchData).where(eq(cmsPages.id, id));
      return NextResponse.json({ success: true });
    }

    // Site page update
    const patchData: any = {};
    if (fields.name !== undefined) patchData.name = fields.name;
    if (fields.name_bn !== undefined || fields.nameBn !== undefined) {
      patchData.nameBn = fields.name_bn !== undefined ? fields.name_bn : fields.nameBn;
    }
    if (fields.path !== undefined) patchData.path = fields.path;
    if (fields.hero_eyebrow !== undefined || fields.heroEyebrow !== undefined) {
      patchData.heroEyebrow = fields.hero_eyebrow !== undefined ? fields.hero_eyebrow : fields.heroEyebrow;
    }
    if (fields.hero_eyebrow_bn !== undefined || fields.heroEyebrowBn !== undefined) {
      patchData.heroEyebrowBn = fields.hero_eyebrow_bn !== undefined ? fields.hero_eyebrow_bn : fields.heroEyebrowBn;
    }
    if (fields.hero_title !== undefined || fields.heroTitle !== undefined) {
      patchData.heroTitle = fields.hero_title !== undefined ? fields.hero_title : fields.heroTitle;
    }
    if (fields.hero_title_bn !== undefined || fields.heroTitleBn !== undefined) {
      patchData.heroTitleBn = fields.hero_title_bn !== undefined ? fields.hero_title_bn : fields.heroTitleBn;
    }
    if (fields.hero_subtitle !== undefined || fields.heroSubtitle !== undefined) {
      patchData.heroSubtitle = fields.hero_subtitle !== undefined ? fields.hero_subtitle : fields.heroSubtitle;
    }
    if (fields.hero_subtitle_bn !== undefined || fields.heroSubtitleBn !== undefined) {
      patchData.heroSubtitleBn = fields.hero_subtitle_bn !== undefined ? fields.hero_subtitle_bn : fields.heroSubtitleBn;
    }
    if (fields.hero_image !== undefined || fields.heroImage !== undefined) {
      patchData.heroImage = fields.hero_image !== undefined ? fields.hero_image : fields.heroImage;
    }
    if (fields.body !== undefined) patchData.body = fields.body;
    if (fields.body_bn !== undefined || fields.bodyBn !== undefined) {
      patchData.bodyBn = fields.body_bn !== undefined ? fields.body_bn : fields.bodyBn;
    }
    if (fields.seo_title !== undefined || fields.seoTitle !== undefined) {
      patchData.seoTitle = fields.seo_title !== undefined ? fields.seo_title : fields.seoTitle;
    }
    if (fields.seo_title_bn !== undefined || fields.seoTitleBn !== undefined) {
      patchData.seoTitleBn = fields.seo_title_bn !== undefined ? fields.seo_title_bn : fields.seoTitleBn;
    }
    if (fields.seo_description !== undefined || fields.seoDescription !== undefined) {
      patchData.seoDescription = fields.seo_description !== undefined ? fields.seo_description : fields.seoDescription;
    }
    if (fields.seo_description_bn !== undefined || fields.seoDescriptionBn !== undefined) {
      patchData.seoDescriptionBn = fields.seo_description_bn !== undefined ? fields.seo_description_bn : fields.seoDescriptionBn;
    }
    if (fields.og_image !== undefined || fields.ogImage !== undefined) {
      patchData.ogImage = fields.og_image !== undefined ? fields.og_image : fields.ogImage;
    }
    if (fields.sort_order !== undefined || fields.sortOrder !== undefined) {
      patchData.sortOrder = fields.sort_order !== undefined ? fields.sort_order : fields.sortOrder;
    }
    if (fields.is_published !== undefined || fields.isPublished !== undefined) {
      patchData.isPublished = Boolean(fields.is_published !== undefined ? fields.is_published : fields.isPublished);
    }

    await db.update(cmsSitePages).set(patchData).where(eq(cmsSitePages.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PATCH /api/admin/pages error:", error);
    return NextResponse.json({ error: error.message || "Failed to update page or section" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const isSection = searchParams.get("isSection") === "true";
    const idsParam = searchParams.get("ids");

    if (idsParam) {
      const ids = idsParam.split(",").filter(Boolean);
      for (const singleId of ids) {
        await db.delete(cmsSitePages).where(eq(cmsSitePages.id, singleId));
      }
      return NextResponse.json({ success: true });
    }

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    if (isSection) {
      await db.delete(cmsPages).where(eq(cmsPages.id, id));
    } else {
      await db.delete(cmsSitePages).where(eq(cmsSitePages.id, id));
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/admin/pages error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete item" }, { status: 500 });
  }
}
