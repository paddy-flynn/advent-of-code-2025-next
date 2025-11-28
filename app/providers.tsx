'use client';

import { Provider } from "jotai";
import PlausibleProvider from "next-plausible";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
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
        {children}
      </Provider>
    </PlausibleProvider>
  );
}
