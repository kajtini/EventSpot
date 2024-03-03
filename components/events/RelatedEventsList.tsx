import EventCard from "@/components/events/EventCard";
import EventsList from "@/components/events/EventsList";
import { getRelatedEvents } from "@/lib/data";

interface RelatedEventsListProps {
  event_id: number;
  category: string;
  currentPage: number;
}

export default async function RelatedEventsList({
  event_id,
  category,
  currentPage,
}: RelatedEventsListProps) {
  const { relatedEvents, relatedEventCount } = await getRelatedEvents(
    event_id,
    category,
    currentPage,
  );

  if (relatedEvents.length === 0) return null;

  return (
    <div className="space-y-5">
      <p className="text-balance text-xl font-medium md:text-2xl">
        Related Events
      </p>

      <EventsList
        events={relatedEvents}
        page={currentPage}
        eventCount={relatedEventCount}
        limit={3}
      />
    </div>
  );
}
