"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Search, UserPlus, Users, Mail } from "lucide-react";
import Image from "next/image";
import { InputField } from "../shared/InputField";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAsignLowerInCaseMutation, useDeleteAssignedLowerMutation } from "@/store/features/case/case.api";
import { toast } from "sonner";

// Types
interface Lawyer {
  id: string;
  name: string;
  initials: string;
  color: string;
  image?: string;
  email?: string;
}

interface responsible_lawyer {
  id: string,
  full_name: string,
  email: string,
  professional_role: string,
  profile_image: string,
}

interface AddLawyerModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: {
    caseId?: string;
    caseName?: string;
    responsible_lawyers?: responsible_lawyer[]
  };
}

// Dummy data for all available lawyers (simulating database)
const ALL_LAWYERS: Lawyer[] = [
  { id: "l1", name: "Eleanor Pena", initials: "EP", color: "bg-pink-300", email: "eleanor.pena@lawfirm.com" },
  { id: "l2", name: "Cameron Williamson", initials: "CW", color: "bg-gray-400", email: "cameron.w@lawfirm.com" },
  { id: "l3", name: "Darrell Steward", initials: "DS", color: "bg-yellow-400", email: "darrell.steward@lawfirm.com" },
  { id: "l4", name: "Kathryn Murphy", initials: "KM", color: "bg-purple-400", email: "kathryn.murphy@lawfirm.com" },
  { id: "l5", name: "Kristin Watson", initials: "KW", color: "bg-blue-400", email: "kristin.watson@lawfirm.com" },
  { id: "l6", name: "Savannah Nguyen", initials: "SN", color: "bg-green-400", email: "savannah.nguyen@lawfirm.com" },
  { id: "l7", name: "Esther Howard", initials: "EH", color: "bg-red-400", email: "esther.howard@lawfirm.com" },
  { id: "l8", name: "Wade Warren", initials: "WW", color: "bg-indigo-400", email: "wade.warren@lawfirm.com" },
  { id: "l9", name: "Brooklyn Simmons", initials: "BS", color: "bg-teal-400", email: "brooklyn.simmons@lawfirm.com" },
];

export default function AddLawyerModal({ open, setOpen, data }: AddLawyerModalProps) {
  const lawers = data?.responsible_lawyers || [];

  const [asignLowerInCase, { isLoading: isAsignLowerInCaseLoading }] = useAsignLowerInCaseMutation()
  const [deleteAssignedLower, { isLoading: isDeleteAssignedLowerLoading }] = useDeleteAssignedLowerMutation()

  const [assignedLawyers, setAssignedLawyers] = useState<Lawyer[]>([
    { id: "l1", name: "Eleanor Pena", initials: "EP", color: "bg-pink-300", email: "eleanor.pena@lawfirm.com" },
    { id: "l2", name: "Cameron Williamson", initials: "CW", color: "bg-gray-400", email: "cameron.w@lawfirm.com" },
    { id: "l3", name: "Darrell Steward", initials: "DS", color: "bg-yellow-400", email: "darrell.steward@lawfirm.com" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Lawyer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter lawyers based on search query (simulating backend search)
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    const timer = setTimeout(() => {
      const queryLower = searchQuery.toLowerCase();
      const results = ALL_LAWYERS.filter(
        (lawyer) =>
          (lawyer.name.toLowerCase().includes(queryLower) ||
            lawyer.email?.toLowerCase().includes(queryLower)) &&
          !assignedLawyers.some((assigned) => assigned.id === lawyer.id)
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, assignedLawyers]);

  // Add lawyer to assigned list
  const handleAddLawyer = (lawyer: Lawyer) => {
    setAssignedLawyers([...assignedLawyers, lawyer]);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Remove lawyer from assigned list
  const handleRemoveLawyer = async (lawyerId: string) => {
    if (!data?.caseId) {
      toast.info("CaseId not found, Please save case details first!")
      return;
    };
    try {
      await deleteAssignedLower({ caseId: data?.caseId, lawyerId: lawyerId }).unwrap()
      toast.success("Lawyer removed successfully!")
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove lawyer")
    }
  };

  // Handle add by email (for future backend integration)
  const handleAddByEmail = () => {
    if (searchQuery.trim() && searchResults.length === 0) {
      // Here you would call your backend API to invite user by email
      console.log("Inviting user by email:", searchQuery);
      alert(`Invitation sent to ${searchQuery}`);
      setSearchQuery("");
    }
  };

  // Handle save
  const handleSave = () => {
    console.log("Saved lawyers:", assignedLawyers);
    // Here you would save to your backend
    setOpen(false);
  };

  // Handle cancel
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg lg:max-w-3xl bg-white rounded-2xl px-2 py-4 max-h-[95vh]">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
          <DialogTitle className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#135576]" />
            Add Lawyer
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm text-gray-500">
            Add responsible lawyer or legal trainee to this case.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-5 space-y-5">
          {/* Search Input Section */}
          <div className="space-y-2">
            <InputField
              icon={<Search className=" w-4 h-4 text-gray-400" />}
              placeholder="Type email to add your co-worker to this case..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Search Results ({searchResults.length})
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {searchResults.map((lawyer) => (
                  <div
                    key={lawyer.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${lawyer.color} flex items-center justify-center text-white font-semibold text-sm`}>
                        {lawyer.initials}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{lawyer.name}</p>
                        <p className="text-xs text-gray-400">{lawyer.email}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleAddLawyer(lawyer)}
                      size="sm"
                      className="h-8 px-3 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-lg text-xs"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results / Add by Email */}
          {searchQuery.trim() !== "" && searchResults.length === 0 && !isLoading && (
            <div className="text-center py-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-2">No existing user found with this email</p>
              {/* <Button
                onClick={handleAddByEmail}
                variant="outline"
                className="border-[#135576] text-[#135576] hover:bg-[#135576]/5"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invite via Email
              </Button> */}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-4">
              <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-[#135576] rounded-full animate-spin"></div>
              <p className="text-xs text-gray-400 mt-2">Searching...</p>
            </div>
          )}

          {/* Assigned Lawyers Section */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                Assigned Lawyers ({data?.responsible_lawyers?.length})
              </p>
              {lawers.length > 0 && (
                <button
                  onClick={() => setAssignedLawyers([])}
                  className="text-xs text-red-500 hover:text-red-600 transition-colors"
                >
                  Remove All
                </button>
              )}
            </div>

            {lawers.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {data?.responsible_lawyers?.map((lawyer) => (
                  <div
                    key={lawyer.id}
                    className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 bg-gray-200">
                        <AvatarImage src={lawyer?.profile_image?.startsWith("http") ? lawyer?.profile_image : `https://res.cloudinary.com/dnu0axtez/${lawyer?.profile_image}`} />
                        <AvatarFallback>{lawyer?.full_name?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{lawyer?.full_name}</p>
                        <p className="text-xs text-gray-400">{lawyer?.email}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleRemoveLawyer(lawyer?.id)}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-400">No lawyers assigned yet</p>
                <p className="text-xs text-gray-300 mt-1">Search and add lawyers above</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-gray-200 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#135576] hover:bg-[#0e445e] text-white"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}