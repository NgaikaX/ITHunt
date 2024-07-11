import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log("Current path:", router.pathname);
  const isAuthPage = /^\/(sign-in|sign-up|login)(\/.*)?$/.test(router.pathname);

  return (
    <ClerkProvider>
      {isAuthPage ? (
        <>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Component {...pageProps} />
        </>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ClerkProvider>
  );
}
