import EventsList from "@/components/events/EventsList";
import { getUserEvents } from "@/lib/data";
import { auth } from "@clerk/nextjs";

interface UserEventsListProps {
  page: number;
  limit: number;
}

export default async function UserEventsList({
  page,
  limit,
}: UserEventsListProps) {
  const { userId } = auth();

  if (!userId) return null;

  const { events, eventCount } = await getUserEvents(userId, page, limit);

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      <p className="text-2xl font-medium tracking-tighter md:text-3xl">
        My events
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
