"use client";

import { Suspense, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";
import type { CmsMenuItem, CompanySettings } from "@/lib/cms";

interface PublicChromeProps {
  children: ReactNode;
  headerMenus?: CmsMenuItem[];
  footerMenus?: CmsMenuItem[];
  settings?: CompanySettings;
  ventures?: any[];
}

function HeaderWrapper({
  headerMenus,
  settings,
  ventures,
}: {
  headerMenus?: CmsMenuItem[];
  settings?: CompanySettings;
  ventures?: any[];
}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <Header headerMenus={headerMenus} settings={settings} ventures={ventures} />;
}

function FooterWrapper({
  footerMenus,
  settings,
  ventures,
}: {
  footerMenus?: CmsMenuItem[];
  settings?: CompanySettings;
  ventures?: any[];
}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <>
      <Footer footerMenus={footerMenus} settings={settings} ventures={ventures} />
      <MobileTabBar />
    </>
  );
}

/**
 * PublicChrome renders the sovereign consumer site's Header, Footer, and
 * MobileTabBar exclusively for public-facing corridors.
 * When the user navigates into any /admin route, HeaderWrapper and FooterWrapper
 * automatically return null so the AdminShell and Admin Console occupy the entire
 * viewport with their own bespoke dark glass layout.
 */
export function PublicChrome({
  children,
  headerMenus,
  footerMenus,
  settings,
  ventures,
}: PublicChromeProps) {
  return (
    <>
      <Suspense fallback={null}>
        <HeaderWrapper
          headerMenus={headerMenus}
          settings={settings}
          ventures={ventures}
        />
      </Suspense>
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Suspense fallback={null}>
        <FooterWrapper
          footerMenus={footerMenus}
          settings={settings}
          ventures={ventures}
        />
      </Suspense>
    </>
  );
}

