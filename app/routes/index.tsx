import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { useEffect, useState } from "react";
import { useLoaderData } from "remix";
import { definitions } from "types/supabase";
import { useSupabase } from "~/utils/supabase-client";
import { supabase } from "~/utils/supabase.server";

export async function loader() {
  // return { allScraps: await getAllScraps() };
  return { scraps: await getAllScraps() };
}

async function getAllScraps() {
  const allScraps = await supabase
    .from<definitions["scraps"]>("scraps")
    .select("title,id");

  return allScraps;
}

export default function Index() {
  const loaderData = useLoaderData<Awaited<ReturnType<typeof loader>>>();
  const supabase = useSupabase();

  // const [data, setData] = useState<definitions["scraps"]>();

  // useEffect(() => {
  //   (async () => {
  //     const data = await supabase
  //       .from<definitions["scraps"]>("scraps")
  //       .select("*");

  //     setData(() => data)
  //   })();
  // });

  return (
    <div>
      <h1>Welcome to Remix</h1>
      <div>
        {loaderData.scraps.data?.map((scrap) => (
          <div key={scrap.id}>{scrap.title}</div>
        ))}
      </div>
      {JSON.stringify(loaderData)}
    </div>
  );
}
