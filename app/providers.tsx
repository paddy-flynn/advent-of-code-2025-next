'use client';

import { Provider } from "jotai";
import { ReactNode } from "react";
import FlyingSanta from "@/components/FlyingSanta";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <FlyingSanta />
      {children}
    </Provider>
  );
}
