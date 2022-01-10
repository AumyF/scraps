import { Button } from "@supabase/ui";
import { useState, VFC } from "react";
import { useNavigate } from "remix";
import { definitions } from "types/supabase";

import { Layout } from "~/components/layout";
import { useSupabase } from "~/utils/supabase-client";

const NewScrap: VFC = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = useSupabase();
  const navigate = useNavigate();

  const titleEmpty = () => !title;

  return (
    <Layout>
      <h1>Create a new scrap</h1>
      <label className="flex gap-2">
        <span>Scrap title</span>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(() => event.target.value)}
        />
      </label>
      <Button
        className="button"
        disabled={titleEmpty()}
        loading={loading}
        onClick={async () => {
          setLoading(() => true);
          const p = await supabase
            .from<definitions["scraps"]>("scraps")
            .insert({
              title,
              user_id: supabase.auth.user()?.id,
            })
            .single();

          setLoading(false);
          if (p.body == undefined) return;
          navigate(`/scraps/${p.body.id}`);
        }}
      >
        Create scrap
      </Button>
    </Layout>
  );
};

export default NewScrap;
