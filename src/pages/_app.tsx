import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "@/Reducer/store";
import { Toaster } from "react-hot-toast";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  const getLayout: any = Component.getLayout || ((page: any) => page);

  return (
    <>
      <Head>
        <link rel="icon" href="/images/logo.png" type="image/x-icon" />
      </Head>
      <Provider store={store}>
        <SessionProvider session={session}>
          {getLayout(<Component {...pageProps} />)}
          <Toaster />
          <ToastContainer />
        </SessionProvider>
      </Provider>
    </>
  );
}
