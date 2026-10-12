-- ===================================================================
-- CHINOÉTALES PRODUCTIONS — INQUIRIES VALIDATION MIGRATION
-- Migration: 20261004000001_inquiries_validation.sql
-- Description: Adds database-level CHECK constraints to public.inquiries
-- ===================================================================

do $$
begin
  -- 1. Ensure name has at least 2 non-whitespace characters
  if not exists (select 1 from pg_constraint where conname = 'check_inquiry_name_length') then
    alter table public.inquiries
      add constraint check_inquiry_name_length
      check (length(trim(name)) >= 2);
  end if;

  -- 2. Ensure email satisfies standard email pattern
  if not exists (select 1 from pg_constraint where conname = 'check_inquiry_email_format') then
    alter table public.inquiries
      add constraint check_inquiry_email_format
      check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
  end if;

  -- 3. Ensure creative brief has at least 10 non-whitespace characters
  if not exists (select 1 from pg_constraint where conname = 'check_inquiry_brief_length') then
    alter table public.inquiries
      add constraint check_inquiry_brief_length
      check (length(trim(brief)) >= 10);
  end if;

  -- 4. Ensure status belongs to recognized workflow statuses
  if not exists (select 1 from pg_constraint where conname = 'check_inquiry_status_valid') then
    alter table public.inquiries
      add constraint check_inquiry_status_valid
      check (status in ('new', 'contacted', 'in_progress', 'archived'));
  end if;
end $$;
