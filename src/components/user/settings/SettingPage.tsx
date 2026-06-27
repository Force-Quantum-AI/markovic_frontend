"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tab } from "@/types/settingPageTabs";
import { Bell, Dock, Globe, Lock, Shield, User } from "lucide-react";
import Password from "./Password";
import Language from "./Language";
import Account from "./Account";
import Notification from "./Notification";
import Privacy from "./Privacy";
import Subscription from "./Subscription";
import { useTranslation } from "react-i18next";

export default function SettingPage() {
    const {t} = useTranslation("common");

    const tabs: Tab[] = [
    {
        value: "account",
        label: t("account"),
        icon: <User className="text-lg" />,
    },
    {
        value: "password",
        label: t("security_password"),
        icon: <Lock className="text-lg" />,
    },
    {
        value: "notifications",
        label: t("notifications"),
        icon: <Bell className="text-lg" />,
    },
    {
        value: "subscription",
        label: t("subscription_billing"),
        icon: <Dock className="text-lg" />,
    },
    {
        value: "language",
        label: t("language_region"),
        icon: <Globe className="text-lg" />,
    },
    {
        value: "privacy",
        label: t("privacy"),
        icon: <Shield className="text-lg" />,
    },
]
    return (
        <div className="bg-white rounded-2xl p-3">
            <Tabs
                defaultValue="account"
                orientation="vertical"
                className="flex flex-col lg:flex-row gap-4"
            >
                <TabsList
                    className="
                    bg-white
                    w-full
                    md:w-auto
                    flex
                    flex-wrap
                    md:flex-col
                    justify-start
                    md:justify-normal
                    h-auto
                    gap-2
                    mr-0
                    md:mr-2
                    "
                >
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="
                                    py-3
                                    px-3
                                    data-[state=active]:bg-[#135576]
                                    data-[state=active]:text-white
                                    whitespace-nowrap
                                    "
                        >
                            {tab.icon}
                            <span className="ml-2">{tab.label}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>

                <div className="flex-1">
                    <TabsContent value="account">
                        <Account />
                    </TabsContent>

                    <TabsContent value="password">
                        <Password />
                    </TabsContent>

                    <TabsContent value="notifications">
                        <Notification />
                    </TabsContent>
                    
                    <TabsContent value="subscription">
                        <Subscription />
                    </TabsContent>

                    <TabsContent value="language">
                        <Language />
                    </TabsContent>

                    <TabsContent value="privacy">
                        <Privacy />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}