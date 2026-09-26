import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { PageEditorClient } from "./PageEditorClient";

export default async function PageEditorPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
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
