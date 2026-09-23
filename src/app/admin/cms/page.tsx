"use client";

import { useEffect, useState } from "react";
import { Link } from "@/components/ui/link";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { CMS_TYPES } from "@/lib/cmsSchema";
import { AdminLoadingState } from "@/components/admin/AdminLoading";
import { syncStaticContentToCms } from "@/lib/dynamicContent";
import { ArrowRight, Database, FileText, Briefcase, Layers } from "lucide-react";

const ICONS: Record<string, typeof Database> = {
  ventures: Briefcase,
  services: Layers,
  industries: Database,
  insights: FileText,
};

export default function AdminCmsIndex() {
  const [ready, setReady] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/overview");
        if (!res.ok) {
          if (res.status === 401) {
            window.location.href = "/admin/login";
            return;
          }
        }
        const data = await res.json();
        setCounts(data.cmsCounts || {});
      } catch {
        // ignore
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (!ready) return <AdminLoadingState />;

  return (
    <>
      <AdminPageHeader title="Content management" description="ভেঞ্চার, সার্ভিস, ইন্ডাস্ট্রি ও ইনসাইট — সরাসরি ডাটাবেজ থেকে সম্পাদনা করুন।" />
      <section>
        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(CMS_TYPES).map(([key, cfg]) => {
              const Icon = ICONS[key] ?? Database;
              return (
                <Link
                  key={key}
                  to="/admin/cms/$type"
                  params={{ type: key }}
                  className="group rounded-2xl glass-card p-6 transition hover:shadow-glow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-base font-semibold">{cfg.label}</div>
                        <div className="text-xs text-muted-foreground">{cfg.labelBn}</div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {counts[key] ?? "—"} items
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{cfg.description}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Manage <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-8 rounded-2xl glass-card p-6">
            <div className="text-sm font-semibold">Static content → database</div>
            <p className="mt-1 text-xs text-muted-foreground">
              সাইটের বিল্ট-ইন কনটেন্ট (১২ ভেঞ্চার, সার্ভিস, ইন্ডাস্ট্রি, ইনসাইট) ডাটাবেজে আমদানি করুন।
              এরপর সব পেজ ডাটাবেজ থেকেই রেন্ডার হবে এবং এখান থেকেই সম্পাদনা করা যাবে।
            </p>
            <button
              onClick={async () => {
                setSyncing(true);
                setSyncMsg(null);
                try {
                  const r = await syncStaticContentToCms();
                  setSyncMsg(
                    `✓ Imported — ventures ${r.ventures}, services ${r.services}, industries ${r.industries}, insights ${r.insights}`,
                  );
                } catch (e) {
                  setSyncMsg(`✗ ${(e as Error).message}`);
                } finally {
                  setSyncing(false);
                }
              }}
              disabled={syncing}
              className="mt-4 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
            >
              {syncing ? "Importing…" : "Import / sync static content"}
            </button>
            {syncMsg && <p className="mt-3 text-xs text-muted-foreground">{syncMsg}</p>}
          </div>

        </div>
      </section>
    </>
  );
}
