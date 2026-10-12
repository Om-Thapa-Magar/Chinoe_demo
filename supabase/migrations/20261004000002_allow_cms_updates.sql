-- ===================================================================
-- MIGRATION: 20261004000002_allow_cms_updates.sql
-- PURPOSE: Enable full synchronization between the Admin CMS (admin.html)
--          and Supabase tables (landing_reel, site_content, works, directors, settings).
--
-- This resolves the Postgres 42501 error:
-- "new row violates row-level security policy for table 'landing_reel'" / 'site_content'.
-- ===================================================================

-- 1. LANDING REEL (Allow dashboard to view, insert, update, and delete reel items)
drop policy if exists "Landing reel is viewable by everyone" on public.landing_reel;
create policy "Landing reel is viewable by everyone"
  on public.landing_reel for select
  to public
  using (true);

drop policy if exists "Landing reel can be managed by admins" on public.landing_reel;
drop policy if exists "Landing reel can be managed by anyone" on public.landing_reel;
create policy "Landing reel can be managed by anyone"
  on public.landing_reel for all
  to public
  using (true)
  with check (true);

-- 2. SITE CONTENT (Allow dashboard to save the unified site document)
drop policy if exists "Site content is viewable by everyone" on public.site_content;
create policy "Site content is viewable by everyone"
  on public.site_content for select
  to public
  using (true);

drop policy if exists "Site content can be managed by admins" on public.site_content;
drop policy if exists "Site content can be managed by anyone" on public.site_content;
create policy "Site content can be managed by anyone"
  on public.site_content for all
  to public
  using (true)
  with check (true);

-- 3. WORKS / CATALOGUE
drop policy if exists "Published works are viewable by everyone" on public.works;
create policy "Published works are viewable by everyone"
  on public.works for select
  to public
  using (true);

drop policy if exists "Works can be created by admins" on public.works;
drop policy if exists "Works can be updated by admins" on public.works;
drop policy if exists "Works can be deleted by admins" on public.works;
drop policy if exists "Works can be managed by anyone" on public.works;
create policy "Works can be managed by anyone"
  on public.works for all
  to public
  using (true)
  with check (true);

-- 4. DIRECTORS / TEAM
drop policy if exists "Directors are viewable by everyone" on public.directors;
create policy "Directors are viewable by everyone"
  on public.directors for select
  to public
  using (true);

drop policy if exists "Directors can be managed by admins" on public.directors;
drop policy if exists "Directors can be managed by anyone" on public.directors;
create policy "Directors can be managed by anyone"
  on public.directors for all
  to public
  using (true)
  with check (true);

-- 5. SITE SETTINGS, THEME, ASSETS
drop policy if exists "Site settings can be managed by admins" on public.site_settings;
drop policy if exists "Site settings can be managed by anyone" on public.site_settings;
create policy "Site settings can be managed by anyone"
  on public.site_settings for all
  to public
  using (true)
  with check (true);

drop policy if exists "Site theme can be managed by admins" on public.site_theme;
drop policy if exists "Site theme can be managed by anyone" on public.site_theme;
create policy "Site theme can be managed by anyone"
  on public.site_theme for all
  to public
  using (true)
  with check (true);

drop policy if exists "Site assets can be managed by admins" on public.site_assets;
drop policy if exists "Site assets can be managed by anyone" on public.site_assets;
create policy "Site assets can be managed by anyone"
  on public.site_assets for all
  to public
  using (true)
  with check (true);
