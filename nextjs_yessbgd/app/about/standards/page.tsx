import type { Metadata } from "next";
import { getSitePage } from "@/lib/cms";
import { StandardsClient } from "./StandardsClient";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("about-standards");
  return {
    title: page?.seo_title || "Quality Standards & QA | YESS Bangladesh",
    description:
      page?.seo_description ||
      page?.hero_subtitle ||
      "Six institutional quality commitments that govern every line of code, infrastructure terraform blueprint, and SLA handover across all YESS subsidiaries.",
  };
}

export default async function StandardsPage() {
  const sitePage = await getSitePage("about-standards");
  return <StandardsClient sitePage={sitePage} />;
}
