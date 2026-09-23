import { useQuery, useQueryClient } from "@tanstack/react-query";

export type DashboardRole = "admin" | "moderator" | "user";

export type Capability =
  | "pages"
  | "content"
  | "media"
  | "menus"
  | "settings"
  | "applications"
  | "messages"
  | "audit";

const CAPABILITIES: Record<DashboardRole, Capability[]> = {
  admin: ["pages", "content", "media", "menus", "settings", "applications", "messages", "audit"],
  moderator: ["applications", "messages"],
  user: ["pages", "content", "media"],
};

export const ROLE_LABEL: Record<DashboardRole, { en: string; bn: string; help: string }> = {
  admin: {
    en: "Administrator",
    bn: "অ্যাডমিনিস্ট্রেটর",
    help: "পুরো ড্যাশবোর্ডে সম্পূর্ণ অ্যাক্সেস।",
  },
  moderator: {
    en: "Operations",
    bn: "অপারেশন টিম",
    help: "চাকরির আবেদন ও যোগাযোগ বার্তা দেখাশোনা করেন।",
  },
  user: {
    en: "Content editor",
    bn: "কনটেন্ট এডিটর",
    help: "পেইজ, কনটেন্ট ও ছবি সম্পাদনা করেন।",
  },
};

/** Highest role held by the signed-in dashboard user. */
export function useDashboardRole() {
  const query = useQuery({
    queryKey: ["admin", "role"],
    staleTime: 60_000,
    queryFn: async (): Promise<{ role: DashboardRole; userId: string | null; email: string | null }> => {
      try {
        const res = await fetch("/api/admin/role");
        if (!res.ok) return { role: "user", userId: null, email: null };
        return await res.json();
      } catch {
        return { role: "user", userId: null, email: null };
      }
    },
  });

  const role = query.data?.role ?? "user";
  return {
    role,
    userId: query.data?.userId ?? null,
    email: query.data?.email ?? null,
    isLoading: query.isLoading,
    can: (cap: Capability) => CAPABILITIES[role].includes(cap),
  };
}

export function roleCan(role: DashboardRole, cap: Capability) {
  return CAPABILITIES[role].includes(cap);
}

/* --------------------------------- profile -------------------------------- */

export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  job_title: string | null;
  avatar_url: string | null;
  language: string;
  theme: string;
  items_per_page: number;
  notify_new_application: boolean;
  notify_new_message: boolean;
  created_at: string;
  updated_at: string;
};

export function useProfile() {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["admin", "profile"],
    staleTime: 60_000,
    queryFn: async (): Promise<Profile | null> => {
      try {
        const res = await fetch("/api/admin/profile");
        if (!res.ok) return null;
        return await res.json();
      } catch {
        return null;
      }
    },
  });

  const save = async (patch: Partial<Profile>) => {
    const res = await fetch("/api/admin/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!res.ok) throw new Error("Failed to save profile");
    await qc.invalidateQueries({ queryKey: ["admin", "profile"] });
  };

  return { profile: query.data ?? null, isLoading: query.isLoading, save };
}
