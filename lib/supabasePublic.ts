// Public-facing Supabase client for reading published content.
// Uses the anon key (not service_role) — matches the RLS policy that
// only allows reading non-deleted posts. Never use this client for writes.
import { createClient } from "@supabase/supabase-js";

export const supabasePublic = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);