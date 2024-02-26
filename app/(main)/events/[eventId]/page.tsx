export default function EventPage({
  params: { eventId },
}: {
  params: { eventId: string };
}) {
  return <div>EventPage for event ${eventId}</div>;
}
