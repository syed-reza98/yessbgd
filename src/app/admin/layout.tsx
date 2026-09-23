"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname.startsWith("/admin/login");
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/role");
        if (!active) return;
        if (res.ok) {
          const data = await res.json();
          setEmail(data.email ?? null);
          if (!data.userId && !isLogin) {
            window.location.href = "/admin/login";
            return;
          }
        } else if (!isLogin) {
          window.location.href = "/admin/login";
          return;
        }
      } catch {
        if (!isLogin) {
          window.location.href = "/admin/login";
          return;
        }
      } finally {
        if (active) setChecked(true);
      }
    })();
    return () => {
      active = false;
    };
  }, [isLogin]);

  if (isLogin) {
    return <>{children}</>;
  }

  if (!checked) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-muted-foreground bg-admin-background">
        Loading…
      </div>
    );
  }

  return <AdminShell email={email}>{children}</AdminShell>;
}
