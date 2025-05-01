
import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalendarWidgetProps {
  className?: string;
  events?: {
    date: Date;
    title: string;
  }[];
}

export default function CalendarWidget({ className, events = [] }: CalendarWidgetProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Function to check if a date has events
  const hasEvent = (day: Date) => {
    return events.some(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() && 
      event.date.getFullYear() === day.getFullYear()
    );
  };
  
  // Get events for the selected date
  const selectedDateEvents = events.filter(event => 
    date &&
    event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() && 
    event.date.getFullYear() === date.getFullYear()
  );

  return (
    <div className={cn("space-y-4", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            modifiers={{
              event: events.map(event => event.date)
            }}
            modifiersStyles={{
              event: { 
                fontWeight: 'bold',
                backgroundColor: 'hsl(var(--primary) / 0.15)',
                color: 'hsl(var(--primary))'
              }
            }}
          />
        </PopoverContent>
      </Popover>

      {selectedDateEvents.length > 0 && (
        <div className="border rounded-md p-3 space-y-2">
          <h3 className="font-medium text-sm">Events on {date && format(date, "MMMM d, yyyy")}</h3>
          <ul className="space-y-1 text-sm">
            {selectedDateEvents.map((event, index) => (
              <li key={index} className="py-1 border-b last:border-0">
                {event.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
