import "@/styles/globals.css";
import "@/styles/loading.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../../src/lib/state/store";
import Layout from "@/lib/components/layout/defaultLayouts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <div className="bg-white">
          <Component {...pageProps} />
        </div>
      </Layout>
    </Provider>
  );
}
