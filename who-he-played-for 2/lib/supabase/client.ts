"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/database.types";
import { isSupabaseConfigured } from "@/lib/supabase/config";

let cached: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Returns a browser Supabase client, or `null` when env vars aren't set —
 * every call site must handle the null case and fall back to local storage
 * / demo data. This is intentional: the app must run without Supabase.
 */
export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) return null;
  if (cached) return cached;

  cached = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  return cached;
}
