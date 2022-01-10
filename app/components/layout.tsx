import { PropsWithChildren, VFC } from "react";

import { Header } from "./header";

export const Layout: VFC<PropsWithChildren<{}>> = ({ children }) => (
  <div>
    <Header />
    <main className="max-w-6xl mx-auto p-4">{children}</main>
  </div>
);
