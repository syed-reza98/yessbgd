import { supabase } from "@/lib/supabase/client";
import { EntityEditorClient } from "./EntityEditorClient";

export default async function EntityEditorPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  const { type, id } = await params;
  const isNew = id === "new";

  let initialData: any = null;

  if (!isNew) {
    const tableName = `cms_${type}`;
    const { data } = await supabase
      .from(tableName)
      .select("*")
      .eq("slug", id)
      .maybeSingle();

    initialData = data;
  }

  return <EntityEditorClient type={type} id={id} initialData={initialData} />;
}
