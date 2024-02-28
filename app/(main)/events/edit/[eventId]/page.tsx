import CreateEventForm from "@/components/events/CreateEventForm";
import { getEventById } from "@/lib/data";

export default async function EditEventPage({
  params: { eventId },
}: {
  params: { eventId: number };
}) {
  const {
    category,
    description,
    end_date,
    image_url,
    is_free,
    location,
    price,
    start_date,
    title,
    max_places,
  } = await getEventById(eventId);

  return (
    <div className="container my-8 flex max-w-xl flex-col gap-3 md:gap-5">
      <h2 className="max-w-sm text-balance text-2xl font-medium tracking-tighter md:text-4xl">
        Edit your event
      </h2>

      <CreateEventForm
        mode="edit"
        event_id={eventId}
        formValues={{
          category,
          description,
          end_date,
          image_url,
          is_free,
          location,
          max_places,
          price,
          start_date,
          title,
        }}
      />
    </div>
  );
}
