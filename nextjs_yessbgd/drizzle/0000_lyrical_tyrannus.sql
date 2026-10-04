CREATE TYPE "public"."app_role" AS ENUM('admin', 'moderator', 'user');--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_id" uuid,
	"action" text NOT NULL,
	"table_name" text NOT NULL,
	"record_id" text,
	"old_data" jsonb,
	"new_data" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cms_industries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"icon" text,
	"outcomes" jsonb DEFAULT '[]'::jsonb,
	"sort_order" integer DEFAULT 0,
	"is_published" boolean DEFAULT true,
	"data" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cms_industries_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "cms_insights" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text,
	"body_md" text,
	"category" text,
	"author" text,
	"cover_image" text,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"published_at" timestamp with time zone DEFAULT now(),
	"sort_order" integer DEFAULT 0,
	"is_published" boolean DEFAULT true,
	"data" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cms_insights_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "cms_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"file_name" text NOT NULL,
	"url" text NOT NULL,
	"path" text,
	"mime_type" text,
	"size_bytes" bigint,
	"alt_text" text,
	"folder" text DEFAULT 'general',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "cms_menu_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"location" text DEFAULT 'header' NOT NULL,
	"parent_id" uuid,
	"depth" integer DEFAULT 0 NOT NULL,
	"label" text NOT NULL,
	"label_bn" text,
	"href" text NOT NULL,
	"group_label" text,
	"badge" text,
	"badge_bn" text,
	"icon" text,
	"sort_order" integer DEFAULT 0,
	"is_external" boolean DEFAULT false,
	"is_published" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "cms_openings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"department" text NOT NULL,
	"location" text NOT NULL,
	"job_type" text DEFAULT 'Full-time',
	"level" text DEFAULT 'Mid',
	"salary_range" text,
	"summary" text,
	"responsibilities" jsonb DEFAULT '[]'::jsonb,
	"requirements" jsonb DEFAULT '[]'::jsonb,
	"is_published" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cms_openings_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "cms_services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"icon" text,
	"bullets" jsonb DEFAULT '[]'::jsonb,
	"pricing" jsonb DEFAULT '{}'::jsonb,
	"sort_order" integer DEFAULT 0,
	"is_published" boolean DEFAULT true,
	"data" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cms_services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "cms_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"label" text,
	"group" text DEFAULT 'general',
	"value" jsonb DEFAULT '{}'::jsonb,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cms_settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "cms_site_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"page" text NOT NULL,
	"path" text NOT NULL,
	"name" text NOT NULL,
	"name_bn" text,
	"hero_eyebrow" text,
	"hero_eyebrow_bn" text,
	"hero_title" text,
	"hero_title_bn" text,
	"hero_subtitle" text,
	"hero_subtitle_bn" text,
	"hero_image" text,
	"body" text,
	"body_bn" text,
	"seo_title" text,
	"seo_title_bn" text,
	"seo_description" text,
	"seo_description_bn" text,
	"og_image" text,
	"is_custom" boolean DEFAULT false,
	"is_published" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0,
	"data" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cms_site_pages_page_unique" UNIQUE("page")
);
--> statement-breakpoint
CREATE TABLE "cms_ventures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"tagline" text,
	"description" text,
	"category" text,
	"status" text DEFAULT 'active',
	"icon" text,
	"image_path" text,
	"sort_order" integer DEFAULT 0,
	"is_published" boolean DEFAULT true,
	"data" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cms_ventures_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"phone" text,
	"subject" text,
	"message" text NOT NULL,
	"practice_area" text,
	"status" text DEFAULT 'new' NOT NULL,
	"status_note" text,
	"status_updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"full_name" text,
	"organization" text,
	"request_nda" boolean DEFAULT false,
	"is_read" boolean DEFAULT false,
	"is_archived" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "job_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_slug" text,
	"job_title" text,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"linkedin" text,
	"applicant_location" text,
	"cover_letter" text,
	"resume_path" text,
	"resume_name" text,
	"resume_size" integer,
	"resume_type" text,
	"status" text DEFAULT 'Submitted' NOT NULL,
	"status_note" text,
	"status_updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"reference_number" text,
	"opening_id" text,
	"opening_title" text,
	"portfolio_url" text,
	"cover_note" text,
	"resume_url" text,
	"feedback" text,
	"scheduled_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"source" text DEFAULT 'footer',
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "newsletter_subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"full_name" text,
	"job_title" text,
	"phone" text,
	"avatar_url" text,
	"language" text DEFAULT 'en',
	"theme" text DEFAULT 'dark',
	"notify_new_application" boolean DEFAULT true,
	"notify_new_message" boolean DEFAULT true,
	"items_per_page" integer DEFAULT 20,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "app_role" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"name" text,
	"role" "app_role" DEFAULT 'admin' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;