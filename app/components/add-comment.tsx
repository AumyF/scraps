import { useState, VFC } from "react";
import { definitions } from "types/supabase";
import { useSupabase } from "~/utils/supabase-client";

export const AddComment: VFC<{ scrapId: string }> = ({ scrapId }) => {
  const [body, setBody] = useState("");
  const supabase = useSupabase();

  const addNewComment = async () => {
    await supabase.from<definitions["comments"]>("comments").insert({
      scrap_id: scrapId,
      body,
    });
    setBody(() => "");
  };

  return (
    <div className="card">
      <textarea
        className="w-full p-2 rounded"
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
