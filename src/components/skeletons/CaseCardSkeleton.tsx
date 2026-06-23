"use client";

import { Skeleton } from "../ui/skeleton";

export default function CaseCardSkeleton({cardNumber=4, maxColumn=3}:{cardNumber?:number, maxColumn?:number}) {
    return (
        <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-${maxColumn}`}>
            {Array.from({ length: cardNumber }).map((_, idx) => (
                <div key={idx} className="relative bg-[#f8f9fa] rounded-3xl p-3 2xl:p-6 border border-gray-100/80 shadow-sm flex flex-col min-h-[350px]">
                    {/* Favorite/Star button skeleton */}
                    <div className="absolute top-5 right-5 z-10">
                        <Skeleton className="h-7 w-7 rounded-full bg-gray-300" />
                    </div>

                    {/* Category badge skeleton */}
                    <div className="flex items-center justify-between mb-4">
                        <Skeleton className="h-7 w-20 rounded-md bg-gray-300" />
                    </div>

                    {/* Client profile header skeleton */}
                    <div className="flex items-center gap-3 mb-4">
                        <Skeleton className="relative w-12 h-12 rounded-full bg-gray-300 flex-shrink-0" />
                        <Skeleton className="h-6 w-32 rounded bg-gray-300" />
                    </div>

                    {/* Case name skeleton */}
                    <div className="space-y-1 mb-5">
                        <Skeleton className="h-3 w-16 rounded bg-gray-300" />
                        <Skeleton className="h-4 w-full rounded bg-gray-300" />
                        <Skeleton className="h-4 w-3/4 rounded bg-gray-300" />
                    </div>

                    {/* Inner metadata grid skeleton */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 bg-white rounded-2xl p-4 border border-gray-50">
                        {/* Status */}
                        <div className="space-y-1">
                            <Skeleton className="h-3 w-16 rounded bg-gray-300" />
                            <Skeleton className="h-6 w-20 rounded-md bg-gray-300" />
                        </div>

                        {/* Court */}
                        <div className="space-y-1">
                            <Skeleton className="h-3 w-12 rounded bg-gray-300" />
                            <Skeleton className="h-4 w-full rounded bg-gray-300" />
                        </div>

                        {/* Case number */}
                        <div className="space-y-1">
                            <Skeleton className="h-3 w-16 rounded bg-gray-300" />
                            <Skeleton className="h-4 w-20 rounded bg-gray-300" />
                        </div>

                        {/* Assign Lawyer */}
                        <div className="space-y-1">
                            <Skeleton className="h-3 w-20 rounded bg-gray-300" />
                            <div className="flex items-center -space-x-1.5">
                                <Skeleton className="h-6 w-6 rounded-full bg-gray-300" />
                                <Skeleton className="h-6 w-6 rounded-full bg-gray-300" />
                                <Skeleton className="h-6 w-6 rounded-full bg-gray-300" />
                            </div>
                        </div>

                        {/* Hearing date */}
                        <div className="space-y-0.5">
                            <Skeleton className="h-3 w-16 rounded bg-gray-300" />
                            <Skeleton className="h-4 w-20 rounded bg-gray-300" />
                        </div>

                        {/* Deadline */}
                        <div className="space-y-0.5">
                            <Skeleton className="h-3 w-14 rounded bg-gray-300" />
                            <Skeleton className="h-4 w-20 rounded bg-gray-300" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}