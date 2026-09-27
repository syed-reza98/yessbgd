"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import type { ReactNode } from "react";

export function AdminLayoutClient({ 
  children,
  initialUser,
}: { 
  children: ReactNode;
  initialUser?: { id: string; email?: string; role?: string | null } | null;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage && !initialUser) {
      router.push("/admin/login");
    }
  }, [isLoginPage, initialUser, router]);

  if (isLoginPage) {
    return <div className="admin-scope min-h-screen bg-slate-50 text-slate-900">{children}</div>;
  }

  if (!initialUser) {
    return (
      <div className="admin-scope min-h-screen bg-slate-50 flex items-center justify-center text-slate-600 text-xs font-mono">
        Verifying sovereign credentials...
      </div>
    );
  }

  return <AdminShell initialUserEmail={initialUser.email}>{children}</AdminShell>;
}

