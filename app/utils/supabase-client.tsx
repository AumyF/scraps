import { SupabaseClient } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext, VFC } from "react";

export const SupabaseContext = createContext<SupabaseClient>(
  undefined as unknown as SupabaseClient
);

export const SupabaseProvider: VFC<
  PropsWithChildren<{ supabase: SupabaseClient }>
> = ({ children, supabase }) => (
  <SupabaseContext.Provider value={supabase}>
    {children}
  </SupabaseContext.Provider>
);

export const useSupabase = () => useContext(SupabaseContext);
