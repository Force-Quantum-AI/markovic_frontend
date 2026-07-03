"use client";

import { useState } from "react";
import { toast } from "sonner";
import MyUsersMetrics from "@/components/admin/my-users/MyUsersMetrics";
import MyUsersFilters from "@/components/admin/my-users/MyUsersFilters";
import MyUsersTable from "@/components/admin/my-users/MyUsersTable";
import DeleteConfirmationDialog from "@/components/admin/categories/DeleteConfirmationDialog";
import SuspendConfirmationDialog from "@/components/admin/my-users/SuspendConfirmationDialog";
import CustomSubscriptionDialog from "@/components/admin/subscription/packages/CustomSubscriptionDialog";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useSuspendUserMutation,
} from "@/store/features/admin/my-users/my-users.api";
import { User } from "@/store/features/admin/my-users/my-users.type";

type PlanType = "Basic" | "Standard" | "Premium";

interface UserRow {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  phone: string;
  created: string;
  plan: PlanType;
}

function mapPlan(sub: string | null): PlanType {
  if (!sub) return "Basic";
  const s = sub.trim().toLowerCase();
  if (s === "standard") return "Standard";
  if (s === "premium") return "Premium";
  return "Basic";
}

function mapUser(user: User): UserRow {
  let created = "";
  if (user.account_created) {
    try {
      created = new Date(user.account_created).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      created = user.account_created;
    }
  }
  return {
    id: user.unique_id,
    name: user.full_name,
    email: user.email,
    avatar: user.profile_image || "/dummy-user.jpg",
    role: "User",
    phone: user.number || "N/A",
    created,
    plan: mapPlan(user.subscription),
  };
}

export default function MyUsers() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    subscription: "all",
    day: "",
    month: "all",
    year: "",
  });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | number | null>(null);

  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const [suspendUserId, setSuspendUserId] = useState<string | number | null>(null);

  const [isCustomSubDialogOpen, setIsCustomSubDialogOpen] = useState(false);

  const queryParams = {
    page,
    search: filters.search || undefined,
    subscription: filters.subscription !== "all" ? filters.subscription : undefined,
    day: filters.day || undefined,
    month: filters.month !== "all" ? filters.month : undefined,
    year: filters.year || undefined,
  };

  const { data: usersData, isLoading, isFetching } = useGetAllUsersQuery(queryParams);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [suspendUser, { isLoading: isSuspending }] = useSuspendUserMutation();

  const handleFilter = (newFilters: {
    search: string;
    subscription: string;
    day: string;
    month: string;
    year: string;
  }) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleReset = () => {
    setFilters({ search: "", subscription: "all", day: "", month: "all", year: "" });
    setPage(1);
  };

  const dbUsers = usersData?.results?.users || [];
  const mappedUsers: UserRow[] = dbUsers.map(mapUser);

  const handleAddUser = () => {
    alert("Adding user — implementation pending API mutation mapping.");
  };

  const handleDeleteUserClick = (id: string | number) => {
    setDeleteUserId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteUserId) return;
    try {
      await deleteUser({ id: deleteUserId }).unwrap();
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const handleSuspendUserClick = (id: string | number) => {
    setSuspendUserId(id);
    setIsSuspendDialogOpen(true);
  };

  const handleConfirmSuspend = async () => {
    if (!suspendUserId) return;
    try {
      await suspendUser({ id: suspendUserId, is_active: false }).unwrap();
      toast.success("User suspended successfully!");
    } catch (error) {
      console.error("Failed to suspend user:", error);
      toast.error("Failed to suspend user. Please try again.");
    }
  };

  const handleCustomSubClick = () => {
    setIsCustomSubDialogOpen(true);
  };

  const showLoader = isLoading || isFetching;

  return (
    <div className="w-full space-y-6">
      {/* Stats Cards */}
      <MyUsersMetrics stats={usersData?.results?.stats} isLoading={showLoader} />

      {/* Search & Filter */}
      <MyUsersFilters onFilter={handleFilter} onReset={handleReset} isLoading={showLoader} />

      {/* Users Table */}
      <MyUsersTable
        usersList={mappedUsers}
        onAddUser={handleAddUser}
        onDeleteUser={handleDeleteUserClick}
        onSuspendUser={handleSuspendUserClick}
        onCustomSubscription={handleCustomSubClick}
        totalCount={usersData?.count || 0}
        currentPage={page}
        totalPages={usersData?.total_pages || 1}
        onPageChange={setPage}
        isLoading={showLoader}
      />

      {/* Reusable Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        isSubmitting={isDeleting}
      />

      {/* Suspend Confirmation Dialog */}
      <SuspendConfirmationDialog
        isOpen={isSuspendDialogOpen}
        onOpenChange={setIsSuspendDialogOpen}
        title="Suspend User"
        description="Are you sure you want to suspend this user? They will not be able to log in or access the platform."
        onConfirm={handleConfirmSuspend}
        isSubmitting={isSuspending}
      />

      {/* Custom Subscription Dialog */}
      <CustomSubscriptionDialog
        isOpen={isCustomSubDialogOpen}
        onOpenChange={setIsCustomSubDialogOpen}
      />
    </div>
  );
}


