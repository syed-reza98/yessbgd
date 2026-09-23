import {
  mysqlTable,
  varchar,
  text,
  int,
  boolean,
  datetime,
  json,
  mysqlEnum,
  index,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

/* -------------------------------- Enums -------------------------------- */
export const appRoleEnum = mysqlEnum("app_role", ["admin", "moderator", "user"]);

export const applicationStatusEnum = mysqlEnum("application_status", [
  "New",
  "Reviewed",
  "Rejected",
  "Submitted",
  "Under review",
  "Interview",
  "Offer",
  "Hired",
  "On hold",
]);

/* --------------------------- Users & Profiles -------------------------- */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const userRoles = mysqlTable("user_roles", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  role: appRoleEnum.notNull().default("user"),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("user_roles_user_id_idx").on(table.userId),
]);

export const profiles = mysqlTable("profiles", {
  id: varchar("id", { length: 36 }).primaryKey().references(() => users.id, { onDelete: "cascade" }),
  fullName: varchar("full_name", { length: 150 }),
  phone: varchar("phone", { length: 50 }),
  jobTitle: varchar("job_title", { length: 100 }),
  avatarUrl: text("avatar_url"),
  language: varchar("language", { length: 10 }).notNull().default("en"),
  theme: varchar("theme", { length: 20 }).notNull().default("system"),
  itemsPerPage: int("items_per_page").notNull().default(20),
  notifyNewApplication: boolean("notify_new_application").notNull().default(true),
  notifyNewMessage: boolean("notify_new_message").notNull().default(true),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

/* ----------------------------- CMS Core Tables ----------------------------- */
export const cmsVentures = mysqlTable("cms_ventures", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  tagline: text("tagline"),
  description: text("description"),
  category: varchar("category", { length: 100 }),
  status: varchar("status", { length: 50 }).default("active"),
  icon: varchar("icon", { length: 100 }),
  imagePath: text("image_path"),
  sortOrder: int("sort_order").default(0),
  data: json("data").$type<Record<string, unknown>>(),
  isPublished: boolean("is_published").default(true),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
}, (table) => [
  index("cms_ventures_sort_idx").on(table.sortOrder),
]);

export const cmsServices = mysqlTable("cms_services", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  bullets: json("bullets").$type<string[]>(),
  pricing: json("pricing").$type<Record<string, unknown>>(),
  sortOrder: int("sort_order").default(0),
  data: json("data").$type<Record<string, unknown>>(),
  isPublished: boolean("is_published").default(true),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const cmsIndustries = mysqlTable("cms_industries", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  outcomes: json("outcomes").$type<string[]>(),
  sortOrder: int("sort_order").default(0),
  data: json("data").$type<Record<string, unknown>>(),
  isPublished: boolean("is_published").default(true),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const cmsInsights = mysqlTable("cms_insights", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: varchar("slug", { length: 150 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt"),
  bodyMd: text("body_md"),
  category: varchar("category", { length: 100 }),
  author: varchar("author", { length: 100 }),
  coverImage: text("cover_image"),
  tags: json("tags").$type<string[]>(),
  publishedAt: datetime("published_at"),
  sortOrder: int("sort_order").default(0),
  data: json("data").$type<Record<string, unknown>>(),
  isPublished: boolean("is_published").default(true),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

/* --------------------------- Pages & Menu Items ---------------------------- */
export const cmsSitePages = mysqlTable("cms_site_pages", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  page: varchar("page", { length: 100 }).notNull().unique(),
  path: varchar("path", { length: 255 }).notNull(),
  name: varchar("name", { length: 150 }).notNull(),
  nameBn: varchar("name_bn", { length: 150 }),
  heroEyebrow: varchar("hero_eyebrow", { length: 255 }),
  heroEyebrowBn: varchar("hero_eyebrow_bn", { length: 255 }),
  heroTitle: varchar("hero_title", { length: 255 }),
  heroTitleBn: varchar("hero_title_bn", { length: 255 }),
  heroSubtitle: text("hero_subtitle"),
  heroSubtitleBn: text("hero_subtitle_bn"),
  heroImage: text("hero_image"),
  body: text("body"),
  bodyBn: text("body_bn"),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoTitleBn: varchar("seo_title_bn", { length: 255 }),
  seoDescription: text("seo_description"),
  seoDescriptionBn: text("seo_description_bn"),
  ogImage: text("og_image"),
  isCustom: boolean("is_custom").notNull().default(false),
  isPublished: boolean("is_published").notNull().default(true),
  sortOrder: int("sort_order").default(0),
  data: json("data").$type<Record<string, unknown>>(),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const cmsPages = mysqlTable("cms_pages", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  page: varchar("page", { length: 100 }).notNull(),
  sectionKey: varchar("section_key", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }),
  titleBn: varchar("title_bn", { length: 255 }),
  subtitle: text("subtitle"),
  subtitleBn: text("subtitle_bn"),
  body: text("body"),
  bodyBn: text("body_bn"),
  ctaLabel: varchar("cta_label", { length: 100 }),
  ctaHref: varchar("cta_href", { length: 255 }),
  imageUrl: text("image_url"),
  sortOrder: int("sort_order").default(0),
  isPublished: boolean("is_published").default(true),
  data: json("data").$type<Record<string, unknown>>(),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
}, (table) => [
  index("cms_pages_page_section_idx").on(table.page, table.sectionKey),
]);

export const cmsMenuItems = mysqlTable("cms_menu_items", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  location: varchar("location", { length: 50 }).notNull().default("header"),
  parentId: varchar("parent_id", { length: 36 }),
  depth: int("depth").notNull().default(0),
  label: varchar("label", { length: 150 }).notNull(),
  labelBn: varchar("label_bn", { length: 150 }),
  href: varchar("href", { length: 255 }).notNull(),
  groupLabel: varchar("group_label", { length: 100 }),
  sortOrder: int("sort_order").default(0),
  isExternal: boolean("is_external").default(false),
  isPublished: boolean("is_published").default(true),
  icon: varchar("icon", { length: 100 }),
  description: text("description"),
  descriptionBn: text("description_bn"),
  accent: varchar("accent", { length: 50 }),
  itemStyle: varchar("item_style", { length: 50 }),
  badge: varchar("badge", { length: 50 }),
  badgeBn: varchar("badge_bn", { length: 50 }),
  visibleTo: varchar("visible_to", { length: 50 }).notNull().default("all"),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
}, (table) => [
  index("cms_menu_items_location_sort_idx").on(table.location, table.sortOrder),
]);

export const cmsSettings = mysqlTable("cms_settings", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  key: varchar("key", { length: 100 }).notNull().unique(),
  label: varchar("label", { length: 150 }),
  group: varchar("group", { length: 100 }),
  value: json("value").$type<Record<string, unknown>>(),
  sortOrder: int("sort_order").default(0),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const cmsMedia = mysqlTable("cms_media", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  url: text("url").notNull(),
  path: text("path"),
  mimeType: varchar("mime_type", { length: 100 }),
  sizeBytes: int("size_bytes"),
  altText: text("alt_text"),
  folder: varchar("folder", { length: 100 }).default("general"),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

/* -------------------------- Operations & Audit -------------------------- */
export const contactMessages = mysqlTable("contact_messages", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 150 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("new"),
  statusNote: text("status_note"),
  statusUpdatedAt: datetime("status_updated_at"),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("contact_messages_created_idx").on(table.createdAt),
]);

export const jobApplications = mysqlTable("job_applications", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  jobSlug: varchar("job_slug", { length: 100 }).notNull(),
  jobTitle: varchar("job_title", { length: 200 }).notNull(),
  fullName: varchar("full_name", { length: 150 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  applicantLocation: varchar("applicant_location", { length: 150 }),
  linkedin: varchar("linkedin", { length: 255 }),
  coverLetter: text("cover_letter").notNull(),
  resumeName: varchar("resume_name", { length: 255 }).notNull(),
  resumePath: text("resume_path").notNull(),
  resumeSize: int("resume_size").notNull(),
  resumeType: varchar("resume_type", { length: 100 }).notNull(),
  status: applicationStatusEnum.notNull().default("Submitted"),
  statusNote: text("status_note"),
  statusUpdatedAt: datetime("status_updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("job_applications_email_idx").on(table.email),
  index("job_applications_created_idx").on(table.createdAt),
]);

export const auditLogs = mysqlTable("audit_logs", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  tableName: varchar("table_name", { length: 100 }).notNull(),
  action: varchar("action", { length: 50 }).notNull(),
  recordId: varchar("record_id", { length: 36 }),
  actorId: varchar("actor_id", { length: 36 }),
  oldData: json("old_data").$type<Record<string, unknown>>(),
  newData: json("new_data").$type<Record<string, unknown>>(),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("audit_logs_table_record_idx").on(table.tableName, table.recordId),
]);
