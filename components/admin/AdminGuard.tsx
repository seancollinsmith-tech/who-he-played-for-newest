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
        <p className="mono text-sm uppercase tracking-widest text-[#423920]/50">
          Checking admin access…
        </p>
      </div>
    );
  }

  if (!allowed) {
    return (
      <section className="mx-auto max-w-md rounded-[2rem] border-2 border-[#112f54]/15 bg-[#f7efdc]/75 p-6 shadow-card sm:p-8">
        <h1 className="display text-3xl font-black uppercase text-[#112f54]">Admin Access</h1>

        {supabase ? (
          <p className="mt-4 text-sm leading-6 text-[#423920]/80">
            You need to be signed in with an admin account to view this page.
            Sign in, then ask an existing admin to grant your account access
            via <code className="rounded bg-white px-1 py-0.5">profiles.is_admin</code>.
          </p>
        ) : (
          <>
            <p className="mt-4 text-sm leading-6 text-[#423920]/80">
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
                className="w-full rounded-2xl border-2 border-[#112f54]/20 bg-white px-4 py-3 text-[#112f54] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee5a1f]"
              />
              {error && <p className="text-sm font-bold text-[#bd2c2c]">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-2xl bg-[#112f54] px-5 py-3 font-black uppercase tracking-wider text-white"
              >
                Unlock Admin
              </button>
              <p className="text-xs text-[#423920]/50">Hint: it's the site name, lowercase, no spaces.</p>
            </form>
          </>
        )}
      </section>
    );
  }

  return <>{children}</>;
}
