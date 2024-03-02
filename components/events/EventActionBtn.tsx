"use client";

import { DoorClosedIcon, DoorOpenIcon } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { joinEvent, leaveEvent } from "@/lib/actions";

interface EventActionBtnProps {
  event_id: number;
  hasUserJoined: boolean;
  hasEventFinished: boolean;
  isPlaceLimitReached: boolean;
}

export default function EventActionBtn({
  event_id,
  hasUserJoined,
  hasEventFinished,
  isPlaceLimitReached,
}: EventActionBtnProps) {
  async function handleLeaveEventClick() {
    try {
      await leaveEvent(event_id);

      toast.success(`Succesfully left the event`);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleJoinEventClick() {
    try {
      const newEventAttenderId = await joinEvent(event_id);

      if (newEventAttenderId) {
        toast.success(`Succesfully joined the event`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (hasEventFinished)
    return (
      <Button disabled variant="outline" className="self-start">
        Sorry, event has already ended
      </Button>
    );

  return (
    <>
      <SignedIn>
        <Button
          className="flex items-center gap-2 self-start"
          onClick={hasUserJoined ? handleLeaveEventClick : handleJoinEventClick}
          variant={hasUserJoined ? "secondary" : "default"}
          disabled={isPlaceLimitReached && !hasUserJoined}
        >
          {hasUserJoined ? (
            <DoorOpenIcon size={18} />
          ) : (
            <DoorClosedIcon size={18} />
          )}

          <span>{hasUserJoined ? "Leave event" : "Join event"}</span>
        </Button>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button
            variant="outline"
            className="item-center flex gap-2 self-start"
          >
            <DoorClosedIcon size={18} />
            <span>Join event</span>
          </Button>
        </Link>
      </SignedOut>
    </>
  );
}
