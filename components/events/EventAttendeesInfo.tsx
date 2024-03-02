import { User2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EventAttendeesInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  max_places: number;
  attendeesCount: number;
  iconSize: number;
  isPlaceLimitReached: boolean;
}

export default function EventAttendeesInfo({
  max_places,
  attendeesCount,
  iconSize,
  isPlaceLimitReached,
  className,
}: EventAttendeesInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex items-center gap-2 text-muted-foreground",
          {
            "rounded-full bg-sky-600 px-3 text-sky-100": isPlaceLimitReached,
          },
          className,
        )}
      >
        <User2Icon size={iconSize} />
        <span>
          {attendeesCount}/{max_places}
        </span>
      </div>
      {isPlaceLimitReached && (
        <span className="font-medium text-sky-600">No more places</span>
      )}{" "}
    </div>
  );
}
