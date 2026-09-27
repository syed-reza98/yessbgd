"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";
import type { ReactNode } from "react";
import type { CmsMenuItem, CompanySettings } from "@/lib/cms";

interface PublicChromeProps {
  children: ReactNode;
  headerMenus?: CmsMenuItem[];
  footerMenus?: CmsMenuItem[];
  settings?: CompanySettings;
  ventures?: any[];
}

/**
 * PublicChrome renders the sovereign consumer site's Header, Footer, and
 * MobileTabBar exclusively for public-facing corridors.
 * When the user navigates into any /admin route, PublicChrome automatically
 * strips away the public header and footer so the AdminShell and Admin Console
 * occupy the entire viewport with their own bespoke dark glass layout.
 */
export function PublicChrome({
  children,
  headerMenus,
  footerMenus,
  settings,
  ventures,
}: PublicChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <>
      <Header
        headerMenus={headerMenus}
        settings={settings}
        ventures={ventures}
      />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer
        footerMenus={footerMenus}
        settings={settings}
        ventures={ventures}
      />
      <MobileTabBar />
    </>
  );
}

