import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date;
  startDate: Date | undefined;
  endDate: Date | undefined;
  type: "startDate" | "endDate";
  onSelect: (date: Date | undefined) => void;
}

export default function DatePicker({
  date,
  startDate,
  endDate,
  type,
  onSelect,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`${!date && "text-muted-foreground"} flex w-full justify-start gap-2`}
        >
          <CalendarIcon size={18} />
          {date ? <span>{format(date, "PPP")}</span> : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          disabled={(date) => {
            if (startDate && type === "endDate") {
              return date < startDate;
            }

            if (endDate && type === "startDate") {
              return date > endDate;
            }

            return false;
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
