import { notFound } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PageEditorClient } from "./PageEditorClient";

export const instant = false;

export default async function PageEditorPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  await connection();
  const { page } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("cms_site_pages")
    .select("*")
    .eq("page", page)
    .maybeSingle();

  if (!data) {
    notFound();
  }

  return <PageEditorClient initialPage={data} />;
}
