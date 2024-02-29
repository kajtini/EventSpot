import EventCard from "@/components/events/EventCard";
import EventsList from "@/components/events/EventsList";
import { getRelatedEvents } from "@/lib/data";

interface RelatedEventsListProps {
  event_id: number;
  category: string;
}

export default async function RelatedEventsList({
  event_id,
  category,
}: RelatedEventsListProps) {
  const relatedEvents = await getRelatedEvents(event_id, category);

  if (relatedEvents.length === 0) return null;

  return (
    <div className="space-y-5">
      <p className="text-balance text-xl font-medium md:text-2xl">
        Related Events
      </p>

      <ul className="grid gap-8 md:grid-cols-3">
        {relatedEvents.map((event) => (
          <EventCard key={event.event_id} event={event} />
        ))}
      </ul>
    </div>
  );
}
