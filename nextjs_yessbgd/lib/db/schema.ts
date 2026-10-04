import {
  pgTable,
  text,
  boolean,
  integer,
  timestamp,
  uuid,
  jsonb,
  bigint,
  pgEnum,
} from "drizzle-orm/pg-core";

export const appRoleEnum = pgEnum("app_role", ["admin", "moderator", "user"]);

// ── Authentication & Users ─────────────────────────────────────────────────
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  role: appRoleEnum("role").default("admin").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const profiles = pgTable("profiles", {
  id: uuid("id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  fullName: text("full_name"),
  jobTitle: text("job_title"),
  phone: text("phone"),
  avatarUrl: text("avatar_url"),
  language: text("language").default("en"),
  theme: text("theme").default("dark"),
  notifyNewApplication: boolean("notify_new_application").default(true),
  notifyNewMessage: boolean("notify_new_message").default(true),
  itemsPerPage: integer("items_per_page").default(20),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const userRoles = pgTable("user_roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  role: appRoleEnum("role").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ── CMS Content Tables ─────────────────────────────────────────────────────
export const cmsSitePages = pgTable("cms_site_pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  page: text("page").notNull().unique(),
  path: text("path").notNull(),
  name: text("name").notNull(),
  nameBn: text("name_bn"),
  heroEyebrow: text("hero_eyebrow"),
  heroEyebrowBn: text("hero_eyebrow_bn"),
  heroTitle: text("hero_title"),
  heroTitleBn: text("hero_title_bn"),
  heroSubtitle: text("hero_subtitle"),
  heroSubtitleBn: text("hero_subtitle_bn"),
  heroImage: text("hero_image"),
  body: text("body"),
  bodyBn: text("body_bn"),
  seoTitle: text("seo_title"),
  seoTitleBn: text("seo_title_bn"),
  seoDescription: text("seo_description"),
  seoDescriptionBn: text("seo_description_bn"),
  ogImage: text("og_image"),
  isCustom: boolean("is_custom").default(false),
  isPublished: boolean("is_published").default(true),
  sortOrder: integer("sort_order").default(0),
  data: jsonb("data").$type<any>().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const cmsVentures = pgTable("cms_ventures", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  tagline: text("tagline"),
  description: text("description"),
  category: text("category"),
  status: text("status").default("active"),
  icon: text("icon"),
  imagePath: text("image_path"),
  sortOrder: integer("sort_order").default(0),
  isPublished: boolean("is_published").default(true),
  data: jsonb("data").$type<any>().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const cmsServices = pgTable("cms_services", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  icon: text("icon"),
  bullets: jsonb("bullets").$type<any>().default([]),
  pricing: jsonb("pricing").$type<any>().default({}),
  sortOrder: integer("sort_order").default(0),
  isPublished: boolean("is_published").default(true),
  data: jsonb("data").$type<any>().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const cmsIndustries = pgTable("cms_industries", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  icon: text("icon"),
  outcomes: jsonb("outcomes").$type<any>().default([]),
  sortOrder: integer("sort_order").default(0),
  isPublished: boolean("is_published").default(true),
  data: jsonb("data").$type<any>().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const cmsInsights = pgTable("cms_insights", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  bodyMd: text("body_md"),
  category: text("category"),
  author: text("author"),
  coverImage: text("cover_image"),
  tags: jsonb("tags").$type<any>().default([]),
  publishedAt: timestamp("published_at", { withTimezone: true }).defaultNow(),
  sortOrder: integer("sort_order").default(0),
  isPublished: boolean("is_published").default(true),
  data: jsonb("data").$type<any>().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const cmsOpenings = pgTable("cms_openings", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  location: text("location").notNull(),
  jobType: text("job_type").default("Full-time"),
  level: text("level").default("Mid"),
  salaryRange: text("salary_range"),
  summary: text("summary"),
  responsibilities: jsonb("responsibilities").$type<any>().default([]),
  requirements: jsonb("requirements").$type<any>().default([]),
  isPublished: boolean("is_published").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const cmsMenuItems = pgTable("cms_menu_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  location: text("location").default("header").notNull(),
  parentId: uuid("parent_id"),
  depth: integer("depth").default(0).notNull(),
  label: text("label").notNull(),
  labelBn: text("label_bn"),
  href: text("href").notNull(),
  groupLabel: text("group_label"),
  badge: text("badge"),
  badgeBn: text("badge_bn"),
  icon: text("icon"),
  sortOrder: integer("sort_order").default(0),
  isExternal: boolean("is_external").default(false),
  isPublished: boolean("is_published").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const cmsSettings = pgTable("cms_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: text("key").notNull().unique(),
  label: text("label"),
  group: text("group").default("general"),
  value: jsonb("value").$type<any>().default({}),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const cmsMedia = pgTable("cms_media", {
  id: uuid("id").primaryKey().defaultRandom(),
  fileName: text("file_name").notNull(),
  url: text("url").notNull(),
  path: text("path"),
  mimeType: text("mime_type"),
  sizeBytes: bigint("size_bytes", { mode: "number" }),
  altText: text("alt_text"),
  folder: text("folder").default("general"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ── Interactive Inbound & Operations ───────────────────────────────────────
export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  practiceArea: text("practice_area"),
  status: text("status").default("new").notNull(),
  statusNote: text("status_note"),
  statusUpdatedAt: timestamp("status_updated_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  fullName: text("full_name"),
  organization: text("organization"),
  requestNda: boolean("request_nda").default(false),
  isRead: boolean("is_read").default(false),
  isArchived: boolean("is_archived").default(false),
});

export const jobApplications = pgTable("job_applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  jobSlug: text("job_slug"),
  jobTitle: text("job_title"),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  linkedin: text("linkedin"),
  applicantLocation: text("applicant_location"),
  coverLetter: text("cover_letter"),
  resumePath: text("resume_path"),
  resumeName: text("resume_name"),
  resumeSize: integer("resume_size"),
  resumeType: text("resume_type"),
  status: text("status").default("Submitted").notNull(),
  statusNote: text("status_note"),
  statusUpdatedAt: timestamp("status_updated_at", { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  referenceNumber: text("reference_number"),
  openingId: text("opening_id"),
  openingTitle: text("opening_title"),
  portfolioUrl: text("portfolio_url"),
  coverNote: text("cover_note"),
  resumeUrl: text("resume_url"),
  feedback: text("feedback"),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  actorId: uuid("actor_id"),
  action: text("action").notNull(),
  tableName: text("table_name").notNull(),
  recordId: text("record_id"),
  oldData: jsonb("old_data").$type<any>(),
  newData: jsonb("new_data").$type<any>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  source: text("source").default("footer"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
