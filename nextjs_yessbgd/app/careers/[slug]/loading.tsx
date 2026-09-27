import { Loader2 } from "lucide-react";

export default function CareerDetailLoading() {
  return (
    <div className="space-y-12 pb-20 animate-pulse">
      {/* Top Banner Skeleton */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 py-14 sm:py-18 overflow-hidden border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-36 bg-slate-200 rounded-full mb-6" />
          <div className="flex gap-2 mb-4">
            <div className="h-6 w-24 bg-slate-200 rounded-full" />
            <div className="h-6 w-20 bg-slate-200 rounded-full" />
            <div className="h-6 w-36 bg-slate-200 rounded-full" />
          </div>
          <div className="h-10 w-2/3 bg-slate-300 rounded-xl mb-4" />
          <div className="h-5 w-1/2 bg-slate-200 rounded-lg mb-6" />
          <div className="flex gap-4">
            <div className="h-4 w-28 bg-slate-200 rounded" />
            <div className="h-4 w-24 bg-slate-200 rounded" />
            <div className="h-4 w-40 bg-slate-200 rounded" />
          </div>
        </div>
      </section>

      {/* Main 2-Column Skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-2xl p-7 border border-border h-64" />
            <div className="glass-card rounded-2xl p-7 border border-border h-64" />
          </div>
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl p-7 border border-border h-96 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
