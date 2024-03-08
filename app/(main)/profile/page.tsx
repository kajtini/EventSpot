import { Suspense } from "react";

import UserEventsList from "@/components/events/UserEventsList";
import UserJoinedEventsList from "@/components/events/UserJoinedEventsList";
import EventListSkeleton from "@/skeletons/EventListSkeleton";

export default function ProfilePage({
  searchParams,
}: {
  searchParams: {
    page: string;
  };
}) {
  const page = searchParams?.page || 1;

  return (
    <div className="container my-8 flex flex-col gap-8">
      <Suspense fallback={<EventListSkeleton />}>
        <UserEventsList page={+page} limit={3} />
      </Suspense>
      <Suspense fallback={<EventListSkeleton />}>
        <UserJoinedEventsList page={+page} limit={3} />
      </Suspense>
    </div>
  );
}
