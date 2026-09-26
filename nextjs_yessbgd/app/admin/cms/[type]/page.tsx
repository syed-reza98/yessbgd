import { supabase } from "@/lib/supabase/client";
import { CollectionListClient } from "./CollectionListClient";

export default async function CollectionListPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const tableName = `cms_${type}`;

  const { data } = await supabase
    .from(tableName)
    .select("*")
    .order("sort_order", { ascending: true });

  return <CollectionListClient type={type} initialItems={data || []} />;
}
