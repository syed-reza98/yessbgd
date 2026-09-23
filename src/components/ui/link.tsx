"use client";

import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { forwardRef } from "react";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  to?: string;
  params?: Record<string, string | number>;
  search?: Record<string, string | number | boolean | undefined | null>;
  activeProps?: { className?: string; style?: React.CSSProperties };
  activeOptions?: { exact?: boolean };
  preload?: string | boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, to, params, search, children, className, activeProps, activeOptions, style, ...rest },
  ref,
) {
  const pathname = usePathname();
  let target = href || to || "/";

  // Interpolate route params if provided (e.g. /admin/cms/$type/$id)
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      target = target.replace(`$${k}`, encodeURIComponent(String(v)));
      target = target.replace(`[${k}]`, encodeURIComponent(String(v)));
    }
  }

  // Append search params if provided
  if (search && Object.keys(search).length > 0) {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(search)) {
      if (v !== undefined && v !== null && v !== "") {
        sp.set(k, String(v));
      }
    }
    const q = sp.toString();
    if (q) {
      target = target.includes("?") ? `${target}&${q}` : `${target}?${q}`;
    }
  }

  const isExact = activeOptions?.exact ?? false;
  const isActive = isExact
    ? pathname === target
    : target === "/"
      ? pathname === "/"
      : pathname === target || pathname.startsWith(target + "/");

  let mergedClassName = className || "";
  let mergedStyle = style;

  if (isActive && activeProps) {
    if (activeProps.className) {
      mergedClassName = `${mergedClassName} ${activeProps.className}`.trim();
    }
    if (activeProps.style) {
      mergedStyle = { ...mergedStyle, ...activeProps.style };
    }
  }

  return (
    <NextLink ref={ref} href={target} className={mergedClassName} style={mergedStyle} {...(rest as any)}>
      {children}
    </NextLink>
  );
});

export function useRouterState(): { location: { pathname: string } };
export function useRouterState<T>(opts: { select: (s: { location: { pathname: string } }) => T }): T;
export function useRouterState<T>(opts?: { select?: (s: { location: { pathname: string } }) => T }): { location: { pathname: string } } | T {
  const pathname = usePathname() || "";
  const state = { location: { pathname } };
  if (opts?.select) return opts.select(state);
  return state;
}

export function useLocation(): { pathname: string };
export function useLocation<T>(opts: { select: (l: { pathname: string }) => T }): T;
export function useLocation<T>(opts?: { select?: (l: { pathname: string }) => T }): { pathname: string } | T {
  const pathname = usePathname() || "";
  if (opts?.select) return opts.select({ pathname });
  return { pathname };
}

export const useNavigate = () => {
  const router = useRouter();
  return (to: string | { to: string; search?: Record<string, any> }) => {
    if (typeof to === "string") {
      router.push(to);
      return;
    }
    let dest = to.to;
    if (to.search && Object.keys(to.search).length > 0) {
      const sp = new URLSearchParams();
      for (const [k, v] of Object.entries(to.search)) {
        if (v !== undefined && v !== null && v !== "") {
          sp.set(k, String(v));
        }
      }
      const q = sp.toString();
      if (q) {
        dest = dest.includes("?") ? `${dest}&${q}` : `${dest}?${q}`;
      }
    }
    router.push(dest);
  };
};

export const useParams = (_opts?: any) => {
  return {} as Record<string, string>;
};
