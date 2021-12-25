import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { useEffect, useState } from "react";
import { useLoaderData } from "remix";
import { definitions } from "types/supabase";
import { useSupabase } from "~/utils/supabase-client";
import { supabase } from "~/utils/supabase.server";
import { Temporal } from "@js-temporal/polyfill";

export async function loader() {
  // return { allScraps: await getAllScraps() };

  return {
    scraps: await getAllScraps(),
    nowTime: Temporal.Now.instant().toString(),
  };
}

async function getAllScraps() {
  const allScraps = await supabase
    .from<definitions["scraps"]>("scraps")
    .select("*");

  return allScraps;
}

const showTime = (time: string, nowTime: string) => {
  const zdt = Temporal.Instant.from(time);

  const d = zdt.until(nowTime).round({ largestUnit: "year" });
  console.log(d.minutes);
  console.log(d.hours);
  if (d.years > 0) return `${d.years} years ago`;
  else if (d.months > 0) return `${d.months} months ago`;
  else if (d.days > 0) return `${d.days} days ago`;
  else if (d.hours > 0) return `${d.hours} hours ago`;
  else return `${d.seconds} seconds ago`;
};

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
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Scrap</h1>
      <div>
        {loaderData.scraps.data?.map((scrap) => (
          <article
            className="flex justify-between items-center p-4"
            key={scrap.id}
          >
            <div>
              <h2 className="text-2xl font-bold">{scrap.title}</h2>
              <small className="text-sm">
                Created {showTime(scrap.created_at, loaderData.nowTime)}
              </small>
            </div>
            <div>{0}</div>
          </article>
        ))}
      </div>
      <pre className="overflow-scroll">
        <code>{JSON.stringify(loaderData)}</code>
      </pre>
    </div>
  );
}
