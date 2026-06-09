"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tab } from "@/types/settingPageTabs";
import { Bell, Dock, Globe, Lock, Shield, User } from "lucide-react";
import Password from "./Password";
import Language from "./Language";
import Account from "./Account";
const tabs:Tab[]=[  
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
            <Tabs defaultValue="account" orientation="vertical">
                <TabsList className="bg-white mr-2">
                    {tabs.map((tab) => (
                        <TabsTrigger className="py-3 px-2 data-[state=active]:bg-[#135576] data-[state=active]:text-white" key={tab.value} value={tab.value}>
                            {tab.icon}
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="account"><Account/></TabsContent>
                <TabsContent value="password"><Password/></TabsContent>
                {/* <TabsContent value="notifications"><Notification/></TabsContent>
                <TabsContent value="subscription"><Subscription/></TabsContent> */}
                <TabsContent value="language"><Language/></TabsContent>
                {/* <TabsContent value="privacy"><Privacy/></TabsContent> */}
            </Tabs>
        </div>
    );
}