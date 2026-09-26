import { Metadata } from "next";
import { getSitePage, getVentures } from "@/lib/cms";
import { HomeClient } from "./HomeClient";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("home");
  return {
    title: page?.seo_title || "YESS Bangladesh | Sovereign Tech & Venture Studio",
    description:
      page?.seo_description ||
      "Youth Entrepreneurship for smart success with excellence & solutions. Catalyzing sovereign enterprises across software, agritech, media, and logistics in Bangladesh.",
  };
}

export default async function HomePage() {
  const [sitePage, venturesList] = await Promise.all([
    getSitePage("home"),
    getVentures(),
  ]);

  return <HomeClient sitePage={sitePage} initialVentures={venturesList} />;
}
