import type { Metadata } from "next";
import { getSitePage } from "@/lib/cms";
import { AboutClient } from "./AboutClient";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("about");
  return {
    title: page?.seo_title?.replace(/\s*\|\s*YESS Bangladesh.*$/i, "") || "About Us — Leading Institutional Venture Builder",
    description:
      page?.seo_description ||
      "Founded to bridge international engineering standards with Bangladesh's high-growth demographic dividend, accelerating sovereign enterprises across cloud, agritech, and fintech.",
  };
}

export default async function AboutPage() {
  const sitePage = await getSitePage("about");
  return <AboutClient sitePage={sitePage} />;
}
