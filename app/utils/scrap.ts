import { definitions } from "types/supabase";
import { supabase } from "~/utils/supabase.server";

export async function getScrap(id: string) {
  const scrap = await supabase
    .from<definitions["scraps"]>("scraps")
    .select("*")
    .eq("id", id)
    .single();

  return scrap;
}

export async function getComments(scrapId: string) {
  const comments = await supabase
    .from<definitions["comments"]>("comments")
    .select("*")
    .eq("scrap_id", scrapId)
    .order("created_at");

  return comments;
}
