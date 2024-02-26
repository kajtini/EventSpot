import Image from "next/image";
import { Suspense } from "react";
import { TicketIcon } from "lucide-react";

import { getEventById } from "@/lib/data";
import EventDate from "@/components/EventDate";
import EventPrice from "@/components/EventPrice";
import EventLocation from "@/components/EventLocation";
import EventHostInfo from "@/components/EventHostInfo";
import EventHostInfoSkeleton from "@/skeletons/EventHostInfoSkeleton";
import { Button } from "@/components/ui/button";

export default async function EventPage({
  params: { eventId },
}: {
  params: { eventId: number };
}) {
  const {
    author_id,
    category,
    description,
    end_date,
    image_url,
    is_free,
    location,
    price,
    start_date,
    title,
  } = await getEventById(eventId);

  return (
    <div className="container my-8">
      <div className="grid grid-cols-1 justify-between gap-8 lg:grid-cols-2">
        <div className="relative h-[40vh] self-start lg:h-[60vh]">
          <Image
            className="rounded-lg object-cover"
            alt={`${title} event image`}
            src={image_url}
            fill
          />
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <EventPrice price={price} is_free={is_free} className="text-base" />

            <span>{category}</span>
          </div>

          <Suspense fallback={<EventHostInfoSkeleton />}>
            <EventHostInfo author_id={author_id} />
          </Suspense>

          <div className="space-y-6">
            <EventLocation location={location} iconSize={24} />
            <EventDate
              start_date={start_date}
              end_date={end_date}
              iconSize={24}
            />
          </div>

          <div className="space-y-2">
            <p className="text-balance text-xl font-medium md:text-2xl">
              {title}
            </p>
            <p className="max-w-[35em] leading-8 text-muted-foreground">
              {description}
            </p>
          </div>

          <Button className="flex items-center gap-2 self-start">
            <TicketIcon size={18} />
            <span>Buy ticket</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
