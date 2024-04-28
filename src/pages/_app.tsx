import Layout from "@/lib/components/layout/DefaultLayout";
import "@/styles/globals.css";
import "@/styles/loading.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../../src/lib/state/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Provider store={store}>
        <div className="bg-white">
          <Component {...pageProps} />;
        </div>
      </Provider>
    </Layout>
  );
}
