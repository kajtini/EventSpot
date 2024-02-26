import { Event } from "@/types";
import Image from "next/image";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const {
    category,
    author_id,
    description,
    event_id,
    location,
    price,
    title,
    end_date,
    image_url,
    is_free,
    start_date,
  } = event;

  return (
    <li className="overflow-hidden rounded-lg bg-card">
      <div className="relative h-[25vh]">
        <Image
          fill
          alt="Event image"
          src={image_url}
          className="object-cover"
        />
      </div>
    </li>
  );
}
