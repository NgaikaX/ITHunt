import { Layout } from "../components";
import store from "@/store/modules";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import withAuth from "@/components/withAuth";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router);
  const isAuthPage =
    router.pathname === "/login" || router.pathname === "/signup";
  const ProtectedComponent = isAuthPage ? Component : withAuth(Component);

  return (
    <Provider store={store}>
      {isAuthPage ? (
        <ProtectedComponent {...pageProps} />
      ) : (
        <Layout>
          <ProtectedComponent {...pageProps} />
        </Layout>
      )}
    </Provider>
  );
}
