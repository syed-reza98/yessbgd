import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { AdminLayoutClient } from "./AdminLayoutClient";
import { createClient } from "@/lib/supabase/server";

export const instant = false;

export const metadata: Metadata = {
  title: "Admin Executive Console",
  description: "Sovereign Content Management and Operations Console",
  robots: { index: false, follow: false },
};

async function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  await connection();
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

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
          Loading Admin Console...
        </div>
      }
    >
      <AdminAuthWrapper>{children}</AdminAuthWrapper>
    </Suspense>
  );
}

