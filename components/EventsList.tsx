import { getAllEvents } from "@/lib/data";
import EventCard from "@/components/EventCard";

export default async function EventsList() {
  const events = await getAllEvents();

  return (
    <ul className="grid gap-8 md:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.event_id} event={event} />
      ))}
    </ul>
  );
}
