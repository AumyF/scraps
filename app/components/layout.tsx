import { PropsWithChildren, VFC } from "react";
import { Header } from "./header";

export const Layout: VFC<PropsWithChildren<{}>> = ({ children }) => (
  <div>
    <Header />
    <main className="container mx-auto">{children}</main>
  </div>
);
