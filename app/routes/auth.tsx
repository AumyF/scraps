import { Auth } from "@supabase/ui";
import { PropsWithChildren, VFC } from "react";

import { Layout } from "~/components/layout";
import { useSupabase } from "~/utils/supabase-client";

const Inner: VFC<PropsWithChildren<{}>> = ({ children }) => {
  const { user } = Auth.useUser();

  if (user) {
    return <div>Signed in: {user.email}</div>;
  }

  return <>{children}</>;
};

const AuthPage = () => {
  const supabase = useSupabase();

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Layout>
        <Inner>
          <div className="w-1/2">
            <Auth
              supabaseClient={supabase}
              onlyThirdPartyProviders
              providers={["github"]}
            />
          </div>
        </Inner>
      </Layout>
    </Auth.UserContextProvider>
  );
};

export default AuthPage;
