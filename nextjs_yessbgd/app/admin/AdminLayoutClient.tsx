"use client";

import { usePathname } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import type { ReactNode } from "react";

export function AdminLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <div className="admin-scope min-h-screen bg-[#061a1b] text-white">{children}</div>;
  }

  return <AdminShell>{children}</AdminShell>;
}
