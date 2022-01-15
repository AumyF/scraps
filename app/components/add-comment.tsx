import { useState, VFC } from "react";
import { definitions } from "types/supabase";

import { useSupabase } from "~/utils/supabase-client";

export const AddComment: VFC<{ scrapId: string }> = ({ scrapId }) => {
  const [body, setBody] = useState("");
  const supabase = useSupabase();

  const addNewComment = async () => {
    await supabase.from<definitions["comments"]>("comments").insert({
      body,
      scrap_id: scrapId,
      user_id: supabase.auth.user()?.id,
    });
    setBody(() => "");
  };

  return (
    <div className="card">
      <textarea
        className="p-2 w-full rounded"
        id="new-comment"
        rows={10}
        placeholder="Add comment to the scrap"
        value={body}
        onChange={(v) => setBody(() => v.target.value)}
      ></textarea>
      <div className="flex justify-end">
        <button onClick={addNewComment} className="button brand">
          Post
        </button>
      </div>
    </div>
  );
};
