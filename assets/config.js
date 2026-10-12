/**
 * Chinoétales Productions — Client Environment & Supabase Configuration
 *
 * NOTE: Only the public URL and public ANON key belong in client-side code.
 * The service_role key must NEVER be included here.
 */
(function (global) {
  'use strict';

  const defaultUrl = 'https://jfwynwnqeilaqtbgiuqc.supabase.co';
  const defaultKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmd3lud25xZWlsYXF0YmdpdXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMzUyOTAsImV4cCI6MjEwNjYxMTI5MH0.3wr2QMebMe-9Tffh0TbcWD9tuY-55iwsLo0o6cDiUfY';

  function cleanVal(v, fallback) {
    if (v && typeof v === 'string') {
      const s = v.trim();
      if (s && !s.includes('your-project-id') && !s.includes('your-anon-public-key')) {
        return s;
      }
    }
    return fallback;
  }

  const url = cleanVal((global.ENV && global.ENV.SUPABASE_URL) || localStorage.getItem('sb_url'), defaultUrl);
  const anonKey = cleanVal((global.ENV && global.ENV.SUPABASE_ANON_KEY) || localStorage.getItem('sb_key'), defaultKey);

  global.CHINOE_CONFIG = {
    SUPABASE_URL: url.replace(/\/$/, ''),
    SUPABASE_ANON_KEY: anonKey,
    isConfigured: function () {
      return !!(this.SUPABASE_URL && this.SUPABASE_ANON_KEY);
    }
  };
})(typeof window !== 'undefined' ? window : this);
