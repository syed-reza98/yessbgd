import { Suspense } from "react";
import type { Metadata } from "next";
import { ApplicationStatusTracker } from "./ApplicationStatusTracker";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Application Status Tracker | YESS Bangladesh",
  description:
    "Real-time candidate telemetry for engineering, product, and consulting roles across YESS Bangladesh ventures.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ApplicationStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#0d6e6e]" />
          <p className="mt-3 text-xs text-on-surface-variant">Loading sovereign candidate session...</p>
        </div>
      }
    >
      <ApplicationStatusTracker />
    </Suspense>
  );
}
