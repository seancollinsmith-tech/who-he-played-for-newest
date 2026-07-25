import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { Database } from "@/lib/supabase/database.types";
import { isSupabaseAdminConfigured, isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Server Component / Route Handler client, scoped to the signed-in user via
 * cookies. Returns null when Supabase isn't configured.
 */
export async function getSupabaseServerClient() {
  if (!isSupabaseConfigured()) return null;
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component with no response to write to —
            // safe to ignore when middleware handles session refresh.
          }
        }
      }
    }
  );
}

/**
 * Service-role client for trusted server-only admin operations (bypasses
 * RLS). Never import this from a Client Component. Returns null when the
 * service role key isn't configured.
 */
export function getSupabaseAdminClient() {
  if (!isSupabaseAdminConfigured()) return null;

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    { auth: { persistSession: false } }
  );
}
