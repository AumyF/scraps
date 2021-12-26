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

type LoaderData = definitions["scraps"];

export const loader = async ({ params }: Parameters<LoaderFunction>["0"]) => {
  params.id ??
    (() => {
      throw new Error(`id is undefined`);
    })();
  const scrap = await getScrap(params.id);
  return json(scrap);
};

const ScrapId: VFC = () => {
  const { data: scrap } = useLoaderData<{ data: LoaderData }>();
  console.log(JSON.stringify(scrap));
  return (
    <Layout>
      <h1 className="text-3xl font-bold">{scrap.title}</h1>
      <div>
        <time>Created at {scrap.created_at}</time>
      </div>
    </Layout>
  );
};

export default ScrapId;
