import { PageHeadingTitle } from "@/components/shared/PageHeadingTitle";
import SettingPage from "@/components/user/settings/SettingPage";

export default function SettingsPage() {
    return (
        <div>
            <PageHeadingTitle
                title="Settings"
                subtitle="Manage your account preferences"
            />
            <SettingPage/>
        </div>
    );
}   