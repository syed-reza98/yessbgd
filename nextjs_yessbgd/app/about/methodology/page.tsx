import type { Metadata } from "next";
import { getSitePage } from "@/lib/cms";
import { MethodologyClient } from "./MethodologyClient";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("about-methodology");
  return {
    title: page?.seo_title || "Engineering Methodology | YESS Bangladesh",
    description:
      page?.seo_description ||
      page?.hero_subtitle ||
      "Our four-phase institutional delivery framework: Discover, Design, Deliver, and Managed Support.",
  };
}

export default async function MethodologyPage() {
  const sitePage = await getSitePage("about-methodology");
  return <MethodologyClient sitePage={sitePage} />;
}
