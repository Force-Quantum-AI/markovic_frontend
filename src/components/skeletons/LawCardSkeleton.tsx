"use client"
import { Skeleton } from "../ui/skeleton";

export default function LawCardSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex min-h-[250px] flex-col rounded-3xl bg-[#F5F5F5] p-4 space-y-4">
                    <Skeleton className="h-10 w-10 rounded-lg bg-gray-300" />
                    <Skeleton className="h-6 w-3/4 rounded bg-gray-300" />
                    <Skeleton className="h-4 w-1/2 rounded bg-gray-300" />
                    <Skeleton className="h-4 w-2/3 rounded bg-gray-300" />
                    <div className="mt-auto flex justify-end">
                        <Skeleton className="h-6 w-16 rounded-full bg-gray-300" />
                    </div>
                </div>
            ))}
        </div>
    )
}