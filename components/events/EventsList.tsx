import EventCard from "@/components/events/EventCard";
import { getFilteredEvents } from "@/lib/data";
import { PackageSearchIcon } from "lucide-react";

interface EventsListProps {
  query: string;
  category: string;
}

export default async function EventsList({ query, category }: EventsListProps) {
  const events = await getFilteredEvents(query, category);

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <PackageSearchIcon size={32} />
        <div className="text-center">
          <p className="text-xl font-medium">No results found</p>
          <p className="text-muted-foreground">
            Try changing, or clearing your filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul className="grid gap-8 md:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.event_id} event={event} />
      ))}
    </ul>
  );
}
