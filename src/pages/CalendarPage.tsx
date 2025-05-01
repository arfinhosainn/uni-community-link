
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  location?: string;
  description?: string;
  category: 'academic' | 'exam' | 'holiday' | 'event';
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock data for events
  const events: Event[] = [
    {
      id: "1",
      title: "Fall Semester Begins",
      date: new Date("2023-09-01"),
      category: "academic",
      description: "First day of classes for the Fall semester"
    },
    {
      id: "2",
      title: "Midterm Exams Begin",
      date: new Date("2023-10-15"),
      category: "exam",
      description: "Midterm examination period starts"
    },
    {
      id: "3",
      title: "Midterm Exams End",
      date: new Date("2023-10-22"),
      category: "exam",
      description: "Last day of midterm examinations"
    },
    {
      id: "4",
      title: "Fall Break",
      date: new Date("2023-10-31"),
      category: "holiday",
      description: "University closed for Fall Break"
    },
    {
      id: "5",
      title: "Career Fair",
      date: new Date("2023-11-10"),
      startTime: "10:00 AM",
      endTime: "4:00 PM",
      location: "University Center",
      category: "event",
      description: "Annual university career fair with industry representatives"
    },
    {
      id: "6",
      title: "Final Exams Begin",
      date: new Date("2023-12-10"),
      category: "exam",
      description: "Final examination period starts"
    },
    {
      id: "7",
      title: "Final Exams End",
      date: new Date("2023-12-17"),
      category: "exam",
      description: "Last day of final examinations"
    },
    {
      id: "8",
      title: "Winter Break Begins",
      date: new Date("2023-12-18"),
      category: "holiday",
      description: "Start of winter break"
    },
    {
      id: "9",
      title: "Department Meeting",
      date: new Date(),
      startTime: "2:00 PM",
      endTime: "3:30 PM",
      location: "Conference Room A",
      category: "event",
      description: "Monthly department faculty meeting"
    }
  ];
  
  // Get all event dates for highlighting in the calendar
  const eventDates = events.map(event => event.date);
  
  // Get events for the selected date
  const selectedDateEvents = date 
    ? events.filter(event => 
        event.date.getDate() === date.getDate() && 
        event.date.getMonth() === date.getMonth() && 
        event.date.getFullYear() === date.getFullYear()
      )
    : [];
  
  // Group events by month for the current year
  const currentYear = new Date().getFullYear();
  const eventsByMonth: { [key: number]: Event[] } = {};
  
  events.forEach(event => {
    if (event.date.getFullYear() === currentYear) {
      const month = event.date.getMonth();
      if (!eventsByMonth[month]) {
        eventsByMonth[month] = [];
      }
      eventsByMonth[month].push(event);
    }
  });
  
  // Get badge color based on event category
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'academic':
        return 'bg-blue-100 text-blue-800';
      case 'exam':
        return 'bg-red-100 text-red-800';
      case 'holiday':
        return 'bg-green-100 text-green-800';
      case 'event':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="uni-container py-8">
      <h1 className="page-title">Academic Calendar</h1>
      <p className="text-gray-600 mb-8">
        View important academic dates, exams, holidays, and events.
      </p>
      
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>Select a date to view events</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    modifiers={{
                      event: eventDates
                    }}
                    modifiersStyles={{
                      event: { 
                        fontWeight: 'bold',
                        backgroundColor: 'hsl(var(--primary) / 0.15)',
                        color: 'hsl(var(--primary))'
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Events for {date ? format(date, 'MMMM d, yyyy') : 'Selected Date'}
                  </CardTitle>
                  <CardDescription>
                    {selectedDateEvents.length} event{selectedDateEvents.length !== 1 && 's'} scheduled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-4">
                      {selectedDateEvents.map(event => (
                        <div key={event.id} className="border-l-4 border-university-primary pl-4 py-2">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <Badge className={getCategoryColor(event.category)}>
                              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                            </Badge>
                          </div>
                          {(event.startTime || event.location) && (
                            <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 mb-1">
                              {event.startTime && (
                                <span>
                                  {event.startTime}{event.endTime && ` - ${event.endTime}`}
                                </span>
                              )}
                              {event.location && <span>{event.location}</span>}
                            </div>
                          )}
                          {event.description && (
                            <p className="text-gray-600">{event.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <h3 className="text-lg font-semibold mb-2">No Events</h3>
                      <p className="text-gray-600">
                        There are no events scheduled for this date.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="list">
          <div className="space-y-8">
            {Object.entries(eventsByMonth).map(([monthIndex, monthEvents]) => {
              const monthName = new Date(currentYear, parseInt(monthIndex), 1).toLocaleString('default', { month: 'long' });
              return (
                <div key={monthIndex} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-university-secondary border-b pb-2">{monthName}</h2>
                  <div className="grid grid-cols-1 gap-3">
                    {monthEvents
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .map(event => (
                        <Card key={event.id}>
                          <CardContent className="p-4 flex items-start gap-4">
                            <div className="bg-gray-100 rounded-md p-2 text-center min-w-[60px]">
                              <div className="text-2xl font-bold text-university-primary">
                                {event.date.getDate()}
                              </div>
                              <div className="text-xs uppercase text-gray-500">
                                {format(event.date, 'EEE')}
                              </div>
                            </div>
                            <div className="flex-grow">
                              <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                                <h3 className="font-semibold">{event.title}</h3>
                                <Badge className={getCategoryColor(event.category)}>
                                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                                </Badge>
                              </div>
                              {(event.startTime || event.location) && (
                                <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 mb-1">
                                  {event.startTime && (
                                    <span>
                                      {event.startTime}{event.endTime && ` - ${event.endTime}`}
                                    </span>
                                  )}
                                  {event.location && <span>{event.location}</span>}
                                </div>
                              )}
                              {event.description && (
                                <p className="text-sm text-gray-600">{event.description}</p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
