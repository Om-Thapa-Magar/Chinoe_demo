/**
 * Chinoétales Productions — Supabase Client, Auth, Storage & Data Access Layer
 */
(function (global) {
  'use strict';

  let client = null;

  // Initialize Supabase Client
  function getClient() {
    if (client) return client;
    const config = global.CHINOE_CONFIG;
    if (!config || !config.isConfigured()) {
      return null;
    }
    if (typeof global.supabase === 'undefined' || !global.supabase.createClient) {
      console.warn('Supabase JS library not loaded. Make sure @supabase/supabase-js is included.');
      return null;
    }
    client = global.supabase.createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    return client;
  }

  // Auth Service
  const Auth = {
    isReady: function () {
      return getClient() !== null;
    },

    getSession: async function () {
      const sb = getClient();
      if (!sb) return null;
      try {
        const { data: { session }, error } = await sb.auth.getSession();
        if (error) throw error;
        return session;
      } catch (err) {
        console.error('Error fetching session:', err);
        return null;
      }
    },

    verifyAdmin: async function (userId) {
      const sb = getClient();
      if (!sb || !userId) return false;
      try {
        const { data, error } = await sb
          .from('admins')
          .select('user_id, role')
          .eq('user_id', userId)
          .maybeSingle();

        if (error || !data) return false;
        return true;
      } catch (err) {
        console.error('Error verifying admin authorization:', err);
        return false;
      }
    },

    signIn: async function (email, password) {
      const sb = getClient();
      if (!sb) {
        return { error: new Error('Supabase is not configured. Please set your project URL and Anon Key in assets/config.js.') };
      }
      try {
        const { data, error } = await sb.auth.signInWithPassword({
          email: email.trim(),
          password: password
        });
        if (error) {
          return { error: new Error('Invalid email or password. Please verify your credentials.') };
        }

        const isAdmin = await this.verifyAdmin(data.user.id);
        if (!isAdmin) {
          await sb.auth.signOut();
          return {
            error: new Error('Access denied: This account is not authorized as an administrator.')
          };
        }

        return { data };
      } catch (err) {
        return { error: err };
      }
    },

    signOut: async function () {
      const sb = getClient();
      if (!sb) return;
      try {
        await sb.auth.signOut();
      } catch (err) {
        console.error('Error during signOut:', err);
      }
    },

    resetPassword: async function (email) {
      const sb = getClient();
      if (!sb) {
        return { error: new Error('Supabase is not configured.') };
      }
      try {
        const redirectUrl = window.location.origin + window.location.pathname;
        const { data, error } = await sb.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: redirectUrl
        });
        if (error) throw error;
        return { success: true, message: 'If an account exists for this email, a password recovery link has been sent.' };
      } catch (err) {
        return { error: err };
      }
    },

    updatePassword: async function (newPassword) {
      const sb = getClient();
      if (!sb) return { error: new Error('Supabase is not configured.') };
      try {
        const { data, error } = await sb.auth.updateUser({ password: newPassword });
        if (error) throw error;
        return { data };
      } catch (err) {
        return { error: err };
      }
    },

    onAuthStateChange: function (callback) {
      const sb = getClient();
      if (!sb) return { unsubscribe: function () { } };
      const { data: { subscription } } = sb.auth.onAuthStateChange(callback);
      return subscription;
    }
  };

  // Storage Service
  const Storage = {
    // Allowed MIME types and max size (5 MB for images)
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    MAX_IMAGE_SIZE: 5 * 1024 * 1024,

    uploadFile: async function (bucket, file, customName) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client is not ready.');

      // Client-side validations
      if (file.size > this.MAX_IMAGE_SIZE) {
        throw new Error('File exceeds the 5 MB maximum limit.');
      }
      if (!this.ALLOWED_IMAGE_TYPES.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, WebP, and SVG are accepted.');
      }

      const ext = file.name.split('.').pop().toLowerCase();
      const sanitizedName = (customName || file.name.replace(/\.[^/.]+$/, ''))
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '-');
      const filename = `${sanitizedName}-${Date.now()}.${ext}`;

      const { data, error } = await sb.storage
        .from(bucket)
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      const { data: publicData } = sb.storage.from(bucket).getPublicUrl(filename);
      return {
        path: data.path,
        url: publicData.publicUrl
      };
    },

    deleteFile: async function (bucket, path) {
      const sb = getClient();
      if (!sb) return;
      const { error } = await sb.storage.from(bucket).remove([path]);
      if (error) console.error('Error deleting file:', error);
    }
  };

  // Data Access Service (Abstraction layer)
  const Data = {
    // Fetch site content with automatic fallback to content.json
    fetchSiteContent: async function () {
      const sb = getClient();
      if (sb) {
        try {
          const { data, error } = await sb
            .from('site_content')
            .select('data')
            .eq('id', 1)
            .maybeSingle();

          if (!error && data && data.data && Object.keys(data.data).length) {
            return data.data;
          }
        } catch (err) {
          console.warn('Failed to load from Supabase site_content, falling back to local file.', err);
        }

        // Secondary fallback: Try to assemble from relational tables if site_content is empty
        try {
          const [dirRes, worksRes, reelRes] = await Promise.all([
            sb.from('directors').select('*').order('sort_order', { ascending: true }),
            sb.from('works').select('*').order('sort_order', { ascending: true }),
            sb.from('landing_reel').select('*').order('sort_order', { ascending: true })
          ]);

          if ((dirRes.data && dirRes.data.length) || (worksRes.data && worksRes.data.length)) {
            const baseRes = await fetch('content.json', { cache: 'no-store' }).catch(() => null);
            const base = (baseRes && baseRes.ok) ? await baseRes.json() : {};

            if (dirRes.data && dirRes.data.length) {
              base.directors = dirRes.data.map(d => ({
                a: d.name,
                role: d.role,
                photo: d.photo_url,
                style: d.style,
                about: d.about,
                works: Array.isArray(d.works) ? d.works : [],
                q: d.statement
              }));
            }
            if (worksRes.data && worksRes.data.length) {
              base.works = worksRes.data.map(w => ({
                t: w.title,
                a: w.artist,
                d: w.director,
                y: w.year,
                cat: w.category,
                id: w.youtube_id,
                story: w.synopsis,
                quote: w.quote,
                quoteBy: w.quote_by,
                dop: w.dop,
                e: w.editor,
                p: w.producer,
                pd: w.production_design,
                col: w.colourist,
                bts: w.bts_youtube_id,
                keyart: w.keyart_url,
                poster: w.poster_url,
                credits: Array.isArray(w.credits) ? w.credits : [],
                notes: Array.isArray(w.notes) ? w.notes : []
              }));
            }
            if (reelRes.data && reelRes.data.length) {
              base.projects = reelRes.data.map(r => ({
                t: r.title,
                slug: r.slug
              }));
            }
            return base;
          }
        } catch (tableErr) {
          console.warn('Relational table fetch fallback error:', tableErr);
        }
      }

      // Fallback: fetch local content.json
      try {
        const res = await fetch('content.json', { cache: 'no-store' });
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.error('Error fetching local content.json:', err);
      }
      return null;
    },

    // Save site content to Supabase and synchronize all relational tables
    saveSiteContent: async function (contentData) {
      const sb = getClient();
      if (!sb) throw new Error('Supabase client is not ready.');

      // 1. Primary storage: Unified site content document (powers the website & CMS)
      const { error: contentErr } = await sb
        .from('site_content')
        .upsert({
          id: 1,
          data: contentData,
          updated_at: new Date().toISOString()
        });

      if (contentErr) {
        console.error('Failed to save to site_content table:', contentErr);
        throw new Error('Supabase rejected saving site_content (RLS): ' + (contentErr.message || contentErr.code));
      }

      // 2. Synchronize to public.landing_reel table
      if (Array.isArray(contentData.projects)) {
        const reelRows = contentData.projects
          .filter(p => p && (p.t || p.slug))
          .map((p, idx) => ({
            title: String(p.t || 'Untitled Project').trim(),
            slug: String(p.slug || '').trim(),
            sort_order: idx
          }));

        const { error: delReelErr } = await sb
          .from('landing_reel')
          .delete()
          .neq('sort_order', -99999);

        if (delReelErr) {
          console.error('Failed to clear landing_reel table:', delReelErr);
          throw new Error('Supabase rejected clearing landing_reel (RLS): ' + (delReelErr.message || delReelErr.code));
        }

        if (reelRows.length > 0) {
          const { error: insReelErr } = await sb
            .from('landing_reel')
            .insert(reelRows);

          if (insReelErr) {
            console.error('Failed to insert into landing_reel table:', insReelErr);
            throw new Error('Supabase rejected inserting into landing_reel (RLS): ' + (insReelErr.message || insReelErr.code));
          }
        }
      }

      // 3. Synchronize to public.directors table
      if (Array.isArray(contentData.directors)) {
        const directorRows = contentData.directors
          .filter(d => d && (d.a || d.name || d.role))
          .map((d, idx) => ({
            name: String(d.a || d.name || 'Unnamed Member').trim(),
            role: String(d.role || '').trim(),
            photo_url: String(d.photo || d.photo_url || '').trim(),
            style: String(d.style || '').trim(),
            about: String(d.about || '').trim(),
            statement: String(d.q || d.statement || '').trim(),
            works: Array.isArray(d.works) ? d.works : [],
            sort_order: idx
          }));

        const { error: delDirErr } = await sb
          .from('directors')
          .delete()
          .neq('sort_order', -99999);

        if (delDirErr) {
          console.error('Failed to clear directors table:', delDirErr);
          throw new Error('Supabase rejected clearing directors (RLS): ' + (delDirErr.message || delDirErr.code));
        }

        if (directorRows.length > 0) {
          const { error: insDirErr } = await sb
            .from('directors')
            .insert(directorRows);

          if (insDirErr) {
            console.error('Failed to insert into directors table:', insDirErr);
            throw new Error('Supabase rejected inserting into directors (RLS): ' + (insDirErr.message || insDirErr.code));
          }
        }
      }

      // 4. Synchronize to public.works table
      if (Array.isArray(contentData.works)) {
        const workRows = contentData.works
          .filter(w => w && (w.t || w.title || w.a || w.artist))
          .map((w, idx) => ({
            title: String(w.t || w.title || 'Untitled Work').trim(),
            artist: String(w.a || w.artist || 'Unknown Artist').trim(),
            director: String(w.d || w.director || '').trim(),
            year: String(w.y || w.year || '').trim(),
            category: String(w.cat || w.category || 'Music Video').trim(),
            youtube_id: String(w.id || w.youtube_id || '').trim(),
            synopsis: String(w.story || w.synopsis || '').trim(),
            quote: String(w.quote || '').trim(),
            quote_by: String(w.quoteBy || w.quote_by || '').trim(),
            dop: String(w.dop || '').trim(),
            editor: String(w.e || w.editor || '').trim(),
            producer: String(w.p || w.producer || '').trim(),
            production_design: String(w.pd || w.production_design || '').trim(),
            colourist: String(w.col || w.colourist || '').trim(),
            bts_youtube_id: String(w.bts || w.bts_youtube_id || '').trim(),
            keyart_url: String(w.keyart || w.keyart_url || '').trim(),
            poster_url: String(w.poster || w.poster_url || '').trim(),
            credits: Array.isArray(w.credits) ? w.credits : [],
            notes: Array.isArray(w.notes) ? w.notes.filter(n => typeof n === 'string') : [],
            is_published: true,
            sort_order: idx
          }));

        const { error: delWorkErr } = await sb
          .from('works')
          .delete()
          .neq('sort_order', -99999);

        if (delWorkErr) {
          console.error('Failed to clear works table:', delWorkErr);
          throw new Error('Supabase rejected clearing works (RLS): ' + (delWorkErr.message || delWorkErr.code));
        }

        if (workRows.length > 0) {
          for (let i = 0; i < workRows.length; i += 50) {
            const chunk = workRows.slice(i, i + 50);
            const { error: insWorkErr } = await sb.from('works').insert(chunk);
            if (insWorkErr) {
              console.error('Failed to insert into works table:', insWorkErr);
              throw new Error('Supabase rejected inserting into works (RLS): ' + (insWorkErr.message || insWorkErr.code));
            }
          }
        }
      }

      // 5. Synchronize to public.site_settings table
      if (contentData.settings) {
        const s = contentData.settings;
        const settingsRow = {
          id: 1,
          stats: {
            statVideos: s.statVideos || '',
            statYears: s.statYears || '',
            statArtists: s.statArtists || '',
            statDirectors: s.statDirectors || '',
            aboutArtists: s.aboutArtists || 0,
            aboutDirectors: s.aboutDirectors || 0,
            aboutYears: s.aboutYears || 0
          },
          contact_email: String(s.contactEmail1 || 'chinoetales@gmail.com').trim(),
          phones: Array.isArray(s.phones) ? s.phones : [],
          location: String(s.location || '').trim(),
          playlist_url: String(s.playlist || '').trim(),
          social_links: Array.isArray(s.social) ? s.social : [],
          top10_titles: Array.isArray(s.top10) ? s.top10 : [],
          copyright: String(s.copyright || '© 2026 Chinoétales Films Pvt. Ltd.').trim(),
          updated_at: new Date().toISOString()
        };
        const { error: setErr } = await sb.from('site_settings').upsert(settingsRow);
        if (setErr) {
          console.warn('Notice: site_settings sync warning:', setErr);
        }
      }

      // 6. Synchronize to public.site_theme table
      if (contentData.theme) {
        const themeRow = {
          id: 1,
          tokens: contentData.theme,
          font_face: String(contentData.theme.fontFace || ''),
          updated_at: new Date().toISOString()
        };
        const { error: themeErr } = await sb.from('site_theme').upsert(themeRow);
        if (themeErr) {
          console.warn('Notice: site_theme sync warning:', themeErr);
        }
      }

      return { success: true };
    },

    // Submit client contact inquiry
    submitInquiry: async function (inquiryData) {
      const record = {
        name: String(inquiryData.name || '').trim(),
        email: String(inquiryData.email || '').trim().toLowerCase(),
        project_type: String(inquiryData.type || '').trim(),
        timeline: String(inquiryData.timeline || '').trim(),
        artist_brand: String(inquiryData.artist || '').trim(),
        brief: String(inquiryData.brief || '').trim(),
        status: 'new'
      };

      const sb = getClient();
      if (sb) {
        // Do NOT chain .select() — public users have INSERT rights, not SELECT rights.
        const { error } = await sb.from('inquiries').insert([record]);
        if (!error) return { success: true };
        if (error.code === '23514') {
          throw new Error('Please ensure your name, email format, and brief meet submission requirements.');
        }
        console.warn('Supabase JS insert error, trying direct REST fetch:', error);
      }

      // Direct REST fallback with Prefer: return=minimal
      const config = global.CHINOE_CONFIG;
      if (config && config.SUPABASE_URL && config.SUPABASE_ANON_KEY) {
        const endpoint = `${config.SUPABASE_URL}/rest/v1/inquiries`;
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'apikey': config.SUPABASE_ANON_KEY,
            'Authorization': 'Bearer ' + config.SUPABASE_ANON_KEY,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(record)
        });

        if (res.ok || res.status === 201) {
          return { success: true };
        }
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || 'Submission could not be completed at this time.');
      }

      throw new Error('Supabase client is not configured.');
    }
  };

  global.ChinoeAuth = Auth;
  global.ChinoeStorage = Storage;
  global.ChinoeData = Data;
  global.getSupabaseClient = getClient;
})(typeof window !== 'undefined' ? window : this);
