"use client";

import { store } from "@/store/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import i18n from "@/i18n";
import { setClientSideLanguage } from "@/store/features/language/language.client.slice";

function LanguageInitializer() {
  useEffect(() => {
    if (i18n.language) {
      // Normalize language: e.g. "en-US" -> "en"
      const lang = i18n.language.startsWith("en") ? "en" : "me";
      store.dispatch(setClientSideLanguage(lang));
    }
  }, []);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <LanguageInitializer />
      {children}
    </Provider>
  );
}