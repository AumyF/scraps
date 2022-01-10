import { createClient } from "@supabase/supabase-js";
import { PropsWithChildren, VFC } from "react";
import type { MetaFunction } from "remix";
import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";

import styles from "./tailwind.css";
import { SupabaseProvider } from "./utils/supabase-client";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

declare const SUPABASE_URL: string;
declare const SUPABASE_KEY: string;

export const links: LinksFunction = () => {
  return [{ href: styles, rel: "stylesheet" }];
};

export const loader = () => {
  return {
    supabaseKey: SUPABASE_KEY,
    supabaseUrl: SUPABASE_URL,
  };
};

const Document: VFC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
};

export default function App() {
  const loaderData = useLoaderData<ReturnType<typeof loader>>();

  const supabase = createClient(loaderData.supabaseUrl, loaderData.supabaseKey);

  return (
    <Document>
      <SupabaseProvider supabase={supabase}>
        <Outlet />
      </SupabaseProvider>
    </Document>
  );
}
