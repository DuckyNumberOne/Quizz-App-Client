import Login from "@/lib/hook/Context/login";
import Layout from "@/lib/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../../src/lib/state/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Provider store={store}>
        <div className="bg-white">
          <div className="py-10">
            <Component {...pageProps} />;
          </div>
        </div>
      </Provider>
    </Layout>
  );
}
