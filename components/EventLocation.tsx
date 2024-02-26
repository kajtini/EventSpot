import { MapPinIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EventLocationProps extends React.HTMLAttributes<HTMLDivElement> {
  location: string;
  iconSize: number;
}

export default function EventLocation({
  location,
  iconSize,
  className,
}: EventLocationProps) {
  return (
    <div
      className={cn("flex items-center gap-2 text-muted-foreground", className)}
    >
      <MapPinIcon size={iconSize} />
      <span>{location}</span>
    </div>
  );
}
