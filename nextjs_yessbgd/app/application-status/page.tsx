import { Suspense } from "react";
import type { Metadata } from "next";
import { ApplicationStatusTracker } from "./ApplicationStatusTracker";
import { Loader2 } from "lucide-react";
import { getSitePage, getCompanySettings } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("application-status");
  return {
    title: page?.seo_title || "Application Status Tracker",
    description:
      page?.seo_description ||
      page?.hero_subtitle ||
      "Real-time candidate telemetry for engineering, product, and consulting roles across YESS Bangladesh ventures.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ApplicationStatusPage() {
  const [sitePage, settings] = await Promise.all([
    getSitePage("application-status"),
    getCompanySettings(),
  ]);

  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="mt-3 text-xs text-foreground/70">Loading sovereign candidate session...</p>
        </div>
      }
    >
      <ApplicationStatusTracker initialSitePage={sitePage} settings={settings} />
    </Suspense>
  );
}
