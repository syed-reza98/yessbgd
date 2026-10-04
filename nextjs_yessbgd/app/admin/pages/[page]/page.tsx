import { notFound } from "next/navigation";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { cmsSitePages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PageEditorClient } from "./PageEditorClient";

export const instant = false;

export default async function PageEditorPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  await connection();
  const { page } = await params;
  const [data] = await db
    .select()
    .from(cmsSitePages)
    .where(eq(cmsSitePages.page, page))
    .limit(1);

  if (!data) {
    notFound();
  }

  return <PageEditorClient initialPage={data} />;
}
