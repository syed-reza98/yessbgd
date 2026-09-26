import type { Metadata } from "next";
import { AdminLayoutClient } from "./AdminLayoutClient";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Executive Console | YESS Bangladesh",
  description: "Sovereign Content Management and Operations Console",
  robots: { index: false, follow: false },
};

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let role: string | null = null;
  if (user) {
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();
    role = roleData?.role || null;
  }

  return (
    <AdminLayoutClient initialUser={user ? { id: user.id, email: user.email, role } : null}>
      {children}
    </AdminLayoutClient>
  );
}

