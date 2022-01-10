import { VFC } from "react";
import { Link } from "remix";

export const Header: VFC = () => (
  <header className="flex border-b border-gray-200">
    <div className="flex justify-between p-4 mx-auto w-full max-w-6xl">
      <a href="/">
        <h1 className="text-3xl font-bold">Scrap</h1>
      </a>
      <Link to="/scraps/new" className="button brand">
        New Scrap
      </Link>
    </div>
  </header>
);
