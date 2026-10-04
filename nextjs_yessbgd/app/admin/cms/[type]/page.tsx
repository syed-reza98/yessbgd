import { connection } from "next/server";
import { db } from "@/lib/db";
import {
  cmsVentures,
  cmsServices,
  cmsIndustries,
  cmsInsights,
  cmsOpenings,
} from "@/lib/db/schema";
import { asc, desc } from "drizzle-orm";
import { CollectionListClient } from "./CollectionListClient";

export const instant = false;

const tableMap: Record<string, any> = {
  ventures: cmsVentures,
  services: cmsServices,
  industries: cmsIndustries,
  insights: cmsInsights,
  openings: cmsOpenings,
};

export default async function CollectionListPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  await connection();
  const { type } = await params;
  const table = tableMap[type] || cmsVentures;

  const data = await db
    .select()
    .from(table)
    .orderBy(table.sortOrder ? asc(table.sortOrder) : desc(table.createdAt));

  return <CollectionListClient type={type} initialItems={data || []} />;
}
