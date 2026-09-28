"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo, type ReactNode } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Briefcase,
  Mail,
  ShieldCheck,
  Database,
  Layers,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Globe,
  ListTree,
  Image as ImageIcon,
  Settings,
  Search,
  Bell,
  Sparkles,
  Users,
  ExternalLink,
  Sliders,
  History,
} from "lucide-react";

type NavLeaf = {
  label: string;
  labelBn: string;
  to: string;
  badge?: string;
  icon?: typeof LayoutDashboard;
};

type NavGroup = {
  title: string;
  titleBn: string;
  icon: typeof LayoutDashboard;
  to?: string;
  items?: NavLeaf[];
};

function buildNav(): NavGroup[] {
  return [
    { title: "Dashboard", titleBn: "ড্যাশবোর্ড", icon: LayoutDashboard, to: "/admin" },
    { title: "Site Pages", titleBn: "পেইজ ম্যানেজার", icon: FileText, to: "/admin/pages" },
    {
      title: "Content CMS",
      titleBn: "কনটেন্ট সিএমএস",
      icon: Database,
      items: [
        { label: "All Content", labelBn: "সব কনটেন্ট", to: "/admin/cms", icon: Database },
        { label: "Ventures (13)", labelBn: "ভেঞ্চার", to: "/admin/cms/ventures", icon: Briefcase },
        { label: "Services (6)", labelBn: "সার্ভিস", to: "/admin/cms/services", icon: Layers },
        { label: "Industries (8)", labelBn: "ইন্ডাস্ট্রি", to: "/admin/cms/industries", icon: Globe },
        { label: "Insights & Articles", labelBn: "ইনসাইট ও ব্লগ", to: "/admin/cms/insights", icon: FileText },
        { label: "Job Openings", labelBn: "চাকরির পদ", to: "/admin/cms/openings", icon: Users },
      ],
    },
    {
      title: "Appearance",
      titleBn: "অ্যাপিয়ারেন্স",
      icon: ListTree,
      items: [
        { label: "Menus & Navigation", labelBn: "মেনু ও নেভিগেশন", to: "/admin/menus", icon: ListTree },
        { label: "Media Gallery", labelBn: "মিডিয়া গ্যালারি", to: "/admin/media", icon: ImageIcon },
      ],
    },
    {
      title: "Operations",
      titleBn: "অপারেশনস",
      icon: Briefcase,
      items: [
        { label: "Job Applications", labelBn: "চাকরির আবেদন", to: "/admin/applications", icon: Users },
        { label: "Inbound Messages", labelBn: "যোগাযোগ বার্তা", to: "/admin/messages", icon: Mail },
      ],
    },
    {
      title: "Governance & Tools",
      titleBn: "টুলস ও ব্যাকআপ",
      icon: Settings,
      items: [
        { label: "Site Settings", labelBn: "সাইট সেটিংস", to: "/admin/settings", icon: Settings },
        { label: "Data Backup & Seed", labelBn: "ডাটা ব্যাকআপ ও সীড", to: "/admin/data", icon: Sliders },
        { label: "Audit Log Trail", labelBn: "অডিট লগ", to: "/admin/audit", icon: History },
      ],
    },
  ];
}

export function AdminShell({
  children,
  initialUserEmail,
}: {
  children: ReactNode;
  initialUserEmail?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(initialUserEmail || "admin@yessbgd.com");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "Content CMS": true,
    Appearance: true,
    Operations: true,
    "Governance & Tools": true,
  });

  const nav = useMemo(() => buildNav(), []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.email) setUserEmail(data.user.email);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const isLeafActive = (to: string) => {
    if (to === "/admin") return pathname === "/admin";
    return pathname === to || pathname.startsWith(to + "/");
  };

  return (
    <div className="admin-scope flex min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#0d6e6e]/15 selection:text-[#0d6e6e]">
      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white border-r border-slate-200 shadow-xs transition-all duration-300 ${
          collapsed ? "w-20" : "w-72"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Brand Bar */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-200">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#008744] to-[#0d6e6e] flex items-center justify-center font-bold text-white shadow-sm shrink-0">
              Y
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate text-left">
                <span className="font-extrabold text-sm tracking-tight text-slate-900">YESS ADMIN</span>
                <span className="text-[10px] text-teal-700 font-bold tracking-wider uppercase">Sovereign Console</span>
              </div>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
          {nav.map((group) => {
            const GroupIcon = group.icon;
            if (group.to) {
              const active = isLeafActive(group.to);
              return (
                <div key={group.title}>
                  <Link
                    href={group.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? "bg-[#0d6e6e] text-white shadow-md shadow-[#0d6e6e]/20 font-semibold"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <GroupIcon className={`w-5 h-5 shrink-0 ${active ? "text-emerald-200" : "text-slate-500"}`} />
                    {!collapsed && <span>{group.title}</span>}
                  </Link>
                </div>
              );
            }

            const isOpen = openGroups[group.title] ?? true;

            return (
              <div key={group.title} className="space-y-1">
                {!collapsed ? (
                  <button
                    onClick={() =>
                      setOpenGroups((prev) => ({ ...prev, [group.title]: !isOpen }))
                    }
                    className="w-full flex items-center justify-between px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <span>{group.title}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </button>
                ) : (
                  <div className="h-px bg-slate-200 my-2" />
                )}

                {(isOpen || collapsed) && (
                  <div className="space-y-1 pt-1">
                    {group.items?.map((item) => {
                      const ItemIcon = item.icon || GroupIcon;
                      const active = isLeafActive(item.to);

                      return (
                        <Link
                          key={item.to}
                          href={item.to}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm transition-all ${
                            active
                              ? "bg-teal-50 text-teal-800 font-bold border border-teal-200/80 shadow-xs"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium"
                          }`}
                          title={collapsed ? item.label : undefined}
                        >
                          <ItemIcon className={`w-4 h-4 shrink-0 ${active ? "text-teal-700" : "text-slate-400"}`} />
                          {!collapsed && <span className="truncate">{item.label}</span>}
                          {!collapsed && item.badge && (
                            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold border border-slate-200">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Quick Links & Profile */}
        <div className="p-3 border-t border-slate-200 space-y-2 bg-slate-50/70">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-teal-700" />
            {!collapsed && <span>View Public Site</span>}
          </Link>
          <div className="flex items-center justify-between px-3 py-2 bg-white rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2.5 truncate">
              <div className="h-7 w-7 rounded-lg bg-[#0d6e6e] text-white flex items-center justify-center font-bold text-xs shrink-0">
                A
              </div>
              {!collapsed && (
                <div className="truncate flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 truncate">{userEmail}</span>
                  <span className="text-[10px] text-teal-700 font-semibold">Super Admin</span>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? "lg:pl-20" : "lg:pl-72"}`}>
        {/* Top Navbar */}
        <header className="h-16 sticky top-0 z-30 flex items-center justify-between px-6 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">YESS Console</span>
              <span>/</span>
              <span className="text-teal-700 font-bold capitalize">
                {pathname.replace("/admin", "").replace("/", "") || "Overview"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 text-xs text-emerald-800 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>PostgreSQL 17.6 Live</span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs px-3.5 py-1.5 bg-teal-50 text-teal-800 font-bold border border-teal-200/80 rounded-xl hover:bg-teal-100 transition-all shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
