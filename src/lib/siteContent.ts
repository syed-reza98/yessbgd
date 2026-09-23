// Site-wide dynamic content: settings, page sections, menus and media.
// Every hook falls back to sensible defaults so the site never breaks
// when a row is missing.
import { useQuery } from "@tanstack/react-query";

const STALE = 60_000;

/* --------------------------------- settings -------------------------------- */

export type SettingRow = {
  id: string;
  key: string;
  label: string | null;
  group: string | null;
  value: Record<string, unknown> | null;
  sort_order: number | null;
};

export function useSettings() {
  const { data } = useQuery({
    queryKey: ["cms", "settings"],
    staleTime: STALE,
    queryFn: async () => {
      const res = await fetch("/api/cms?resource=settings");
      if (!res.ok) return [];
      return res.json();
    },
  });
  const map: Record<string, Record<string, unknown>> = {};
  for (const row of (data ?? []) as SettingRow[]) {
    map[row.key] = (row.value ?? {}) as Record<string, unknown>;
  }
  return { rows: (data ?? []) as SettingRow[], map };
}

/** Read a single text setting (`{ "text": "..." }` shape) with fallback. */
export function useSettingText(key: string, fallback = ""): string {
  const { map } = useSettings();
  const v = map[key]?.text;
  return typeof v === "string" && v.trim() ? v : fallback;
}

export function useSettingObject(key: string): Record<string, unknown> {
  const { map } = useSettings();
  return map[key] ?? {};
}

/* ------------------------------- page sections ------------------------------ */

export type PageSection = {
  id: string;
  page: string;
  section_key: string;
  sort_order: number | null;
  title: string | null;
  title_bn: string | null;
  subtitle: string | null;
  subtitle_bn: string | null;
  body: string | null;
  body_bn: string | null;
  cta_label: string | null;
  cta_href: string | null;
  image_url: string | null;
  data: Record<string, unknown> | null;
  is_published: boolean | null;
};

export function usePageSections(page: string) {
  const { data } = useQuery({
    queryKey: ["cms", "pages", page],
    staleTime: STALE,
    queryFn: async () => {
      const res = await fetch(`/api/cms?resource=site-page&page=${encodeURIComponent(page)}`);
      if (!res.ok) return [];
      return res.json();
    },
  });
  const rows = (data ? [data] : []) as PageSection[];
  const bySection = new Map(rows.map((r) => [r.section_key, r]));
  return {
    sections: rows,
    section: (key: string) => bySection.get(key),
  };
}

/* ----------------------------------- menus ---------------------------------- */

export type MenuVisibility = "all" | "guest" | "authenticated" | "admin";

export type MenuItem = {
  id: string;
  location: string;
  label: string;
  label_bn: string | null;
  href: string;
  group_label: string | null;
  sort_order: number | null;
  is_external: boolean | null;
  is_published?: boolean | null;
  parent_id?: string | null;
  depth?: number | null;
  icon?: string | null;
  description?: string | null;
  description_bn?: string | null;
  accent?: string | null;
  item_style?: string | null;
  badge?: string | null;
  badge_bn?: string | null;
  visible_to?: MenuVisibility | string | null;
};

export type MenuNode = MenuItem & { children: MenuNode[] };

/** Build a nested tree (unlimited depth) from a flat menu list. */
export function buildMenuTree(items: MenuItem[]): MenuNode[] {
  const map = new Map<string, MenuNode>();
  items.forEach((i) => map.set(i.id, { ...i, children: [] }));
  const roots: MenuNode[] = [];
  map.forEach((node) => {
    const parent = node.parent_id ? map.get(node.parent_id) : undefined;
    if (parent) parent.children.push(node);
    else roots.push(node);
  });
  const sort = (list: MenuNode[]) => {
    list.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    list.forEach((n) => sort(n.children));
  };
  sort(roots);
  return roots;
}

/* ------------------------------- viewer role ------------------------------- */

export type ViewerRole = "guest" | "authenticated" | "admin";

export function useViewerRole(): ViewerRole {
  return "guest";
}

export function canSeeMenuItem(item: MenuItem, role: ViewerRole): boolean {
  const rule = (item.visible_to ?? "all") as MenuVisibility;
  if (rule === "all") return true;
  if (rule === "guest") return role === "guest";
  if (rule === "authenticated") return role !== "guest";
  return role === "admin";
}

export function useMenu(location: "header" | "footer") {
  const role = useViewerRole();
  const { data } = useQuery({
    queryKey: ["cms", "menu", location],
    staleTime: STALE,
    queryFn: async () => {
      const res = await fetch(`/api/cms?resource=menus&location=${location}`);
      if (!res.ok) return [];
      return res.json();
    },
  });
  return ((data ?? []) as MenuItem[]).filter((i) => canSeeMenuItem(i, role));
}

/** Same as useMenu but nested by parent_id. */
export function useMenuTree(location: "header" | "footer") {
  const flat = useMenu(location);
  return buildMenuTree(flat);
}

/* ----------------------------------- media ---------------------------------- */

export type MediaRow = {
  id: string;
  file_name: string;
  url: string;
  path: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  alt_text: string | null;
  folder: string | null;
  created_at: string;
};

export async function signedMediaUrl(path: string): Promise<string> {
  return path.startsWith("/") ? path : `/${path}`;
}

export function useMediaLibrary() {
  return useQuery<MediaRow[]>({
    queryKey: ["cms", "media"],
    staleTime: 10_000,
    queryFn: async () => {
      const res = await fetch("/api/admin/media");
      if (!res.ok) return [];
      return res.json();
    },
  });
}

export async function uploadMedia(file: File, folder = "general", alt = "") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);
  formData.append("alt", alt);

  const res = await fetch("/api/admin/media", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Upload failed");
  }

  return await res.json();
}

export async function deleteMedia(row: MediaRow) {
  const res = await fetch(`/api/admin/media?id=${row.id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Delete failed");
  }
}

