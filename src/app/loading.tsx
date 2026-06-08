import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex gap-2 h-screen">
        <Skeleton className="hidden lg:block w-60 h-full bg-gray-300" />
        <div className="grow">
          <Skeleton className="w-full h-20 bg-gray-300" />
          <div className="mb-3 mt-2 h-full w-full ">
            <Skeleton className="w-full h-full bg-gray-300" />
          </div>
        </div>
    </div>
  );
}