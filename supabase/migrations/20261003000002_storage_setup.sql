-- ===================================================================
-- CHINOÉTALES PRODUCTIONS — STORAGE BUCKETS & POLICIES MIGRATION
-- Migration: 20261003000002_storage_setup.sql
-- ===================================================================

-- 1. CREATE STORAGE BUCKETS
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('team-avatars', 'team-avatars', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
  ('work-posters', 'work-posters', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
  ('site-assets', 'site-assets', true, 15728640, array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'video/mp4'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 2. STORAGE POLICIES
-- Anyone can view media files from public buckets
drop policy if exists "Public media is viewable by everyone" on storage.objects;
create policy "Public media is viewable by everyone"
  on storage.objects for select
  to public
  using (bucket_id in ('team-avatars', 'work-posters', 'site-assets'));

-- Only verified admins can upload media files
drop policy if exists "Admins can upload media files" on storage.objects;
create policy "Admins can upload media files"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id in ('team-avatars', 'work-posters', 'site-assets')
    and public.is_admin()
  );

-- Only verified admins can update media files
drop policy if exists "Admins can update media files" on storage.objects;
create policy "Admins can update media files"
  on storage.objects for update
  to authenticated
  using (
    bucket_id in ('team-avatars', 'work-posters', 'site-assets')
    and public.is_admin()
  );

-- Only verified admins can delete media files
drop policy if exists "Admins can delete media files" on storage.objects;
create policy "Admins can delete media files"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id in ('team-avatars', 'work-posters', 'site-assets')
    and public.is_admin()
  );
