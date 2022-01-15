import { VFC } from "react";
import { Link } from "remix";

import { useSupabase } from "~/utils/supabase-client";

export const Header: VFC = () => {
  const supabase = useSupabase();
  const user = supabase.auth.user();

  const signedIn = user !== null;
  return (
    <header className="flex border-b border-gray-200">
      <div className="flex justify-between p-4 mx-auto w-full max-w-6xl">
        <a href="/">
          <h1 className="text-3xl font-bold">Scrap</h1>
        </a>
        {signedIn ? (
          <Link to="/scraps/new" className="button brand">
            New Scrap
          </Link>
        ) : (
          <Link to="/auth" className="button brand">
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
};
