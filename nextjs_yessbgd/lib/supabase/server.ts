import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Creates an authenticated Supabase client for Server Components,
 * Server Actions, and Route Handlers in Next.js 16 App Router.
 * Handles the asynchronous `await cookies()` model introduced in modern Next.js.
 */
export async function createClient(options?: { useCookies?: boolean }) {
  let cookieStore: any = null;
  if (options?.useCookies !== false) {
    try {
      cookieStore = await cookies();
    } catch {
      // Cookies not accessible (e.g. inside 'use cache' or static generation)
      cookieStore = null;
    }
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore ? cookieStore.getAll() : [];
        },
        setAll(cookiesToSet) {
          if (!cookieStore) return;
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored because proxy.ts handles session token refreshes.
          }
        },
      },
    }
  );
}

