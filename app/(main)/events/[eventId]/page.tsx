import Image from "next/image";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

import { getEventAttendees, getEventById } from "@/lib/data";
import EventDate from "@/components/events/EventDate";
import EventPrice from "@/components/events/EventPrice";
import EventLocation from "@/components/events/EventLocation";
import EventHostInfo from "@/components/events/EventHostInfo";
import EventHostInfoSkeleton from "@/skeletons/EventHostInfoSkeleton";
import EventOperations from "@/components/events/EventOperations";
import RelatedEventsList from "@/components/events/RelatedEventsList";
import EventListSkeleton from "@/skeletons/EventListSkeleton";
import EventActionBtn from "@/components/events/EventActionBtn";
import EventAttendeesInfo from "@/components/events/EventAttendeesInfo";

export default async function EventPage({
  params: { eventId },
}: {
  params: { eventId: number };
}) {
  const { userId } = auth();

  const eventDataPromise = getEventById(eventId);
  const atendeesDataPromise = getEventAttendees(eventId);

  const [eventData, atendeesData] = await Promise.all([
    eventDataPromise,
    atendeesDataPromise,
  ]);

  const {
    event_id,
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
    max_places,
  } = eventData;

  const { attendees, attendeesCount } = atendeesData;

  const isUserAuthor = author_id === userId;
  const isPlaceLimitReached = attendeesCount === max_places;
  const hasEventFinished = new Date() > new Date(end_date);
  const hasUserJoined = !!attendees.find(
    (attender) => attender.user_id === userId,
  );

  return (
    <div className="container my-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Link
          className="flex items-center gap-2 transition hover:underline"
          href="/"
        >
          <ArrowLeft size={18} />
          <span>Back home</span>
        </Link>
        {isUserAuthor && <EventOperations event_id={event_id} type="page" />}
      </div>

      <div className="grid grid-cols-1 justify-between gap-8 lg:grid-cols-2">
        <div className="relative h-[40vh] self-start lg:h-[60vh]">
          <Image
            className="rounded-lg object-cover"
            alt={`${title} event image`}
            src={image_url}
            fill
          />

          <div className="absolute inset-0 bg-background/5" />
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <EventPrice price={price} is_free={is_free} className="text-base" />

            <span>{category}</span>
          </div>

          <Suspense fallback={<EventHostInfoSkeleton />}>
            <EventHostInfo author_id={author_id} />
          </Suspense>

          <div className="flex flex-col items-start gap-6">
            <EventLocation location={location} iconSize={24} />
            <EventDate
              start_date={start_date}
              end_date={end_date}
              iconSize={24}
            />
            <Suspense>
              <EventAttendeesInfo
                attendeesCount={attendeesCount}
                max_places={max_places}
                iconSize={24}
                isPlaceLimitReached={isPlaceLimitReached}
              />
            </Suspense>
          </div>

          <div className="space-y-2">
            <p className="text-balance text-xl font-medium md:text-2xl">
              {title}
            </p>
            <p className="max-w-[35em] leading-8 text-muted-foreground">
              {description}
            </p>
          </div>

          <EventActionBtn
            event_id={eventId}
            hasUserJoined={hasUserJoined}
            hasEventFinished={hasEventFinished}
            isPlaceLimitReached={isPlaceLimitReached}
          />
        </div>
      </div>

      <Suspense fallback={<EventListSkeleton />}>
        <RelatedEventsList event_id={eventId} category={category} />
      </Suspense>
    </div>
  );
}
