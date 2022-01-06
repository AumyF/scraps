import { createClient } from "@supabase/supabase-js";
import { createCookieSessionStorage } from "remix";

declare const SUPABASE_URL: string;
declare const SUPABASE_KEY: string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { fetch });

export const supabaseSession = createCookieSessionStorage({
  cookie: {
    name: "supabase-session",
    sameSite: "lax",
  },
});

export const setAuthToken = async (request: Request) => {
  const session = await supabaseSession.getSession(
    request.headers.get("Cookie")
  );

  supabase.auth.setAuth(session.get("access_token"));

  return session;
};
