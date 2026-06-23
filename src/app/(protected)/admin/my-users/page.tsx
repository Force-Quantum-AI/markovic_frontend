"use client";

import { useState } from "react";
import MyUsersMetrics from "@/components/admin/my-users/MyUsersMetrics";
import MyUsersFilters from "@/components/admin/my-users/MyUsersFilters";
import MyUsersTable from "@/components/admin/my-users/MyUsersTable";
import { useGetAllUsersQuery } from "@/store/features/admin/my-users/my-users.api";
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

  const queryParams = {
    page,
    search: filters.search || undefined,
    subscription: filters.subscription !== "all" ? filters.subscription : undefined,
    day: filters.day || undefined,
    month: filters.month !== "all" ? filters.month : undefined,
    year: filters.year || undefined,
  };

  const { data: usersData, isLoading, isFetching } = useGetAllUsersQuery(queryParams);

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

  const showLoader = isLoading || isFetching;

  return (
    <div className="w-full space-y-6">
      {/* Stats Cards */}
      <MyUsersMetrics stats={usersData?.results?.stats} />

      {/* Search & Filter */}
      <MyUsersFilters onFilter={handleFilter} onReset={handleReset} />

      {/* Users Table */}
      {showLoader ? (
        <div className="w-full bg-white rounded-3xl p-10 border border-gray-100 flex flex-col justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#135576]"></div>
        </div>
      ) : (
        <MyUsersTable
          usersList={mappedUsers}
          onAddUser={handleAddUser}
          totalCount={usersData?.count || 0}
          currentPage={page}
          totalPages={usersData?.total_pages || 1}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
