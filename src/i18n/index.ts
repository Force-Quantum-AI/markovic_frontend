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
import enAdminDashboard from "./locales/en/adminJson/dashboard.json";
import meAdminDashboard from "./locales/me/adminJson/dashboard.json";
import enAdminMyUsers from "./locales/en/adminJson/myUsers.json";
import meAdminMyUsers from "./locales/me/adminJson/myUsers.json";
import enAdminSubPackages from "./locales/en/adminJson/subscriptionPackages.json";
import meAdminSubPackages from "./locales/me/adminJson/subscriptionPackages.json";
import enAdminSubRequests from "./locales/en/adminJson/subscriptionRequests.json";
import meAdminSubRequests from "./locales/me/adminJson/subscriptionRequests.json";
import enAdminLawDb from "./locales/en/adminJson/lawDatabase.json";
import meAdminLawDb from "./locales/me/adminJson/lawDatabase.json";
import enAdminArchiveCases from "./locales/en/adminJson/archiveCases.json";
import meAdminArchiveCases from "./locales/me/adminJson/archiveCases.json";
import enAdminCategories from "./locales/en/adminJson/categories.json";
import meAdminCategories from "./locales/me/adminJson/categories.json";
import enAdminSystemSettings from "./locales/en/adminJson/systemSettings.json";
import meAdminSystemSettings from "./locales/me/adminJson/systemSettings.json";
import enUserCalendar from "./locales/en/userJson/calendar.json";
import meUserCalendar from "./locales/me/userJson/calendar.json";

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
    detection: {
        order: ["localStorage"],
        caches: ["localStorage"],
    },
    resources: {
        en: {
            common: enCommon,
            sideAndTopBar: enSidebar,
            auth: enAuth,
            modals: enModals,
            adminDashboard: enAdminDashboard,
            adminMyUsers: enAdminMyUsers,
            adminSubscriptionPackages: enAdminSubPackages,
            adminSubscriptionRequests: enAdminSubRequests,
            adminLawDatabase: enAdminLawDb,
            adminArchiveCases: enAdminArchiveCases,
            adminCategories: enAdminCategories,
            adminSystemSettings: enAdminSystemSettings,
            userCalendar: enUserCalendar,
        },
        me: {
            common: meCommon,
            sideAndTopBar: meSidebar,
            auth: meAuth,
            modals: meModals,
            adminDashboard: meAdminDashboard,
            adminMyUsers: meAdminMyUsers,
            adminSubscriptionPackages: meAdminSubPackages,
            adminSubscriptionRequests: meAdminSubRequests,
            adminLawDatabase: meAdminLawDb,
            adminArchiveCases: meAdminArchiveCases,
            adminCategories: meAdminCategories,
            adminSystemSettings: meAdminSystemSettings,
            userCalendar: meUserCalendar,
        },
    },

    fallbackLng: "en",

    defaultNS: "common",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;


// import { useTranslation } from "react-i18next";

// const { t } = useTranslation("auth");

// <h2>{t("login")}</h2>