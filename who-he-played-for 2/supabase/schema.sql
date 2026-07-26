-- Who He Played For — Supabase schema
-- Run this in the Supabase SQL editor, or via `supabase db push`.
-- Safe to re-run: every statement is guarded with IF NOT EXISTS / OR REPLACE.

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- profiles: one row per authenticated user, mirrors auth.users
-- ---------------------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ---------------------------------------------------------------------------
-- franchises: stable lineage identity, independent of current branding
-- ---------------------------------------------------------------------------
create table if not exists franchises (
  id text primary key,
  lineage_name text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- teams: the 30 CURRENT selectable franchise identities
-- ---------------------------------------------------------------------------
create table if not exists teams (
  id text primary key,
  franchise_id text not null references franchises (id),
  city text not null,
  name text not null,
  abbreviation text not null unique,
  primary_color text not null,
  secondary_color text not null,
  display_order integer not null unique,
  icon text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_teams_franchise_id on teams (franchise_id);

-- ---------------------------------------------------------------------------
-- players
-- ---------------------------------------------------------------------------
create table if not exists players (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  slug text not null unique,
  image_url text,
  career_start integer not null,
  career_end integer not null,
  career_years_label text not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  active_status boolean not null default false,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'reviewed', 'verified', 'flagged')),
  hints text[] not null,
  source_notes text,
  last_verified_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint hints_has_three check (array_length(hints, 1) = 3)
);

create index if not exists idx_players_verification_status on players (verification_status);
create index if not exists idx_players_slug on players (slug);

-- ---------------------------------------------------------------------------
-- player_team_history: chronological career stops
-- ---------------------------------------------------------------------------
create table if not exists player_team_history (
  id uuid primary key default uuid_generate_v4(),
  player_id uuid not null references players (id) on delete cascade,
  team_id text not null references teams (id),
  franchise_id text not null references franchises (id),
  team_name_used text not null,
  first_season text not null,
  last_season text not null,
  sequence_number integer not null,
  games_played integer not null default 0,
  answer_eligible boolean not null default true,
  verification_notes text,
  created_at timestamptz not null default now(),
  unique (player_id, sequence_number)
);

create index if not exists idx_history_player_id on player_team_history (player_id);
create index if not exists idx_history_team_id on player_team_history (team_id);

