import { createClient } from "@supabase/supabase-js";

declare const SUPABASE_URL: string;
declare const SUPABASE_KEY: string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { fetch });
