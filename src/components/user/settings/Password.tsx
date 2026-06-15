"use client";
import { useState } from "react";
import { Eye, EyeOff, Loader, Monitor, Smartphone } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useGetProfileInfoQuery, useUpdateProfileInfoMutation } from "@/store/features/profile/profile.api";
import { useUpdatePasswordMutation } from "@/store/features/auth/authApi";
import { useGetActiveSessionQuery, useRevokeActiveSessionMutation } from "@/store/features/setting/setting.api";

export default function Password() {
  const { data: profileInfo, isLoading: isLoadingProfileInfo } = useGetProfileInfoQuery({});
  const [updateProfileInfo, { isLoading: isLoadingUpdateProfileInfo }] = useUpdateProfileInfoMutation();
  const [updatePassword, { isLoading: isLoadingUpdatePassword }] = useUpdatePasswordMutation();
  const { data: activeSessions, isLoading: isLoadingActiveSessions } = useGetActiveSessionQuery({});
  const [revokeActiveSession] = useRevokeActiveSessionMutation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const [sessions, setSessions] = useState([
    { id: 1, device: "MacBook Pro", icon: Monitor, location: "Podgorica, Montenegro", time: "Last active 2 hours ago", current: true },
    { id: 2, device: "iPhone 14 Pro", icon: Smartphone, location: "Podgorica, Montenegro", time: "Last active 1 day ago", current: false },
    { id: 3, device: "Windows Desktop", icon: Monitor, location: "Belgrade, Serbia", time: "Last active 3 days ago", current: false },
  ]);

  const handleRevoke = (id: number) => {
    setSessions(sessions.filter(s => s.id !== id));
    toast.success("Session revoked successfully");
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      await updatePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      }).unwrap();
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to update password");
    }
  };

  const getStrength = (pwd: string) => {
    if (pwd.length === 0) return 0;
    if (pwd.length < 6) return 30;
    if (pwd.length < 10) return 60;
    return 100;
  };
  const strength = getStrength(newPassword);

  const handleTwoFactorAuthChange = async () => {
    const value = !profileInfo?.two_factor_enabled;
    try {
      await updateProfileInfo({
        data: {
          two_factor_enabled: value,
        },
      });
      toast.success("Profile information updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile information");
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Change Password */}
      <div className="bg-white border border-[#e8eef2] p-6 rounded-2xl flex flex-col gap-6 w-full">
        <h2 className="text-[#101828] text-xl font-semibold leading-7">Change Password</h2>

        {/* Current Password */}
        <div className="flex flex-col gap-2">
          <label className="text-[#364153] text-sm font-medium">Current Password</label>
          <div className="relative h-[50px] w-full">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="*******"
              className="w-full h-full bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#364153] text-base focus:outline-none focus:border-[#135576]"
            />
            <button
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCurrent ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="flex flex-col gap-2">
          <label className="text-[#364153] text-sm font-medium">New Password</label>
          <div className="relative h-[50px] w-full">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="*******"
              className="w-full h-full bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#364153] text-base focus:outline-none focus:border-[#135576]"
            />
            <button
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNew ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* Password Strength */}
        <div className="flex flex-col gap-2 relative mt-[-8px]">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[#4a5565] text-xs">Password Strength</span>
            <span className="text-[#4a5565] text-xs">{strength}%</span>
          </div>
          <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${strength > 60 ? 'bg-[#007a55]' : strength > 30 ? 'bg-[#f0b100]' : strength > 0 ? 'bg-[#e7000b]' : 'bg-transparent'}`}
              style={{ width: `${Math.max(strength, 2)}%` }}
            ></div>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="flex flex-col gap-2">
          <label className="text-[#364153] text-sm font-medium">Confirm New Password</label>
          <div className="relative h-[50px] w-full">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="*******"
              className="w-full h-full bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#364153] text-base focus:outline-none focus:border-[#135576]"
            />
            <button
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* Update Password Button */}
        <div className="border-t border-[#e5e7eb] mt-2 pt-6 flex justify-end">
          <button
            onClick={handleUpdatePassword}
            disabled={isLoadingUpdatePassword}
            className="bg-[#135576] hover:bg-[#0f435c] text-white text-base font-medium py-3 px-6 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingUpdatePassword ? "Updating..." : "Update password"}
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white border border-[#eff1f4] p-6 rounded-2xl flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <h3 className="text-[#101828] text-lg font-semibold">Two-Factor Authentication</h3>
          <p className="text-[#4a5565] text-sm">Add an extra layer of security to your account</p>
        </div>
        {
          isLoadingProfileInfo || isLoadingUpdateProfileInfo ? (
            <Loader className="animate-spin w-6 h-6 text-[#9abed1]" />
          ) : (
            <Switch
              checked={profileInfo?.two_factor_enabled}
              onCheckedChange={handleTwoFactorAuthChange}
              className="data-[state=checked]:bg-[#135576]"
            />)}
      </div>

      {/* Active Sessions */}
      <div className="bg-white border border-[#e8eef2] p-6 rounded-2xl flex flex-col gap-2 w-full">
        <h2 className="text-[#101828] text-xl font-semibold leading-7 mb-2">Active Sessions</h2>

        <div className="flex flex-col gap-0">
          {sessions.map((session) => {
            const Icon = session.icon;
            return (
              <div key={session.id} className="flex items-center justify-between p-4 bg-white rounded-2xl w-full">
                <div className="flex items-center gap-4">
                  <div className="bg-[#e5e7eb] p-3 rounded-xl flex items-center justify-center">
                    <Icon className="text-gray-600" size={20} />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[#101828] text-base font-medium">{session.device}</span>
                      {session.current && (
                        <span className="bg-[#ecfdf5] text-[#007a55] text-[12px] px-2 py-0.5 rounded-md">Current</span>
                      )}
                    </div>
                    <span className="text-[#4a5565] text-sm mt-0.5">{session.location} • {session.time}</span>
                  </div>
                </div>
                {!session.current ? (
                  <button
                    onClick={() => handleRevoke(session.id)}
                    className="text-[#e7000b] text-sm font-medium hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                  >
                    Revoke
                  </button>
                ) : (
                  <div className="w-[77px]"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
