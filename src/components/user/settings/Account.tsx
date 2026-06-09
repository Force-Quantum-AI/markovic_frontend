"use client";
import { useState, useRef } from "react";
import { Camera, Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";

export default function Account() {
  const [fullName, setFullName] = useState("Wade Warren");
  const [email, setEmail] = useState("wade.warren@email.com");
  const [phoneNumber, setPhoneNumber] = useState("Wade Warren");
  const [professionalRole, setProfessionalRole] = useState("");
  const [barAssociationNumber, setBarAssociationNumber] = useState("BAR-MNE-2024-1234");
  
  // Using a placeholder image similar to the design
  const [avatarUrl, setAvatarUrl] = useState("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    toast.success("Account information saved successfully", {
      description: `Name: ${fullName}, Email: ${email}`
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
      toast.success("Profile photo updated");
    }
  };

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div className="bg-white border border-[#e8eef2] p-6 rounded-2xl flex flex-col gap-4 w-full">
        <h2 className="text-[#101828] text-xl font-semibold leading-7 mb-2">Account Information</h2>
        
        {/* Profile Photo Section */}
        <div className="flex flex-col gap-4 mb-2">
          <label className="text-[#364153] text-sm font-medium">Profile Photo</label>
          <div className="flex items-center gap-7">
            <div className="relative w-24 h-24 rounded-full">
              <img 
                src={avatarUrl} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
              />
              <button 
                onClick={handleChangePhoto}
                className="absolute bottom-0 right-0 bg-[#135576] w-8 h-8 rounded-full flex items-center justify-center text-white border-2 border-white hover:bg-[#0f435c] transition-colors"
                title="Change Photo"
              >
                <Camera size={16} />
              </button>
            </div>
            <button 
              onClick={handleChangePhoto}
              className="border border-[#d1d5dc] h-[42px] px-6 rounded-[10px] text-[#364153] text-base font-medium hover:bg-gray-50 transition-colors"
            >
              Change Photo
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full pb-6 border-b border-[#e8eef2]">
          {/* Row 1: Full Name & Email */}
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#364153] text-sm font-medium">Full Name</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-[50px] bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#101828] text-base focus:outline-none focus:border-[#135576]" 
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#364153] text-sm font-medium">Email Address</label>
              <div className="relative w-full h-[50px]">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full bg-white border border-[#d1d5dc] rounded-[10px] px-4 pr-24 text-[#101828] text-base focus:outline-none focus:border-[#135576]" 
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#ecfdf5] text-[#007a55] text-xs font-medium px-2 py-1 rounded flex items-center gap-1 pointer-events-none">
                  <Check size={12} strokeWidth={3} />
                  Verified
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Phone Number & Professional Role */}
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#364153] text-sm font-medium">Phone Number</label>
              <input 
                type="text" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full h-[50px] bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#101828] text-base focus:outline-none focus:border-[#135576]" 
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#364153] text-sm font-medium">Professional Role</label>
              <div className="relative w-full h-[50px]">
                <select 
                  value={professionalRole}
                  onChange={(e) => setProfessionalRole(e.target.value)}
                  className="w-full h-full bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#101828] text-base focus:outline-none focus:border-[#135576] appearance-none cursor-pointer"
                >
                  <option value="">Choose role...</option>
                  <option value="lawyer">Lawyer</option>
                  <option value="attorney">Attorney</option>
                  <option value="paralegal">Paralegal</option>
                  <option value="judge">Judge</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
              </div>
            </div>
          </div>

          {/* Row 3: Bar Association Number */}
          <div className="flex w-full">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#364153] text-sm font-medium">Bar Association Number</label>
              <input 
                type="text" 
                value={barAssociationNumber}
                onChange={(e) => setBarAssociationNumber(e.target.value)}
                className="w-full h-[50px] bg-white border border-[#d1d5dc] rounded-[10px] px-4 text-[#101828] text-base focus:outline-none focus:border-[#135576]" 
              />
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end w-full mt-2">
          <button 
            onClick={handleSave}
            className="bg-[#135576] hover:bg-[#0f435c] text-white text-base font-medium py-3 px-8 rounded-full transition-colors"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
