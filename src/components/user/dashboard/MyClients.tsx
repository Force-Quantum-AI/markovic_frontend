"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";

// Dummy dataset for clients
const clientsData = [
  { img:"/dummy-user.jpg", name: "Guy Hawkins", cases: 2 },
  { img:"/dummy-user.jpg", name: "Arlene McCoy", cases: 1 },
  { img:"/dummy-user.jpg", name: "Cody Fisher", cases: 5 },
  { img:"/dummy-user.jpg", name: "Brooklyn Simmons", cases: 1 },
  { img:"/dummy-user.jpg", name: "Jenny Wilson", cases: 8 },
];

export default function MyClients() {
  // Show only first 5 clients
  const displayedClients = clientsData.slice(0, 5);

  return (
    <div className="w-full rounded-xl bg-white p-5 shadow-sm">
      {/* Header Section */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">My Clients</h3>
        <button className="text-sm font-medium text-[#135576] transition-all hover:opacity-80 cursor-pointer ">
          View All
        </button>
      </div>

      {/* Clients List */}
      <div className="divide-y divide-gray-100 bg-gray-100 rounded-2xl px-3">
        {displayedClients.map((client, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between flex-wrap gap-2 py-3 transition-all "
          >
            <div className="flex items-center flex-wrap gap-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={client.img} alt={client.name} fill className="object-cover" />
                  </div>
              <p className="text-gray-900">{client.name}</p>
            </div>
              <p className="text-sm text-green-600">
                {client.cases} {client.cases === 1 ? "Case" : "Cases"}
              </p>
          </div>
        ))}
      </div>
    </div>
  );
}