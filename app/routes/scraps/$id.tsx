import { VFC } from "react";
import { json, LoaderFunction, useLoaderData } from "remix";
import { definitions } from "types/supabase";
import { Layout } from "~/components/layout";
import { supabase } from "~/utils/supabase.server";

async function getScrap(id: string) {
  const scrap = await supabase
    .from<definitions["scraps"]>("scraps")
    .select("*")
    .eq("id", id)
    .single();

  return scrap;
}

async function getComments(scrapId: string) {
  const comments = await supabase
    .from<definitions["comments"]>("comments")
    .select("*")
    .eq("scrap_id", scrapId)
    .order("created_at");

  return comments;
}

type LoaderResult<T> = { error: unknown; data: T };

type LoaderData = {
  scrap: LoaderResult<definitions["scraps"]>;
  comments: LoaderResult<definitions["comments"][]>;
};

export const loader = async ({ params }: Parameters<LoaderFunction>["0"]) => {
  params.id ??
    (() => {
      throw new Error(`id is undefined`);
    })();

  const scrap = await getScrap(params.id);
  const comments = await getComments(params.id);
  return { scrap, comments };
};

const ScrapId: VFC = () => {
  const { scrap, comments } = useLoaderData<LoaderData>();
  console.log(comments);
  return (
    <Layout>
      <div className="py-2">
        <h1 className="text-3xl font-bold">{scrap.data.title}</h1>
        <time>Created at {scrap.data.created_at}</time>
      </div>
      <div className="flex flex-col gap-2">
        {comments.data.map((comment) => (
          <div className="card" id={comment.id}>
            <div className="text-sm">
              <a href={`/scraps/${comment.scrap_id}#${comment.id}`}>
                <time>Created at {comment.created_at}</time>
              </a>
            </div>
            <div className="">{comment.body}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ScrapId;
