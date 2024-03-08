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
    <EventsList
      eventCount={eventCount}
      events={events}
      limit={limit}
      page={+page}
      label="My events"
    />
  );
}
