import { Skeleton } from "@/components/ui/skeleton";
import EventHostInfoSkeleton from "@/skeletons/EventHostInfoSkeleton";

export default function EventCardSkeleton() {
  return (
    <li className="overflow-hidden rounded-lg">
      <Skeleton className="h-[25vh]" />

      <div className="flex flex-col gap-5 py-3">
        <Skeleton className="h-7 w-3/4" />

        <EventHostInfoSkeleton />

        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-6 w-36" />
        </div>
        {/* Skeleton not reacting to width values?? */}
        <Skeleton className="h-6 w-52" />
      </div>
    </li>
  );
}
