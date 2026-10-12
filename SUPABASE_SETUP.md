# Chinoétales Productions — Supabase Setup & Deployment Guide

This guide provides the exact steps to connect, secure, and deploy your Supabase backend for Chinoétales.

---

## 1. Project Credentials

Your project is already configured in [`assets/config.js`](file:///c:/Users/Admin/Desktop/Chinoe/assets/config.js):
- **Project URL:** `https://jfwynwnqeilaqtbgiuqc.supabase.co`
- **Anon Public Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 2. Run Database Migrations & Seed (In Supabase Dashboard)

1. Open your project in the Supabase Dashboard: **[https://supabase.com/dashboard/project/jfwynwnqeilaqtbgiuqc](https://supabase.com/dashboard/project/jfwynwnqeilaqtbgiuqc)**
2. In the left sidebar, click **SQL Editor** (`>_`).
3. Click **"New query"**:
   - Open [`supabase/migrations/20261003000001_initial_schema.sql`](file:///c:/Users/Admin/Desktop/Chinoe/supabase/migrations/20261003000001_initial_schema.sql) on your computer.
   - Copy the entire SQL script, paste it into the SQL Editor, and click **Run** (Ctrl + Enter).
   - *This creates all tables, triggers, and Row Level Security (RLS) policies.*
4. Click **"New query"** again:
   - Open [`supabase/migrations/20261003000002_storage_setup.sql`](file:///c:/Users/Admin/Desktop/Chinoe/supabase/migrations/20261003000002_storage_setup.sql).
   - Copy the entire SQL script, paste it into the editor, and click **Run**.
   - *This creates the 3 public storage buckets (`team-avatars`, `work-posters`, `site-assets`) with admin upload policies.*
5. Click **"New query"** a third time:
   - Open [`supabase/seed.sql`](file:///c:/Users/Admin/Desktop/Chinoe/supabase/seed.sql).
   - Copy and paste into the editor, then click **Run**.
   - *This populates your live database with all 60+ music videos, 13 team members, FAQs, services, and site settings!*
6. *(Optional / Existing Database Upgrade)*:
   - Open [`supabase/migrations/20261004000001_inquiries_validation.sql`](file:///c:/Users/Admin/Desktop/Chinoe/supabase/migrations/20261004000001_inquiries_validation.sql).
   - Copy and paste into the editor, then click **Run**.
   - *This applies the database-level CHECK constraints for name, email pattern, and brief length.*

---

## 3. Configure Authentication & Create the Admin User

### A. Disable Public Sign-ups (Security Requirement)
1. In the Supabase sidebar, navigate to **Authentication** → **Providers** → **Email**.
2. **Turn OFF "Enable Signups"** (toggle).
3. Click **Save**.

### B. Create Your Admin User
1. In the Supabase sidebar, go to **Authentication** → **Users**.
2. Click **"Add user"** → **"Create user"**:
   - **Email:** Your admin email (e.g. `admin@chinoetales.com`).
   - **Password:** Choose a secure password.
   - **Auto Confirm User?**: Check this box (so you don't need to confirm via email).
3. Click **"Create user"**.
4. In the users list, find your new user and copy their **User UID** (a UUID like `e3b0c442-98fc-1c14-9afb-4c7b8e5c264a`).

### C. Grant Admin Privileges
1. Go back to the **SQL Editor**.
2. Run this quick query (replace with your user's UID and email):
   ```sql
   insert into public.admins (user_id, email, role)
   values ('YOUR_USER_UUID_HERE', 'admin@chinoetales.com', 'admin');
   ```
3. Your account is now fully authorized to sign in to [`admin.html`](file:///c:/Users/Admin/Desktop/Chinoe/admin.html)!

---

## 4. Verification Checklist

- [ ] **Database Tables Created:** Check **Table Editor** in Supabase; you should see `works`, `directors`, `landing_reel`, `faqs`, `services`, `site_settings`, `site_content`, `inquiries`, `admins`, and `profiles`.
- [ ] **Storage Buckets Created:** Check **Storage** in Supabase; you should see `team-avatars`, `work-posters`, and `site-assets`.
- [ ] **Admin Login Test:** Open [`admin.html`](file:///c:/Users/Admin/Desktop/Chinoe/admin.html) in your browser. Log in with your admin credentials. Verify that the admin shell unlocks and shows your email badge.
- [ ] **Cloud Save Test:** In `admin.html`, make a quick edit (e.g., in Pages copy or Theme) and click **Save**. Verify that the status shows `Saved to Supabase`.
- [ ] **Public Site Test:** Open `work.html` or `team.html` in your browser. Verify all titles, directors, and cards render seamlessly from Supabase.
- [ ] **Contact Form Test:** Open `contact.html`, fill out a test inquiry, and submit. Verify that the inquiry appears in the Supabase **Table Editor → inquiries**.

---

## 5. Security & Architecture Summary

| Layer | Implementation | Security Guarantee |
|---|---|---|
| **Public API Key** | `anon` key in `assets/config.js` | Safe for client browsers; protected by RLS |
| **Row Level Security** | Enabled on 100% of tables | Public has read-only access to published content; mutations hard-rejected by Postgres unless `is_admin() = true` |
| **Admin Route** | Gate in `admin.html` | Locked behind email/password session check + server verification in `public.admins` |
| **Storage Security** | RLS on `storage.objects` | Public read access; uploads restricted to verified admins with 5 MB file size and image MIME limits |
| **High Availability** | Client fallback in `assets/app.js` | If network fails or Supabase is unreachable, automatically falls back to `content.json` for 100% uptime |