-- ---------------------------------------------------------------------------
-- daily_games: the publish schedule
-- ---------------------------------------------------------------------------
create table if not exists daily_games (
  id uuid primary key default uuid_generate_v4(),
  game_number integer not null unique,
  game_date date not null unique,
  player_id uuid not null references players (id),
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_daily_games_date on daily_games (game_date);

-- A player can only be published if verified. Enforced at the app layer for
-- clearer error messages, and backstopped here for data integrity:
create or replace function enforce_verified_before_publish()
returns trigger as $$
begin
  if new.published = true then
    if not exists (
      select 1 from players
      where id = new.player_id and verification_status = 'verified'
    ) then
      raise exception 'Cannot publish a daily game for an unverified player';
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_enforce_verified_before_publish on daily_games;
create trigger trg_enforce_verified_before_publish
  before insert or update on daily_games
  for each row execute procedure enforce_verified_before_publish();

-- ---------------------------------------------------------------------------
-- game_results: one row per user attempt (daily or practice)
-- ---------------------------------------------------------------------------
create table if not exists game_results (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade,
  daily_game_id uuid references daily_games (id),
  player_id uuid not null references players (id),
  mode text not null check (mode in ('daily', 'practice')),
  correct_team_ids text[] not null default '{}',
  wrong_team_ids text[] not null default '{}',
  hints_used integer not null default 0,
  score integer not null default 1000,
  status text not null default 'in_progress'
    check (status in ('in_progress', 'won', 'lost')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  -- one daily attempt per user per daily game — prevents replay-for-score
  unique (user_id, daily_game_id)
);

create index if not exists idx_game_results_user_id on game_results (user_id);
create index if not exists idx_game_results_daily_game_id on game_results (daily_game_id);

-- ---------------------------------------------------------------------------
-- user_statistics: one row per user, updated on daily completion
-- ---------------------------------------------------------------------------
create table if not exists user_statistics (
  user_id uuid primary key references auth.users (id) on delete cascade,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_completed_game_date date,
  total_games_played integer not null default 0,
  total_wins integer not null default 0,
  total_score bigint not null default 0,
  perfect_games integer not null default 0,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table profiles enable row level security;
alter table franchises enable row level security;
alter table teams enable row level security;
alter table players enable row level security;
alter table player_team_history enable row level security;
alter table daily_games enable row level security;
alter table game_results enable row level security;
alter table user_statistics enable row level security;

-- Everyone (including anon) can read reference data and published puzzles.
drop policy if exists "public read franchises" on franchises;
create policy "public read franchises" on franchises for select using (true);

drop policy if exists "public read teams" on teams;
create policy "public read teams" on teams for select using (true);

drop policy if exists "public read published daily games" on daily_games;
create policy "public read published daily games" on daily_games
  for select using (published = true);

-- Players: public can read verified players (needed to render published
-- puzzles + practice archive); admins can read/write everything.
drop policy if exists "public read verified players" on players;
create policy "public read verified players" on players
  for select using (verification_status = 'verified');

drop policy if exists "admin full access players" on players;
create policy "admin full access players" on players
  for all using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

drop policy if exists "public read history for verified players" on player_team_history;
create policy "public read history for verified players" on player_team_history
  for select using (
    exists (select 1 from players where id = player_id and verification_status = 'verified')
  );

drop policy if exists "admin full access history" on player_team_history;
create policy "admin full access history" on player_team_history
  for all using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

drop policy if exists "admin full access daily games" on daily_games;
create policy "admin full access daily games" on daily_games
  for all using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

-- Profiles: users read/update their own row; admins read all.
drop policy if exists "read own profile" on profiles;
create policy "read own profile" on profiles for select using (auth.uid() = id);

drop policy if exists "update own profile" on profiles;
create policy "update own profile" on profiles for update using (auth.uid() = id);

drop policy if exists "admin read all profiles" on profiles;
create policy "admin read all profiles" on profiles for select using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.is_admin = true)
);

-- Game results: users can only see/write their own.
drop policy if exists "own game results" on game_results;
create policy "own game results" on game_results
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- User statistics: users can only see/write their own.
drop policy if exists "own statistics" on user_statistics;
create policy "own statistics" on user_statistics
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Seed: 30 current franchises + teams
-- (See lib/data/teams.ts for the canonical source used by the app when
--  Supabase is not configured — keep these two lists in sync.)
-- ---------------------------------------------------------------------------
insert into franchises (id, lineage_name) values
  ('hawks-franchise', 'Hawks'), ('celtics-franchise', 'Celtics'), ('nets-franchise', 'Nets'),
  ('hornets-franchise', 'Hornets'), ('bulls-franchise', 'Bulls'), ('cavaliers-franchise', 'Cavaliers'),
  ('mavericks-franchise', 'Mavericks'), ('nuggets-franchise', 'Nuggets'), ('pistons-franchise', 'Pistons'),
  ('warriors-franchise', 'Warriors'), ('rockets-franchise', 'Rockets'), ('pacers-franchise', 'Pacers'),
  ('clippers-franchise', 'Clippers'), ('lakers-franchise', 'Lakers'), ('grizzlies-franchise', 'Grizzlies'),
  ('heat-franchise', 'Heat'), ('bucks-franchise', 'Bucks'), ('timberwolves-franchise', 'Timberwolves'),
  ('pelicans-franchise', 'Pelicans'), ('knicks-franchise', 'Knicks'), ('sonics-franchise', 'Thunder'),
  ('magic-franchise', 'Magic'), ('sixers-franchise', '76ers'), ('suns-franchise', 'Suns'),
  ('blazers-franchise', 'Trail Blazers'), ('kings-franchise', 'Kings'), ('spurs-franchise', 'Spurs'),
  ('raptors-franchise', 'Raptors'), ('jazz-franchise', 'Jazz'), ('wizards-franchise', 'Wizards')
on conflict (id) do nothing;

insert into teams (id, franchise_id, city, name, abbreviation, primary_color, secondary_color, display_order) values
  ('atl', 'hawks-franchise', 'Atlanta', 'Hawks', 'ATL', '#E03A3E', '#112F54', 1),
  ('bos', 'celtics-franchise', 'Boston', 'Celtics', 'BOS', '#1F7A45', '#F4EBD5', 2),
  ('bkn', 'nets-franchise', 'Brooklyn', 'Nets', 'BKN', '#112F54', '#F4EBD5', 3),
  ('cha', 'hornets-franchise', 'Charlotte', 'Hornets', 'CHA', '#00788C', '#112F54', 4),
  ('chi', 'bulls-franchise', 'Chicago', 'Bulls', 'CHI', '#BD2C2C', '#112F54', 5),
  ('cle', 'cavaliers-franchise', 'Cleveland', 'Cavaliers', 'CLE', '#860038', '#FFBB33', 6),
  ('dal', 'mavericks-franchise', 'Dallas', 'Mavericks', 'DAL', '#00538C', '#112F54', 7),
  ('den', 'nuggets-franchise', 'Denver', 'Nuggets', 'DEN', '#EE5A1F', '#112F54', 8),
  ('det', 'pistons-franchise', 'Detroit', 'Pistons', 'DET', '#BD2C2C', '#112F54', 9),
  ('gsw', 'warriors-franchise', 'Golden State', 'Warriors', 'GSW', '#FFBB33', '#112F54', 10),
  ('hou', 'rockets-franchise', 'Houston', 'Rockets', 'HOU', '#BD2C2C', '#112F54', 11),
  ('ind', 'pacers-franchise', 'Indiana', 'Pacers', 'IND', '#112F54', '#FFBB33', 12),
  ('lac', 'clippers-franchise', 'Los Angeles', 'Clippers', 'LAC', '#EE5A1F', '#112F54', 13),
  ('lal', 'lakers-franchise', 'Los Angeles', 'Lakers', 'LAL', '#552583', '#FFBB33', 14),
  ('mem', 'grizzlies-franchise', 'Memphis', 'Grizzlies', 'MEM', '#5D76A9', '#112F54', 15),
  ('mia', 'heat-franchise', 'Miami', 'Heat', 'MIA', '#BD2C2C', '#FFBB33', 16),
  ('mil', 'bucks-franchise', 'Milwaukee', 'Bucks', 'MIL', '#1F7A45', '#FFBB33', 17),
  ('min', 'timberwolves-franchise', 'Minnesota', 'Timberwolves', 'MIN', '#112F54', '#1F7A45', 18),
  ('nop', 'pelicans-franchise', 'New Orleans', 'Pelicans', 'NOP', '#112F54', '#BD2C2C', 19),
  ('nyk', 'knicks-franchise', 'New York', 'Knicks', 'NYK', '#112F54', '#EE5A1F', 20),
  ('okc', 'sonics-franchise', 'Oklahoma City', 'Thunder', 'OKC', '#00538C', '#EE5A1F', 21),
  ('orl', 'magic-franchise', 'Orlando', 'Magic', 'ORL', '#00538C', '#112F54', 22),
  ('phi', 'sixers-franchise', 'Philadelphia', '76ers', 'PHI', '#00538C', '#BD2C2C', 23),
  ('phx', 'suns-franchise', 'Phoenix', 'Suns', 'PHX', '#EE5A1F', '#552583', 24),
  ('por', 'blazers-franchise', 'Portland', 'Trail Blazers', 'POR', '#BD2C2C', '#112F54', 25),
  ('sac', 'kings-franchise', 'Sacramento', 'Kings', 'SAC', '#5A2D81', '#FFBB33', 26),
  ('sas', 'spurs-franchise', 'San Antonio', 'Spurs', 'SAS', '#112F54', '#7C7C7C', 27),
  ('tor', 'raptors-franchise', 'Toronto', 'Raptors', 'TOR', '#BD2C2C', '#112F54', 28),
  ('uta', 'jazz-franchise', 'Utah', 'Jazz', 'UTA', '#112F54', '#FFBB33', 29),
  ('was', 'wizards-franchise', 'Washington', 'Wizards', 'WAS', '#112F54', '#BD2C2C', 30)
on conflict (id) do nothing;

-- To make yourself an admin after signing up:
--   update profiles set is_admin = true where username = 'you@example.com';
