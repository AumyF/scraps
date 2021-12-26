import { VFC } from "react";

export const Header: VFC = () => (
  <header className="flex border-b border-gray-200 py-2">
    <div className="container mx-auto">
      <a href="/">
        <h1 className="text-3xl font-bold">Scrap</h1>
      </a>
    </div>
  </header>
);
