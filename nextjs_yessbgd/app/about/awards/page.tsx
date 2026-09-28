import type { Metadata } from "next";
import { getSitePage } from "@/lib/cms";
import { AwardsClient } from "./AwardsClient";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("about-awards");
  return {
    title: page?.seo_title?.replace(/\s*\|\s*YESS Bangladesh$/i, "") || "Awards & Certifications",
    description:
      page?.seo_description ||
      page?.hero_subtitle ||
      "Awards, accreditations, and global certifications validating institutional delivery excellence at YESS Bangladesh.",
  };
}

export default async function AwardsPage() {
  const sitePage = await getSitePage("about-awards");
  return <AwardsClient sitePage={sitePage} />;
}
