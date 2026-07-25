# Who He Played For

A daily NBA career-path guessing game, built for **SpannerSports**. Pick every
current NBA franchise a player appeared for in an official regular-season or
playoff game — three wrong guesses and it's over.

This is a full Next.js application: real game logic, a player/franchise
database, an admin verification-and-publishing workflow, local persistence
for anonymous players, and optional Supabase-backed accounts. It runs in
**demo mode** out of the box (no setup required) and upgrades automatically
once you add Supabase credentials.

## Quick start

You'll need [Node.js](https://nodejs.org) 18.17 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. That's it — the game, streaks, and admin area
all work immediately using your browser's local storage as the database.

To check that everything compiles cleanly before deploying:

```bash
npm run build
```

## What's included

- **Daily Game** (`/`) — one puzzle per calendar day, same for everyone,
  persists across refreshes, can't be replayed for a new score once
  completed.
- **Practice Mode** (`/practice`) — unlimited replays of any verified
  puzzle, doesn't touch your daily streak.
- **Archive** (`/archive`) — browse and replay past/available puzzles.
- **Statistics** (`/statistics`) — streaks, win rate, average score,
  perfect games.
- **How to Play** (`/how-to-play`) — full rules and scoring reference.
- **Admin** (`/admin`) — create/edit players, manage career stops, set
  verification status, and schedule/publish the daily rotation.
- **Sign In** (`/sign-in`) — Supabase email magic-link auth (optional).

## Demo mode vs. Supabase mode

The app checks for Supabase environment variables at startup:

- **Not set (default):** everything — game progress, streaks, and the
  admin player database — lives in the browser's `localStorage`. Nothing
  is shared between devices or visitors. This is the fastest way to try
  the whole app, including the admin workflow, with zero setup.
- **Set:** the daily puzzle is read from Supabase (`daily_games` +
  `players` + `player_team_history`), and once a user signs in, their
  results and streak sync through Supabase (`game_results`,
  `user_statistics`) instead of local storage. The admin dashboard still
  currently reads/writes to local storage for the CRUD workflow — wire up
  `lib/supabase/queries.ts` writes (see comments in
  `lib/storage/adminStore.ts`) if you want the admin panel itself to write
  through to Supabase.

## Connecting Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql`, then optionally
   `supabase/seed_players.sql` for the three sample puzzles.
3. Copy `.env.example` to `.env.local` and fill in:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   ```

   The first two come from Project Settings → API. The service role key is
   also on that page — **never** expose it to the browser or commit it;
   it's only read server-side.
4. To make your account an admin after signing up once through `/sign-in`:

   ```sql
   update profiles set is_admin = true where username = 'you@example.com';
   ```

5. Restart `npm run dev`. The app will now read the published daily puzzle
   from Supabase, falling back to the local rotation only if no puzzle has
   been published for today.

## Adding and verifying new players

Whether you're using demo mode or Supabase, the shape is the same
(`lib/types.ts`):

- Go to `/admin` (demo-mode passcode: `spannersports` — change this in
  `components/admin/AdminGuard.tsx` or switch to Supabase auth before any
  real deployment).
- **New Player** to create one, or click a player to edit.
- Add each **career stop**: team, the name it went by at the time, first
  and last season, games played, and whether it's *answer eligible*.
  Uncheck answer-eligible for stops that shouldn't count (drafted-but-
  traded, signed-but-never-appeared, etc.) — don't delete them, since
  keeping the row with eligibility off documents *why* it doesn't count.
- Write all three hints, from most to least obvious.
- Set **verification status**. A puzzle can only be **published** to the
  daily schedule once it's marked **Verified** — this is enforced both in
  the UI and, if you're on Supabase, at the database level.
- Once verified, go to `/admin/schedule` to assign it to a date and
  publish it.

Only count a franchise when the player appeared in at least one official
NBA regular-season or playoff game for it. Do not invent or guess at
history — leave a player `unverified` with notes in `sourceNotes` /
`verificationNotes` until someone has checked it against a reliable source
(Basketball-Reference, NBA.com stats, etc.).

## Where the daily game is scheduled

`lib/game/daily.ts` computes a deterministic local rotation from
`EPOCH_DATE` (`2026-07-25` = Game #1) through the verified players in
`lib/data/players.ts`, so the game always has *something* to show even
with zero setup. Once Supabase is connected and a `daily_games` row is
published for a given date (via `/admin/schedule`), that takes priority —
see `getPublishedDailyGame` in `lib/supabase/queries.ts`.

## Changing branding, colors, and rules

- **Colors & fonts:** CSS variables in `app/globals.css` (`--cream`,
  `--navy`, `--orange`, `--gold`, `--green`, `--red`) and the `display` /
  `mono` font stacks in `tailwind.config.ts`.
- **Team colors/order:** `lib/data/teams.ts` (and mirror in
  `supabase/schema.sql` if you're on Supabase).
- **Scoring rules:** `lib/game/scoring.ts` — starting score, per-mistake
  and per-hint penalties, max mistakes, max hints.
- **Copy/branding text:** `components/Header.tsx`,
  `components/HowToPlayModal.tsx`, `app/how-to-play/page.tsx`, and
  `app/layout.tsx` (site title/description and the NBA-affiliation
  disclaimer — keep that disclaimer, it's there deliberately).

## Project structure

```
app/                 Routes (App Router)
components/           Shared UI + game engine (GameBoard.tsx is the core)
components/admin/     Admin-only UI (player form, career stop editor, guard)
lib/data/             Seed data: 30 teams, sample players
lib/game/             Pure game logic: scoring, daily rotation, sharing
lib/storage/          Local-storage persistence (progress, streaks, admin demo DB)
lib/supabase/         Supabase clients, typed schema, query helpers
supabase/             SQL schema + seed data
```

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Keep the default Next.js build settings.
4. If you're using Supabase, add the three environment variables from
   `.env.example` in the Vercel project settings before deploying.
5. Deploy. The app works with or without those variables set.

## Accessibility notes

Keyboard navigation and visible focus rings work throughout; team-card
state is conveyed with icons and text as well as color; motion respects
`prefers-reduced-motion`; live regions announce guess results and score
changes for screen readers.

## Legal

This is an independent fan project. It is not affiliated with, endorsed
by, or sponsored by the NBA or any NBA team, and it does not use official
NBA logos or artwork — team cards are original text-based marks.
