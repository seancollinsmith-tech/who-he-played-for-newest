"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const supabase = getSupabaseBrowserClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setStatus("sending");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined }
    });
    setStatus(error ? "error" : "sent");
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <div className="game-shell">
        <Header streak={0} />

        <section className="mx-auto max-w-md rounded-[2rem] border-2 border-white/10 bg-[#14152c]/80 p-6 shadow-card backdrop-blur sm:p-8">
          <h1 className="display text-3xl font-black uppercase text-[#f5f5ff]">Sign In</h1>

          {!supabase ? (
            <div className="mt-4 rounded-2xl bg-white/5 p-4 text-sm leading-6 text-[#c7c6e0]/80">
              <p>
                Accounts aren&rsquo;t configured for this deployment yet.
                You&rsquo;re playing in demo mode — your streak and stats are
                saved locally in this browser.
              </p>
              <p className="mt-2">
                To enable accounts, set the Supabase environment variables
                described in <code className="rounded bg-[#1c1d3a] px-1 py-0.5">.env.example</code>.
              </p>
            </div>
          ) : status === "sent" ? (
            <p className="mt-4 rounded-2xl bg-[#22e584]/10 p-4 text-sm font-bold text-[#22e584]">
              Check your email for a sign-in link.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-bold text-[#f5f5ff]">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border-2 border-white/15 bg-[#1c1d3a] px-4 py-3 text-[#f5f5ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc93c]"
                  placeholder="you@example.com"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-2xl bg-[#123e91] px-5 py-3 font-black uppercase tracking-wider text-white transition disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc93c]"
              >
                {status === "sending" ? "Sending link…" : "Send Sign-In Link"}
              </button>
              {status === "error" && (
                <p className="text-sm font-bold text-[#ff3358]">
                  Something went wrong sending that link. Please try again.
                </p>
              )}
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
