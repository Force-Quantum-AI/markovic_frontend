"use client";

import React, { useState } from "react";
import MyUsersMetrics from "@/components/admin/my-users/MyUsersMetrics";
import MyUsersFilters from "@/components/admin/my-users/MyUsersFilters";
import MyUsersTable from "@/components/admin/my-users/MyUsersTable";

interface UserRow {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  phone: string;
  created: string;
  plan: 
    | "Basic" 
    | "Standard" 
    | "Premium"
    | "Custom"
}

const initialUsers: UserRow[] = [
  {
    id: "1",
    name: "Kristin Watson",
    email: "kristinwatson@gmail.com",
    avatar: "/dummy-user.jpg",
    role: "Attorney",
    phone: "+382 67 567 890",
    created: "12 Jun 2026",
    plan: "Basic",
  },
  {
    id: "2",
    name: "Esther Howard",
    email: "kenzi.lawson@gmail.com",
    avatar: "/dummy-user.jpg",
    role: "Lawyer",
    phone: "+382 67 234 567",
    created: "12 Jun 2026",
    plan: "Basic",
  },
  {
    id: "3",
    name: "Savannah Nguyen",
    email: "jackson.graham@gmail.com",
    avatar: "/dummy-user.jpg",
    role: "Court Staff",
    phone: "+382 67 345 678",
    created: "12 Jun 2026",
    plan: "Standard",
  },
  {
    id: "4",
    name: "John Kollings",
    email: "sara.cruz@example.com",
    avatar: "/dummy-user.jpg",
    role: "Legal Researcher",
    phone: "+382 67 456 789",
    created: "12 Jun 2026",
    plan: "Custom",
  },
  {
    id: "5",
    name: "Arlene McCoy",
    email: "bill.sanders@example.com",
    avatar: "/dummy-user.jpg",
    role: "Paralegal",
    phone: "+382 67 678 901",
    created: "12 Jun 2026",
    plan: "Standard",
  },
  {
    id: "6",
    name: "Guy Hawkins",
    email: "jessica.hanson@example.com",
    avatar: "/dummy-user.jpg",
    role: "Judge",
    phone: "+382 67 789 012",
    created: "12 Jun 2026",
    plan: "Premium",
  },
  {
    id: "7",
    name: "Jacob Jones",
    email: "willie.jennings@example.com",
    avatar: "/dummy-user.jpg",
    role: "Mediator",
    phone: "+382 67 890 123",
    created: "12 Jun 2026",
    plan: "Premium",
  },
  {
    id: "8",
    name: "Maria Rodriguez",
    email: "marla.rodriguez@example.com",
    avatar: "/dummy-user.jpg",
    role: "Corporate Counsel",
    phone: "+382 67 901 234",
    created: "12 Jun 2026",
    plan: "Premium",
  },
];

export default function MyUsers() {
  const [allUsers, setAllUsers] = useState<UserRow[]>(initialUsers);
  const [filters, setFilters] = useState({
    search: "",
    clientName: "",
    year: "",
    subscription: "all",
  });

  const handleFilter = (newFilters: {
    search: string;
    clientName: string;
    year: string;
    subscription: string;
  }) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      clientName: "",
      year: "",
      subscription: "all",
    });
  };

  const usersList = React.useMemo(() => {
    let filtered = allUsers;
    if (filters.search) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          u.email.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.clientName) {
      filtered = filtered.filter((u) =>
        u.name.toLowerCase().includes(filters.clientName.toLowerCase())
      );
    }
    if (filters.year) {
      filtered = filtered.filter((u) =>
        u.created.toLowerCase().includes(filters.year.toLowerCase())
      );
    }
    if (filters.subscription && filters.subscription !== "all") {
      filtered = filtered.filter(
        (u) => u.plan.toLowerCase() === filters.subscription.toLowerCase()
      );
    }
    return filtered;
  }, [allUsers, filters]);

  const handleAddUser = (user: {
    name: string;
    email: string;
    avatar: string;
    phone: string;
    role: string;
  }) => {
    const createdDate = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const newUser: UserRow = {
      id: String(allUsers.length + 1),
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      phone: user.phone,
      created: createdDate,
      plan: "Basic",
    };

    setAllUsers((prev) => [newUser, ...prev]);
  };

  return (
    <div className="w-full space-y-6">
      {/* 3 Stats Cards Row */}
      <MyUsersMetrics />

      {/* Search & Filter Panel */}
      <MyUsersFilters onFilter={handleFilter} onReset={handleReset} />

      {/* All Users Table Section */}
      <MyUsersTable usersList={usersList} onAddUser={handleAddUser} />
    </div>
  );
}
