import { useLoaderData } from "remix";
import { definitions } from "types/supabase";
import { useSupabase } from "~/utils/supabase-client";
import { supabase } from "~/utils/supabase.server";
import { Temporal } from "@js-temporal/polyfill";
import { Layout } from "~/components/layout";

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
  else if (d.minutes > 0) return `${d.minutes} minutes ago`;
  else return `${d.seconds} seconds ago`;
};

export default function Index() {
  const loaderData = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  return (
    <Layout>
      <div className="flex flex-col gap-2">
        {loaderData.scraps.data?.map((scrap) => (
          <article
            className="flex justify-between items-center p-4 bg-gray-50 rounded-md"
            key={scrap.id}
          >
            <div>
              <a href={`/scraps/${scrap.id}`}>
                <h2 className="text-2xl font-bold">{scrap.title}</h2>
              </a>
              <small className="text-sm">
                Created {showTime(scrap.created_at, loaderData.nowTime)}
              </small>
            </div>
            <div>{0}</div>
          </article>
        ))}
      </div>
    </Layout>
  );
}
