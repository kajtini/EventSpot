import { User2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EventAttendeesInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  max_places: number;
  attendeesCount: number;
  iconSize: number;
}

export default function EventAttendeesInfo({
  max_places,
  attendeesCount,
  iconSize,
  className,
}: EventAttendeesInfoProps) {
  return (
    <div
      className={cn("flex items-center gap-2 text-muted-foreground", className)}
    >
      <User2Icon size={iconSize} />
      <span>
        {attendeesCount}/{max_places}
      </span>
    </div>
  );
}
