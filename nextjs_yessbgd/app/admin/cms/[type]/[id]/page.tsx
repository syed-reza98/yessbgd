import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { EntityEditorClient } from "./EntityEditorClient";

export const instant = false;

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
    const tableName = `cms_${type}`;
    const supabase = await createClient();
    const { data } = await supabase
      .from(tableName)
      .select("*")
      .eq("slug", id)
      .maybeSingle();

    initialData = data;
  }

  return <EntityEditorClient type={type} id={id} initialData={initialData} />;
}
