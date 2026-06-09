"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tab } from "@/types/settingPageTabs";
import { Bell, Dock, Globe, Lock, Shield, User } from "lucide-react";
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
                <TabsList>
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            {tab.icon}
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
        </div>
    );
}