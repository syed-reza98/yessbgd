import type { Metadata } from "next";
import { getSitePage } from "@/lib/cms";
import { LeadershipClient } from "./LeadershipClient";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("about-leadership");
  return {
    title: page?.seo_title || "Leadership & Governance | YESS Bangladesh",
    description:
      page?.seo_description ||
      page?.hero_subtitle ||
      "A multidisciplinary executive leadership council uniting sovereign venture strategy, distributed systems engineering, and nationwide operational resilience.",
  };
}

export default async function LeadershipPage() {
  const sitePage = await getSitePage("about-leadership");
  return <LeadershipClient sitePage={sitePage} />;
}
