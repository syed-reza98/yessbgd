import { type ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16 bg-[#061a1b] text-white border-b border-white/10">
      {/* Ambient Mesh & Glows */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#008744_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#008744]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#d4a359]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container-tight relative max-w-4xl text-center z-10">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#d4a359]/40 text-[#d4a359] text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
            <span>{eyebrow}</span>
          </div>
        )}
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-5xl tracking-tight text-white leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
