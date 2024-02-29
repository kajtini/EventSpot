import { Skeleton } from "@/components/ui/skeleton";
import EventHostInfoSkeleton from "@/skeletons/EventHostInfoSkeleton";

export default function Loading() {
  return (
    <div className="container my-8 space-y-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-28" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <div className="grid grid-cols-1 justify-between gap-8 lg:grid-cols-2">
        <Skeleton className="h-[40vh] self-start rounded-lg lg:h-[60vh]" />

        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-14 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>

          <EventHostInfoSkeleton />

          <div className="space-y-6">
            <Skeleton className="h-6 max-w-xs" />
            <Skeleton className="h-6 max-w-xs" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-14 max-w-xl" />
            <Skeleton className="h-80 max-w-md" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="space-y-5">
        <Skeleton className="h-8 w-36" />

        {/* Insert events skeletons later */}
      </div>
    </div>
  );
}
