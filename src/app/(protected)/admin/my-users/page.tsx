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

import { useTranslation } from "react-i18next";

export default function MyUsers() {
  const { t } = useTranslation("adminMyUsers");
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

  const users = usersData?.results?.users || [];

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
        usersList={users}
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
        title={t("delete_user")}
        description={t("delete_user_confirm_desc")}
        onConfirm={handleConfirmDelete}
        isSubmitting={isDeleting}
      />

      {/* Suspend Confirmation Dialog */}
      <SuspendConfirmationDialog
        isOpen={isSuspendDialogOpen}
        onOpenChange={setIsSuspendDialogOpen}
        title={t("suspend_user")}
        description={t("suspend_user_confirm_desc")}
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
