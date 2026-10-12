-- ===================================================================
-- CHINOÉTALES PRODUCTIONS — INITIAL SCHEMA MIGRATION (IDEMPOTENT)
-- Migration: 20261003000001_initial_schema.sql
-- ===================================================================

-- 1. EXTENSIONS & HELPER FUNCTIONS
create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- 2. PROFILES TABLE (linked to auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  )
  on conflict (id) do update set
    email = excluded.email,
    updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

drop trigger if exists tr_profiles_updated_at on public.profiles;
create trigger tr_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- 3. ADMINS TABLE & is_admin() SECURITY DEFINER
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text default 'admin' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$;

-- 4. WORKS / FILMS CATALOGUE
create table if not exists public.works (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text not null,
  director text default '',
  year text default '',
  category text default 'Music Video' not null,
  youtube_id text default '',
  synopsis text default '',
  quote text default '',
  quote_by text default '',
  dop text default '',
  editor text default '',
  producer text default '',
  production_design text default '',
  colourist text default '',
  bts_youtube_id text default '',
  keyart_url text default '',
  poster_url text default '',
  credits jsonb default '[]'::jsonb not null,
  notes text[] default '{}' not null,
  is_published boolean default true not null,
  sort_order integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_works_year on public.works(year);
create index if not exists idx_works_pub_order on public.works(is_published, sort_order);

drop trigger if exists tr_works_updated_at on public.works;
create trigger tr_works_updated_at
  before update on public.works
  for each row execute function public.set_updated_at();

-- 5. DIRECTORS / TEAM MEMBERS
create table if not exists public.directors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text default '',
  photo_url text default '',
  style text default '',
  about text default '',
  statement text default '',
  works jsonb default '[]'::jsonb not null,
  sort_order integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_directors_order on public.directors(sort_order);

drop trigger if exists tr_directors_updated_at on public.directors;
create trigger tr_directors_updated_at
  before update on public.directors
  for each row execute function public.set_updated_at();

-- 6. LANDING REEL (Virtual Scroll Projects)
create table if not exists public.landing_reel (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  sort_order integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_landing_reel_order on public.landing_reel(sort_order);

-- 7. FAQS
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create trigger tr_faqs_updated_at
  before update on public.faqs
  for each row execute function public.set_updated_at();

drop trigger if exists tr_faqs_updated_at on public.faqs;
create trigger tr_faqs_updated_at
  before update on public.faqs
  for each row execute function public.set_updated_at();

-- 8. SERVICES
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  tags text[] default '{}' not null,
  sort_order integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

drop trigger if exists tr_services_updated_at on public.services;
create trigger tr_services_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

-- 9. SITE SETTINGS (Singleton id = 1)
create table if not exists public.site_settings (
  id integer primary key default 1,
  stats jsonb default '{}'::jsonb not null,
  contact_email text default 'chinoetales@gmail.com' not null,
  phones text[] default '{}' not null,
  location text default 'Based in Kathmandu, Nepal\nAvailable for projects globally' not null,
  playlist_url text default '' not null,
  social_links jsonb default '[]'::jsonb not null,
  top10_titles text[] default '{}' not null,
  copyright text default '© 2026 Chinoétales Films Pvt. Ltd.' not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

drop trigger if exists tr_site_settings_updated_at on public.site_settings;
create trigger tr_site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- 10. SITE THEME (Singleton id = 1)
create table if not exists public.site_theme (
  id integer primary key default 1,
  tokens jsonb default '{}'::jsonb not null,
  font_face text default '',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

drop trigger if exists tr_site_theme_updated_at on public.site_theme;
create trigger tr_site_theme_updated_at
  before update on public.site_theme
  for each row execute function public.set_updated_at();

-- 11. SITE ASSETS (Singleton id = 1)
create table if not exists public.site_assets (
  id integer primary key default 1,
  media_paths jsonb default '{}'::jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

drop trigger if exists tr_site_assets_updated_at on public.site_assets;
create trigger tr_site_assets_updated_at
  before update on public.site_assets
  for each row execute function public.set_updated_at();

-- 12. UNIFIED CONTENT DOCUMENT (Cached hydration row, id = 1)
create table if not exists public.site_content (
  id integer primary key default 1,
  data jsonb default '{}'::jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

drop trigger if exists tr_site_content_updated_at on public.site_content;
create trigger tr_site_content_updated_at
  before update on public.site_content
  for each row execute function public.set_updated_at();

-- 13. INCOMING CLIENT INQUIRIES
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) >= 2),
  email text not null check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  project_type text default '',
  timeline text default '',
  artist_brand text default '',
  brief text not null check (length(trim(brief)) >= 10),
  status text default 'new' not null check (status in ('new', 'contacted', 'in_progress', 'archived')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_inquiries_created on public.inquiries(created_at desc);

-- ===================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES (IDEMPOTENT)
-- ===================================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.admins enable row level security;
alter table public.works enable row level security;
alter table public.directors enable row level security;
alter table public.landing_reel enable row level security;
alter table public.faqs enable row level security;
alter table public.services enable row level security;
alter table public.site_settings enable row level security;
alter table public.site_theme enable row level security;
alter table public.site_assets enable row level security;
alter table public.site_content enable row level security;
alter table public.inquiries enable row level security;

-- Profiles: Public read, User can update only own profile
drop policy if exists "Profiles are viewable by everyone" on public.profiles;
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  to public
  using (true);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admins: Viewable and manageable only by admins
drop policy if exists "Admins are viewable only by admins" on public.admins;
create policy "Admins are viewable only by admins"
  on public.admins for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins can be modified only by admins" on public.admins;
create policy "Admins can be modified only by admins"
  on public.admins for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Works: Public can view published works; admins can view and manage all
drop policy if exists "Published works are viewable by everyone" on public.works;
create policy "Published works are viewable by everyone"
  on public.works for select
  to public
  using (is_published = true or public.is_admin());

drop policy if exists "Works can be created by admins" on public.works;
create policy "Works can be created by admins"
  on public.works for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Works can be updated by admins" on public.works;
create policy "Works can be updated by admins"
  on public.works for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Works can be deleted by admins" on public.works;
create policy "Works can be deleted by admins"
  on public.works for delete
  to authenticated
  using (public.is_admin());

-- Directors: Public read, admin write
drop policy if exists "Directors are viewable by everyone" on public.directors;
create policy "Directors are viewable by everyone"
  on public.directors for select
  to public
  using (true);

drop policy if exists "Directors can be managed by admins" on public.directors;
create policy "Directors can be managed by admins"
  on public.directors for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Landing Reel: Public read, admin write
drop policy if exists "Landing reel is viewable by everyone" on public.landing_reel;
create policy "Landing reel is viewable by everyone"
  on public.landing_reel for select
  to public
  using (true);

drop policy if exists "Landing reel can be managed by admins" on public.landing_reel;
create policy "Landing reel can be managed by admins"
  on public.landing_reel for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- FAQs: Public read, admin write
drop policy if exists "FAQs are viewable by everyone" on public.faqs;
create policy "FAQs are viewable by everyone"
  on public.faqs for select
  to public
  using (true);

drop policy if exists "FAQs can be managed by admins" on public.faqs;
create policy "FAQs can be managed by admins"
  on public.faqs for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Services: Public read, admin write
drop policy if exists "Services are viewable by everyone" on public.services;
create policy "Services are viewable by everyone"
  on public.services for select
  to public
  using (true);

drop policy if exists "Services can be managed by admins" on public.services;
create policy "Services can be managed by admins"
  on public.services for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Site Settings: Public read, admin write
drop policy if exists "Site settings are viewable by everyone" on public.site_settings;
create policy "Site settings are viewable by everyone"
  on public.site_settings for select
  to public
  using (true);

drop policy if exists "Site settings can be managed by admins" on public.site_settings;
create policy "Site settings can be managed by admins"
  on public.site_settings for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Site Theme: Public read, admin write
drop policy if exists "Site theme is viewable by everyone" on public.site_theme;
create policy "Site theme is viewable by everyone"
  on public.site_theme for select
  to public
  using (true);

drop policy if exists "Site theme can be managed by admins" on public.site_theme;
create policy "Site theme can be managed by admins"
  on public.site_theme for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Site Assets: Public read, admin write
drop policy if exists "Site assets are viewable by everyone" on public.site_assets;
create policy "Site assets are viewable by everyone"
  on public.site_assets for select
  to public
  using (true);

drop policy if exists "Site assets can be managed by admins" on public.site_assets;
create policy "Site assets can be managed by admins"
  on public.site_assets for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Site Content (Cached): Public read, admin write
drop policy if exists "Site content is viewable by everyone" on public.site_content;
create policy "Site content is viewable by everyone"
  on public.site_content for select
  to public
  using (true);

drop policy if exists "Site content can be managed by admins" on public.site_content;
create policy "Site content can be managed by admins"
  on public.site_content for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Inquiries: Public can submit inquiries, only admins can view and manage
drop policy if exists "Public can submit inquiries" on public.inquiries;
create policy "Public can submit inquiries"
  on public.inquiries for insert
  to public
  with check (true);

drop policy if exists "Inquiries viewable only by admins" on public.inquiries;
create policy "Inquiries viewable only by admins"
  on public.inquiries for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Inquiries manageable only by admins" on public.inquiries;
create policy "Inquiries manageable only by admins"
  on public.inquiries for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Inquiries deletable only by admins" on public.inquiries;
create policy "Inquiries deletable only by admins"
  on public.inquiries for delete
  to authenticated
  using (public.is_admin());
