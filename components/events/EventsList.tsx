import { PackageSearchIcon } from "lucide-react";

import EventCard from "@/components/events/EventCard";
import { Event } from "@/types";
import EventsPagination from "@/components/EventsPagination";

interface EventsListProps {
  events: Event[];
  page: number;
  eventCount: number;
  limit: number;
}

export default function EventsList({
  events,
  page,
  eventCount,
  limit,
}: EventsListProps) {
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
    <div className="space-y-5">
      <ul className="grid gap-8 md:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.event_id} event={event} />
        ))}
      </ul>
      <EventsPagination
        currentPage={page}
        eventsNum={eventCount}
        limit={limit}
      />
    </div>
  );
}
