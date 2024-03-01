import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function EventHostInfoSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-6 w-1/3" />
    </div>
  );
}
