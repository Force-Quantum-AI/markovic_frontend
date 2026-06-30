"use client"
import { PageHeadingTitle } from "@/components/shared/PageHeadingTitle";
import SettingPage from "@/components/user/settings/SettingPage";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
    const {t} = useTranslation("common");
    return (
        <div>
            <PageHeadingTitle
                title={t("settings")}
                subtitle={t("settings_subtitle")}
            />
            <SettingPage/>
        </div>
    );
}   