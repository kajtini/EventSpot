import { getAllEvents } from "@/lib/data";
import EventCard from "@/components/EventCard";

export default async function EventsList() {
  const events = await getAllEvents();

  console.log(events);

  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.event_id} event={event} />
      ))}
    </ul>
  );
}
