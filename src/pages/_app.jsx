import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { getProfile } from "@/axios/axios";
import "@smastrom/react-rating/style.css";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);
  if (typeof window !== "undefined" && localStorage.getItem("accessToken")) {
    store.dispatch(getProfile());
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/images/logo.png" type="image/x-icon" />
      </Head>
      <Provider store={store}>
        <SessionProvider session={session}>
          <ProgressBar
            height="3px"
            color="#35B900"
            options={{ showSpinner: true }}
            shallowRouting
          />
          {getLayout(<Component {...pageProps} />)}
          <Toaster />
          <ToastContainer />
        </SessionProvider>
      </Provider>
    </>
  );
}
