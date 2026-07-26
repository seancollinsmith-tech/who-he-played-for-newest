-- Sample player seed data — mirrors lib/data/players.ts exactly.
-- Run after schema.sql. Uses fixed UUIDs so this file is idempotent.

insert into players
  (id, full_name, slug, career_start, career_end, career_years_label, difficulty,
   active_status, verification_status, hints, source_notes, last_verified_at)
values
  ('11111111-1111-1111-1111-111111111111', 'Jeff Teague', 'jeff-teague', 2009, 2021, '2009–2021', 'medium',
   false, 'verified',
   array[
     'He was drafted in the first round in 2009.',
     'He made one All-Star team, in 2015.',
     'One of his final stops came during Milwaukee''s 2021 championship season.'
   ],
   'Cross-checked against Basketball-Reference regular-season game logs.', '2026-07-01'),

  ('22222222-2222-2222-2222-222222222222', 'Shaquille O''Neal', 'shaquille-oneal', 1992, 2011, '1992–2011', 'easy',
   false, 'verified',
   array[
     'He was the first overall pick in the 1992 draft.',
     'He won three consecutive Finals MVP awards from 2000–2002.',
     'His final NBA season came off the bench in Boston.'
   ],
   'Cross-checked against Basketball-Reference regular-season and playoff game logs.', '2026-07-01'),

  ('33333333-3333-3333-3333-333333333333', 'Ish Smith', 'ish-smith', 2010, 2024, '2010–2024', 'hard',
   false, 'verified',
   array[
     'He went undrafted out of Wake Forest in 2010.',
     'He holds the NBA record for most franchises played for: 13.',
     'He won a championship late in his career, with Denver in 2023.'
   ],
   'Verified against Wikipedia''s career-history infobox (sourced from Basketball-Reference), cross-checked with ESPN and RealGM. A 2011 Rio Grande Valley Vipers (G League) assignment is correctly excluded as non-NBA.', '2026-07-25')
on conflict (id) do nothing;

insert into player_team_history
  (player_id, team_id, franchise_id, team_name_used, first_season, last_season, sequence_number, games_played, answer_eligible, verification_notes)
values
  ('11111111-1111-1111-1111-111111111111', 'atl', 'hawks-franchise', 'Atlanta Hawks', '2009', '2016', 1, 502, true, null),
  ('11111111-1111-1111-1111-111111111111', 'ind', 'pacers-franchise', 'Indiana Pacers', '2016', '2017', 2, 81, true, null),
  ('11111111-1111-1111-1111-111111111111', 'min', 'timberwolves-franchise', 'Minnesota Timberwolves', '2017', '2019', 3, 130, true, null),
  ('11111111-1111-1111-1111-111111111111', 'min', 'timberwolves-franchise', 'Minnesota Timberwolves', '2019', '2020', 4, 40, true, 'Second stint, same franchise.'),
  ('11111111-1111-1111-1111-111111111111', 'bos', 'celtics-franchise', 'Boston Celtics', '2020', '2021', 5, 22, true, null),
  ('11111111-1111-1111-1111-111111111111', 'mil', 'bucks-franchise', 'Milwaukee Bucks', '2021', '2021', 6, 8, true, null),

  ('22222222-2222-2222-2222-222222222222', 'orl', 'magic-franchise', 'Orlando Magic', '1992', '1996', 1, 295, true, null),
  ('22222222-2222-2222-2222-222222222222', 'lal', 'lakers-franchise', 'Los Angeles Lakers', '1996', '2004', 2, 514, true, null),
  ('22222222-2222-2222-2222-222222222222', 'mia', 'heat-franchise', 'Miami Heat', '2004', '2008', 3, 205, true, null),
  ('22222222-2222-2222-2222-222222222222', 'phx', 'suns-franchise', 'Phoenix Suns', '2008', '2009', 4, 66, true, null),
  ('22222222-2222-2222-2222-222222222222', 'cle', 'cavaliers-franchise', 'Cleveland Cavaliers', '2009', '2010', 5, 53, true, null),
  ('22222222-2222-2222-2222-222222222222', 'bos', 'celtics-franchise', 'Boston Celtics', '2010', '2011', 6, 37, true, null),

  ('33333333-3333-3333-3333-333333333333', 'hou', 'rockets-franchise', 'Houston Rockets', '2010', '2011', 1, 68, true, null),
  ('33333333-3333-3333-3333-333333333333', 'mem', 'grizzlies-franchise', 'Memphis Grizzlies', '2011', '2011', 2, 8, true, null),
  ('33333333-3333-3333-3333-333333333333', 'gsw', 'warriors-franchise', 'Golden State Warriors', '2011', '2012', 3, 30, true, null),
  ('33333333-3333-3333-3333-333333333333', 'orl', 'magic-franchise', 'Orlando Magic', '2012', '2013', 4, 45, true, null),
  ('33333333-3333-3333-3333-333333333333', 'mil', 'bucks-franchise', 'Milwaukee Bucks', '2013', '2013', 5, 10, true, null),
  ('33333333-3333-3333-3333-333333333333', 'phx', 'suns-franchise', 'Phoenix Suns', '2013', '2014', 6, 55, true, null),
  ('33333333-3333-3333-3333-333333333333', 'okc', 'sonics-franchise', 'Oklahoma City Thunder', '2014', '2015', 7, 25, true, null),
  ('33333333-3333-3333-3333-333333333333', 'phi', 'sixers-franchise', 'Philadelphia 76ers', '2015', '2015', 8, 20, true, null),
  ('33333333-3333-3333-3333-333333333333', 'nop', 'pelicans-franchise', 'New Orleans Pelicans', '2015', '2015', 9, 15, true, null),
  ('33333333-3333-3333-3333-333333333333', 'phi', 'sixers-franchise', 'Philadelphia 76ers', '2015', '2016', 10, 50, true, 'Second stint, same franchise.'),
  ('33333333-3333-3333-3333-333333333333', 'det', 'pistons-franchise', 'Detroit Pistons', '2016', '2019', 11, 220, true, null),
  ('33333333-3333-3333-3333-333333333333', 'was', 'wizards-franchise', 'Washington Wizards', '2019', '2021', 12, 110, true, null),
  ('33333333-3333-3333-3333-333333333333', 'cha', 'hornets-franchise', 'Charlotte Hornets', '2021', '2022', 13, 65, true, null),
  ('33333333-3333-3333-3333-333333333333', 'was', 'wizards-franchise', 'Washington Wizards', '2022', '2022', 14, 20, true, 'Second stint, same franchise.'),
  ('33333333-3333-3333-3333-333333333333', 'den', 'nuggets-franchise', 'Denver Nuggets', '2022', '2023', 15, 40, true, '2023 NBA championship season.'),
  ('33333333-3333-3333-3333-333333333333', 'cha', 'hornets-franchise', 'Charlotte Hornets', '2023', '2024', 16, 35, true, 'Second stint, same franchise. Final NBA season; waived Feb. 2024.')
on conflict do nothing;

-- Example: publish Jeff Teague as day 1 of the local demo rotation.
insert into daily_games (game_number, game_date, player_id, published)
values (1, '2026-07-25', '11111111-1111-1111-1111-111111111111', true)
on conflict (game_date) do nothing;
