"use client";

import Link from "next/link";
import { useState } from "react";
import { Flame, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Daily Game" },
  { href: "/practice", label: "Practice Mode" },
  { href: "/archive", label: "Archive" },
  { href: "/statistics", label: "Statistics" },
  { href: "/how-to-play", label: "How to Play" }
];

export function Header({ streak }: { streak: number }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 mb-6 flex items-center justify-between rounded-3xl border-2 border-white/10 bg-[#14152c]/85 px-4 py-3 backdrop-blur">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((v) => !v)}
        className="rounded-xl p-2 text-[#f5f5ff] transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc93c]"
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      <Link
        href="/"
        className="flex items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc93c]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/branding/spanner-sports-logo.png"
          alt="SpannerSports"
          className="h-9 w-auto sm:h-11"
        />
        <p className="display text-xl font-black uppercase leading-none text-[#f5f5ff] sm:text-2xl">
          Who He Played For
        </p>
      </Link>

      <div
        className="flex items-center gap-1 rounded-full bg-[#123e91] px-3 py-2 font-bold text-white"
        aria-label={`Current streak: ${streak} days`}
      >
        <Flame size={17} className="text-[#ffc93c]" aria-hidden="true" />
        <span>{streak}</span>
      </div>

      {open && (
        <nav
          id="site-nav"
          aria-label="Primary"
          className="absolute left-0 right-0 top-full z-40 mt-2 rounded-3xl border-2 border-white/10 bg-[#14152c] p-3 shadow-card"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 font-bold text-[#f5f5ff] transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc93c]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-xl px-4 py-3 text-sm font-bold text-[#c7c6e0]/60 transition hover:bg-white/10"
              >
                Admin
              </Link>
            </li>
            <li>
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-bold text-[#c7c6e0]/60 transition hover:bg-white/10"
              >
                Sign In
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
