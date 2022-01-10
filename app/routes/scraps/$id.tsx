import { VFC } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { definitions } from "types/supabase";

import { AddComment } from "~/components/add-comment";
import { Layout } from "~/components/layout";
import { ScrapTitle } from "~/components/scrap-title";
import { getComments, getScrap } from "~/utils/scrap";

type LoaderResult<T> = { data: T, error: unknown; };

type LoaderData = {
  comments: LoaderResult<definitions["comments"][]>;
  scrap: LoaderResult<definitions["scraps"]>;
};

export const loader = async ({ params }: Parameters<LoaderFunction>["0"]) => {
  params.id ??
    (() => {
      throw new Error(`id is undefined`);
    })();

  const scrap = await getScrap(params.id);
  const comments = await getComments(params.id);
  return { comments, scrap };
};

const ScrapId: VFC = () => {
  const { comments, scrap } = useLoaderData<LoaderData>();
  console.log(comments);

  return (
    <Layout>
      <div className="py-2">
        <ScrapTitle title={scrap.data.title} id={scrap.data.id} />
        <time>Created at {scrap.data.created_at}</time>
      </div>
      <div className="flex flex-col gap-2">
        {comments.data.length === 0 ? (
          <div className="card">
            <div className="text-center">There is no comments yet.</div>
          </div>
        ) : (
          comments.data.map((comment) => (
            <div
              className="card"
              id={`#comment-${comment.id}`}
              key={comment.id}
            >
              <div className="text-sm">
                <a href={`/scraps/${comment.scrap_id}#comment-${comment.id}`}>
                  <time>Created at {comment.created_at}</time>
                </a>
              </div>
              <div className="">{comment.body}</div>
            </div>
          ))
        )}
        <AddComment scrapId={scrap.data.id} />
      </div>
    </Layout>
  );
};

export default ScrapId;
