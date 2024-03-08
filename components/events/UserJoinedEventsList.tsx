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
    <EventsList
      eventCount={eventCount}
      events={events}
      limit={limit}
      page={+page}
      label="Events I joined"
    />
  );
}
