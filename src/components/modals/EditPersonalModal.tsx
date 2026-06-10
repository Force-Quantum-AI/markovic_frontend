"use client";

import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Camera, User, Mail, Phone, IdCard, MapPin } from "lucide-react";
import { InputField } from "../shared/InputField";

export function EditPersonalModal({ clientData, open, setOpen }: { clientData: any, open: boolean, setOpen: (open: boolean) => void }) {
  const [formData, setFormData] = useState(clientData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl rounded-3xl p-8">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold mb-6">
            Personal Details
          </DialogTitle>
        </DialogHeader>

        {/* Basic Information Section */}
        <div className="space-y-6">
          <div className="text-xs font-bold text-gray-900 mb-2">Basic information</div>
          
          <div className="flex flex-col items-center gap-2 mb-6">
            <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center relative">
              <User className="w-10 h-10 text-gray-400" />
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-gray-200 shadow-sm">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <button className="text-sm text-gray-600 font-medium">Add Photo</button>
          </div>

          <InputField
            label="Client name:"
            placeholder="Markovic Aleksa"
            value={formData.name}
            onChange={(e) => handleChange(e, 'name')}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField 
              label="Email Address:"
              placeholder="markovicaleksa@email.com"
              value={formData.email}
              onChange={(e) => handleChange(e, 'email')}
            />
            <InputField 
              label="Phone Number:"
              placeholder="+386 54683248"
              value={formData.phone}
              onChange={(e) => handleChange(e, 'phone')}
            />
          </div>

          <InputField 
            label="Personal ID Number:"
            placeholder="#555-0128"
            value={formData.personalId}
            onChange={(e) => handleChange(e, 'personalId')}
          />

          <InputField 
            label="Address:"
            placeholder="Ulica Nedeljka Merdovića 42, 84000 Bijelo Polje"
            value={formData.address}
            onChange={(e) => handleChange(e, 'address')}
          />

          <button className="w-full bg-[#135576] hover:bg-[#0f4661] text-white py-3 rounded-full font-bold transition-colors mt-6">
            Update Now
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}