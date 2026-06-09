import { EyeOff, Monitor, Smartphone } from "lucide-react";

export default function Password() {
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
              type="password" 
              defaultValue="*******" 
              className="w-full h-full bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#364153] text-base focus:outline-none focus:border-[#135576]" 
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <EyeOff size={20} />
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="flex flex-col gap-2">
          <label className="text-[#364153] text-sm font-medium">New Password</label>
          <div className="relative h-[50px] w-full">
            <input 
              type="password" 
              defaultValue="*******" 
              className="w-full h-full bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#364153] text-base focus:outline-none focus:border-[#135576]" 
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <EyeOff size={20} />
            </button>
          </div>
        </div>

        {/* Password Strength */}
        <div className="flex flex-col gap-2 relative mt-[-8px]">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[#4a5565] text-xs">Password Strength</span>
            <span className="text-[#4a5565] text-xs">60%</span>
          </div>
          <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div className="h-full bg-[#f0b100] rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="flex flex-col gap-2">
          <label className="text-[#364153] text-sm font-medium">Confirm New Password</label>
          <div className="relative h-[50px] w-full">
            <input 
              type="password" 
              defaultValue="*******" 
              className="w-full h-full bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#364153] text-base focus:outline-none focus:border-[#135576]" 
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <EyeOff size={20} />
            </button>
          </div>
        </div>

        {/* Update Password Button */}
        <div className="border-t border-[#e5e7eb] mt-2 pt-6 flex justify-end">
          <button className="bg-[#135576] hover:bg-[#0f435c] text-white text-base font-medium py-3 px-6 rounded-full transition-colors">
            Update password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white border border-[#eff1f4] p-6 rounded-2xl flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <h3 className="text-[#101828] text-lg font-semibold">Two-Factor Authentication</h3>
          <p className="text-[#4a5565] text-sm">Add an extra layer of security to your account</p>
        </div>
        {/* Toggle Switch */}
        <div className="w-14 h-7 bg-[#135576] rounded-full relative cursor-pointer flex items-center px-1 transition-colors">
          <div className="w-5 h-5 bg-white rounded-full translate-x-7 transition-transform"></div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white border border-[#e8eef2] p-6 rounded-2xl flex flex-col gap-2 w-full">
        <h2 className="text-[#101828] text-xl font-semibold leading-7 mb-2">Active Sessions</h2>
        
        <div className="flex flex-col gap-0">
          {/* Session 1 */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl w-full">
            <div className="flex items-center gap-4">
              <div className="bg-[#e5e7eb] p-3 rounded-xl flex items-center justify-center">
                <Monitor className="text-gray-600" size={20} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[#101828] text-base font-medium">MacBook Pro</span>
                  <span className="bg-[#ecfdf5] text-[#007a55] text-[12px] px-2 py-0.5 rounded-md">Current</span>
                </div>
                <span className="text-[#4a5565] text-sm mt-0.5">Podgorica, Montenegro • Last active 2 hours ago</span>
              </div>
            </div>
            {/* Empty space for alignment with revoke buttons */}
            <div className="w-[77px]"></div>
          </div>

          {/* Session 2 */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl w-full">
            <div className="flex items-center gap-4">
              <div className="bg-[#e5e7eb] p-3 rounded-xl flex items-center justify-center">
                <Smartphone className="text-gray-600" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[#101828] text-base font-medium">iPhone 14 Pro</span>
                <span className="text-[#4a5565] text-sm mt-0.5">Podgorica, Montenegro • Last active 1 day ago</span>
              </div>
            </div>
            <button className="text-[#e7000b] text-sm font-medium hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
              Revoke
            </button>
          </div>

          {/* Session 3 */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl w-full">
            <div className="flex items-center gap-4">
              <div className="bg-[#e5e7eb] p-3 rounded-xl flex items-center justify-center">
                <Monitor className="text-gray-600" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[#101828] text-base font-medium">Windows Desktop</span>
                <span className="text-[#4a5565] text-sm mt-0.5">Belgrade, Serbia • Last active 3 days ago</span>
              </div>
            </div>
            <button className="text-[#e7000b] text-sm font-medium hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
              Revoke
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
