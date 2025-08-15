create type team_role as ENUM (
  'admin',
  'member'
);

create table teams (
  id uuid not null default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now (),
  primary key (id)
);