import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { CollectionListClient } from "./CollectionListClient";

export const instant = false;

export default async function CollectionListPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  await connection();
  const { type } = await params;
  const tableName = `cms_${type}`;
  const supabase = await createClient();

  const { data } = await supabase
    .from(tableName)
    .select("*")
    .order("sort_order", { ascending: true });

  return <CollectionListClient type={type} initialItems={data || []} />;
}
