import { format } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EventDateProps extends React.HTMLAttributes<HTMLDivElement> {
  start_date: Date;
  end_date: Date;
  iconSize: number;
}
export default function EventDate({
  start_date,
  end_date,
  iconSize,
  className,
}: EventDateProps) {
  return (
    <div
      className={cn("flex items-center gap-2 text-muted-foreground", className)}
    >
      <CalendarDaysIcon size={iconSize} />
      <span>
        {format(start_date, "PP")} - {format(end_date, "PP")}
      </span>
    </div>
  );
}
