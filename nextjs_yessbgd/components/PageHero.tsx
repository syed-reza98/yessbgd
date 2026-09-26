import { type ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  variant = "dark",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  variant?: "light" | "dark";
}) {
  if (variant === "dark") {
    return (
      <section className="relative overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16 bg-[#061a1b] text-white border-b border-white/10">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#008744_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#008744]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#d4a359]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container-tight relative max-w-4xl text-center z-10">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#d4a359]/40 text-[#d4a359] text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#d4a359] animate-pulse" />
              <span>{eyebrow}</span>
            </div>
          )}
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-16 bg-gradient-to-b from-muted/30 via-background to-background border-b border-border">
      <div className="container-tight relative max-w-4xl text-center z-10">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{eyebrow}</span>
          </div>
        )}
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-foreground/75 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
