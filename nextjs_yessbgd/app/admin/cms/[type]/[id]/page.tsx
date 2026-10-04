import { connection } from "next/server";
import { db } from "@/lib/db";
import {
  cmsVentures,
  cmsServices,
  cmsIndustries,
  cmsInsights,
  cmsOpenings,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { EntityEditorClient } from "./EntityEditorClient";

export const instant = false;

const tableMap: Record<string, any> = {
  ventures: cmsVentures,
  services: cmsServices,
  industries: cmsIndustries,
  insights: cmsInsights,
  openings: cmsOpenings,
};

export default async function EntityEditorPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  await connection();
  const { type, id } = await params;
  const isNew = id === "new";

  let initialData: any = null;

  if (!isNew) {
    const table = tableMap[type] || cmsVentures;
    const [data] = await db
      .select()
      .from(table)
      .where(eq(table.slug, id))
      .limit(1);

    initialData = data || null;
  }

  return <EntityEditorClient type={type} id={id} initialData={initialData} />;
}
