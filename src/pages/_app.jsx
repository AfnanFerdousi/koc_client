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
import NextTopLoader from "nextjs-toploader";

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
          <NextTopLoader
            color="#35B900"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #35B900,0 0 5px #35B900"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
          {getLayout(<Component {...pageProps} />)}
          <Toaster />
          <ToastContainer />
        </SessionProvider>
      </Provider>
    </>
  );
}
