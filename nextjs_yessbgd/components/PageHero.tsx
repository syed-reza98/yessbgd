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
    <section className="relative overflow-hidden pt-12 pb-12 sm:pt-20 sm:pb-16 bg-gradient-to-b from-[#061a1b]/5 via-background to-background border-b border-border/40">
      <div className="container-tight relative max-w-4xl text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <span>{eyebrow}</span>
          </div>
        )}
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-foreground leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-sm sm:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
