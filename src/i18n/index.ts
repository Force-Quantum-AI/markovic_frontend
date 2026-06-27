"use client"
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "./locales/en/common.json";
import meCommon from "./locales/me/common.json";
import enAuth from "./locales/en/auth.json";
import meAuth from "./locales/me/auth.json";
import enSidebar from "./locales/en/sideAndTopBar.json";
import meSidebar from "./locales/me/sideAndTopBar.json";
import enModals from "./locales/en/modals.json";
import meModals from "./locales/me/modals.json";

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
    resources: {
        en: {
            common: enCommon,
            sideAndTopBar: enSidebar,
            auth: enAuth,
            modals: enModals,
        },
        me: {
            common: meCommon,
            sideAndTopBar: meSidebar,
            auth: meAuth,
            modals: meModals,
        },
    },

    fallbackLng: "me",

    defaultNS: "common",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;


// import { useTranslation } from "react-i18next";

// const { t } = useTranslation("auth");

// <h2>{t("login")}</h2>