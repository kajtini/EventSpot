import EventsList from "@/components/events/EventsList";
import { getUserJoinedEvents } from "@/lib/data";
import { auth } from "@clerk/nextjs";

interface UserJoinedEventsListProps {
  page: number;
  limit: number;
}

export default async function UserJoinedEventsList({
  page,
  limit,
}: UserJoinedEventsListProps) {
  const { userId } = auth();

  if (!userId) return null;

  const { events, eventCount } = await getUserJoinedEvents(userId, page, limit);

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      <p className="text-2xl font-medium tracking-tighter md:text-3xl">
        Events I joined
      </p>

      <EventsList
        eventCount={eventCount}
        events={events}
        limit={limit}
        page={+page}
      />
    </div>
  );
}
