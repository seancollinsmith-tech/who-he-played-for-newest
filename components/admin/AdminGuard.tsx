"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { readJSON, writeJSON } from "@/lib/storage/local";

const DEMO_UNLOCK_KEY = "admin-demo-unlocked";
// Demo-mode only. Not secure — configure Supabase admin auth for production.
const DEMO_PASSCODE = "spannersports";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const supabase = getSupabaseBrowserClient();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function check() {
      if (supabase) {
        const {
          data: { user }
        } = await supabase.auth.getUser();

        if (!user) {
          if (active) {
            setAllowed(false);
            setChecking(false);
          }
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", user.id)
          .maybeSingle<{ is_admin: boolean }>();

        if (active) {
          setAllowed(Boolean(profile?.is_admin));
          setChecking(false);
        }
        return;
      }

      // Demo mode fallback.
      const unlocked = readJSON<boolean>(DEMO_UNLOCK_KEY, false);
      if (active) {
        setAllowed(unlocked);
        setChecking(false);
      }
    }

    check();
    return () => {
      active = false;
    };
  }, [supabase]);

  function handleDemoUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (passcode === DEMO_PASSCODE) {
      writeJSON(DEMO_UNLOCK_KEY, true);
      setAllowed(true);
      setError("");
    } else {
      setError("Incorrect passcode.");
    }
  }

  if (checking) {
    return (
      <div className="grid min-h-[40vh] place-items-center">
        <p className="mono text-sm uppercase tracking-widest text-[#c7c6e0]/50">
          Checking admin access…
        </p>
      </div>
    );
  }

  if (!allowed) {
    return (
      <section className="mx-auto max-w-md rounded-[2rem] border-2 border-white/10 bg-[#14152c]/80 p-6 shadow-card sm:p-8">
        <h1 className="display text-3xl font-black uppercase text-[#f5f5ff]">Admin Access</h1>

        {supabase ? (
          <p className="mt-4 text-sm leading-6 text-[#c7c6e0]/80">
            You need to be signed in with an admin account to view this page.
            Sign in, then ask an existing admin to grant your account access
            via <code className="rounded bg-[#1c1d3a] px-1 py-0.5">profiles.is_admin</code>.
          </p>
        ) : (
          <>
            <p className="mt-4 text-sm leading-6 text-[#c7c6e0]/80">
              Supabase isn&rsquo;t configured, so this is the demo-mode admin
              gate: local-browser only, protected by a shared passcode. It is
              not secure — configure Supabase for real admin authentication
              before going to production.
            </p>
            <form onSubmit={handleDemoUnlock} className="mt-5 space-y-3">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Demo passcode"
                className="w-full rounded-2xl border-2 border-white/15 bg-[#1c1d3a] px-4 py-3 text-[#f5f5ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc93c]"
              />
              {error && <p className="text-sm font-bold text-[#ff3358]">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-2xl bg-[#123e91] px-5 py-3 font-black uppercase tracking-wider text-white"
              >
                Unlock Admin
              </button>
              <p className="text-xs text-[#c7c6e0]/50">Hint: it's the site name, lowercase, no spaces.</p>
            </form>
          </>
        )}
      </section>
    );
  }

  return <>{children}</>;
}
