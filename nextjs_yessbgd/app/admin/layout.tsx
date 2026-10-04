import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { AdminLayoutClient } from "./AdminLayoutClient";
import { auth } from "@/auth";

export const instant = false;

export const metadata: Metadata = {
  title: "Admin Executive Console",
  description: "Sovereign Content Management and Operations Console",
  robots: { index: false, follow: false },
};

async function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  await connection();
  const session = await auth();
  const user = session?.user;

  return (
    <AdminLayoutClient
      initialUser={
        user
          ? {
              id: (user as any).id || "admin",
              email: user.email || undefined,
              role: (user as any).role || "admin",
            }
          : null
      }
    >
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
