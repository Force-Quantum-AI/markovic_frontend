"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tab } from "@/types/settingPageTabs";
import { Bell, Dock, Globe, Lock, Shield, User } from "lucide-react";
import Password from "./Password";
import Language from "./Language";
import Account from "./Account";
import Notification from "./Notification";
import Privacy from "./Privacy";
const tabs: Tab[] = [
    {
        value: "account",
        label: "Account",
        icon: <User className="text-lg" />,
    },
    {
        value: "password",
        label: "Security & Password",
        icon: <Lock className="text-lg" />,
    },
    {
        value: "notifications",
        label: "Notifications",
        icon: <Bell className="text-lg" />,
    },
    {
        value: "subscription",
        label: "Subscription & Billing",
        icon: <Dock className="text-lg" />,
    },
    {
        value: "language",
        label: "Language & Region",
        icon: <Globe className="text-lg" />,
    },
    {
        value: "privacy",
        label: "Privacy",
        icon: <Shield className="text-lg" />,
    },
]
export default function SettingPage() {
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