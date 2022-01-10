import { PropsWithChildren, VFC } from "react";

import { Header } from "./header";

export const Layout: VFC<PropsWithChildren<{}>> = ({ children }) => (
  <div>
    <Header />
    <main className="p-4 mx-auto max-w-6xl">{children}</main>
  </div>
);
