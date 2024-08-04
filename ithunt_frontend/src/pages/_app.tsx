import { Layout } from "../components";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import withAuth from "@/components/withAuth";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthPage =
      router.pathname === "/login" || router.pathname === "/signup";
  const ProtectedComponent = isAuthPage ? Component : withAuth(Component);

  return (
      <>
        {isAuthPage ? (
            <ProtectedComponent {...pageProps} />
        ) : (
            <Layout>
              <ProtectedComponent {...pageProps} />
            </Layout>
        )}
      </>
  );
}
