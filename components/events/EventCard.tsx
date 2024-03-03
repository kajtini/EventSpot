import { Suspense } from "react";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import {
  CalendarDaysIcon,
  EditIcon,
  ExternalLinkIcon,
  MapPinIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";

import EventHostInfo from "@/components/events/EventHostInfo";
import EventHostInfoSkeleton from "@/skeletons/EventHostInfoSkeleton";
import { Event } from "@/types";
import Link from "next/link";
import EventLocation from "@/components/events/EventLocation";
import EventPrice from "@/components/events/EventPrice";
import EventDate from "@/components/events/EventDate";
import EventOperations from "@/components/events/EventOperations";
interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { userId } = auth();

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

  const isUserAuthor = author_id === userId;

  return (
    <li className="overflow-hidden rounded-lg">
      <div className="relative h-[25vh]">
        <Image
          fill
          alt="Event image"
          src={image_url}
          className="object-cover"
        />

        {isUserAuthor && <EventOperations event_id={event_id} type="card" />}

        <Link
          href={`/events/${event_id}`}
          className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-lg bg-background/80 px-3 py-2 backdrop-blur-3xl transition hover:bg-accent"
        >
          <ExternalLinkIcon size={18} />
          <span>Read more</span>
        </Link>

        <div className="absolute inset-0 bg-background/5" />
      </div>

      <div className="flex flex-col gap-5 py-3">
        <p className="text-balance text-lg font-medium">{title}</p>

        <Suspense fallback={<EventHostInfoSkeleton />}>
          <EventHostInfo author_id={author_id} />
        </Suspense>

        <div className="flex items-center justify-between">
          <EventPrice is_free={is_free} price={price} />
          <EventLocation iconSize={18} location={location} />
        </div>
        <EventDate start_date={start_date} end_date={end_date} iconSize={18} />
      </div>
    </li>
  );
}
