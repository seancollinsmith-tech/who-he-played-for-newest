"use client";

import Link from "next/link";
import { useState } from "react";
import { Flame, Menu, Trophy, X } from "lucide-react";

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
    <header className="relative z-50 mb-6 flex items-center justify-between rounded-3xl border-2 border-[#112f54]/15 bg-[#f7efdc]/80 px-4 py-3 backdrop-blur">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((v) => !v)}
        className="rounded-xl p-2 text-[#112f54] transition hover:bg-[#112f54]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee5a1f]"
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      <Link
        href="/"
        className="flex items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee5a1f]"
      >
        <div className="grid h-10 w-10 place-items-center rounded-full bg-[#ee5a1f] text-white">
          <Trophy size={22} aria-hidden="true" />
        </div>
        <div>
          <p className="display text-xl font-black uppercase leading-none text-[#112f54]">
            Who He Played For
          </p>
          <p className="mono text-[10px] uppercase tracking-[0.26em] text-[#423920]/60">
            A SpannerSports Game
          </p>
        </div>
      </Link>

      <div
        className="flex items-center gap-1 rounded-full bg-[#112f54] px-3 py-2 font-bold text-white"
        aria-label={`Current streak: ${streak} days`}
      >
        <Flame size={17} className="text-[#ffbb33]" aria-hidden="true" />
        <span>{streak}</span>
      </div>

      {open && (
        <nav
          id="site-nav"
          aria-label="Primary"
          className="absolute left-0 right-0 top-full z-40 mt-2 rounded-3xl border-2 border-[#112f54]/15 bg-[#f7efdc] p-3 shadow-card"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 font-bold text-[#112f54] transition hover:bg-[#112f54]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee5a1f]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-xl px-4 py-3 text-sm font-bold text-[#423920]/60 transition hover:bg-[#112f54]/10"
              >
                Admin
              </Link>
            </li>
            <li>
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-bold text-[#423920]/60 transition hover:bg-[#112f54]/10"
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
