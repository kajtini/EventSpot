import EventCardSkeleton from "@/skeletons/EventCardSkeleton";

export default function EventListSkeleton() {
  return (
    <ul className="grid gap-8 md:grid-cols-3">
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
    </ul>
  );
}
