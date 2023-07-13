"use client";

import { setupStore } from "./store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={setupStore}>{children}</Provider>;
}