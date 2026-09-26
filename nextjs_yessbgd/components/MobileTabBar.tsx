"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Layers, Building2, Mail } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

type Tab = {
  href: string;
  key: string;
  icon: typeof Home;
  exact?: boolean;
  match?: string[];
};

const tabs: Tab[] = [
  { href: "/", key: "home", icon: Home, exact: true },
  { href: "/ventures", key: "ventures", icon: Layers, match: ["/ventures"] },
  { href: "/services", key: "services", icon: Briefcase },
  { href: "/about", key: "about", icon: Building2 },
  { href: "/contact", key: "contact", icon: Mail },
];

export function MobileTabBar() {
  const { t } = useLanguage();
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary Mobile Navigation"
      className="lg:hidden fixed inset-x-0 bottom-0 z-50 pointer-events-none pb-[env(safe-area-inset-bottom)]"
    >
      <div className="pointer-events-auto mx-auto max-w-md px-3 pb-3 pt-1">
        <ul className="glass-card-strong rounded-2xl flex items-stretch justify-between px-1.5 py-1.5 shadow-2xl backdrop-blur-xl border border-white/40">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const matches = tab.match ?? [tab.href];
            const isActive = tab.exact
              ? pathname === tab.href
              : matches.some((m) => pathname === m || pathname.startsWith(m + "/"));

            return (
              <li key={tab.href} className="flex-1">
                <Link
                  href={tab.href}
                  aria-label={t(`nav.${tab.key}`)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 min-h-[48px] text-[11px] font-semibold tracking-tight transition-all active:scale-95 ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-1 -z-10 rounded-xl bg-primary/10 border border-primary/20"
                      aria-hidden="true"
                    />
                  )}
                  <Icon
                    className={`h-5 w-5 transition-transform ${
                      isActive ? "text-primary scale-110" : "text-foreground/60"
                    }`}
                    strokeWidth={isActive ? 2.3 : 1.8}
                  />
                  <span>{t(`nav.${tab.key}`)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
