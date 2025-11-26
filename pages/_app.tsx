import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FC } from "react";
import { Provider } from "jotai";
import PlausibleProvider from "next-plausible";

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <PlausibleProvider
    domain="advent-of-code-next.vercel.app"
    trackOutboundLinks={true}
    scriptProps={{
      src: "/stats/js/script.js",
      // @ts-ignore
      "data-api": "/stats/api/event",
    }}
  >
    <Provider>
      <Component {...pageProps} />
    </Provider>
  </PlausibleProvider>
);

export default App;
