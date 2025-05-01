
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, FileText, MessageSquare } from "lucide-react";
import AnnouncementCard, { Announcement } from "@/components/common/AnnouncementCard";
import CalendarWidget from "@/components/common/CalendarWidget";

export default function HomePage() {
  // Mock data for announcements
  const announcements: Announcement[] = [
    {
      id: "1",
      title: "Midterm Examination Schedule",
      content: "Midterm examinations will take place from October 15th to October 22nd. Please check your department schedule for details.",
      date: new Date("2023-10-05"),
      category: "Academic",
      isImportant: true
    },
    {
      id: "2",
      title: "Library Hours Extended",
      content: "The university library will extend its operating hours during the exam period. New hours: 8 AM - 11 PM daily.",
      date: new Date("2023-10-03"),
      category: "Facility"
    }
  ];

  // Mock data for calendar events
  const calendarEvents = [
    { date: new Date("2023-10-15"), title: "Midterm Exams Begin" },
    { date: new Date("2023-10-22"), title: "Midterm Exams End" },
    { date: new Date("2023-10-25"), title: "Department Meeting" },
    { date: new Date(), title: "Today's Special Event" }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-university-primary to-university-secondary text-white py-20">
        <div className="uni-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to UniCommunity</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Your university's central hub for academic resources, announcements, and department communities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="default" className="bg-white text-university-secondary hover:bg-gray-100">
              <Link to="/portal">Student Portal</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/departments">Join Departments</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 bg-gray-50">
        <div className="uni-container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-university-dark">
            Everything You Need in One Place
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="mx-auto w-14 h-14 flex items-center justify-center bg-university-light rounded-full mb-4">
                <BookOpen className="h-6 w-6 text-university-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Student Portal</h3>
              <p className="text-gray-600 mb-4">Access announcements, schedules, and academic information.</p>
              <Button asChild variant="outline">
                <Link to="/portal">Visit Portal</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="mx-auto w-14 h-14 flex items-center justify-center bg-university-light rounded-full mb-4">
                <MessageSquare className="h-6 w-6 text-university-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Department Communities</h3>
              <p className="text-gray-600 mb-4">Join your academic department's community for resources and updates.</p>
              <Button asChild variant="outline">
                <Link to="/departments">Explore Departments</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="mx-auto w-14 h-14 flex items-center justify-center bg-university-light rounded-full mb-4">
                <Calendar className="h-6 w-6 text-university-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Academic Calendar</h3>
              <p className="text-gray-600 mb-4">Stay updated with important academic dates and events.</p>
              <Button asChild variant="outline">
                <Link to="/calendar">View Calendar</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="mx-auto w-14 h-14 flex items-center justify-center bg-university-light rounded-full mb-4">
                <FileText className="h-6 w-6 text-university-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Documents & Resources</h3>
              <p className="text-gray-600 mb-4">Find and download forms, syllabi, and other important documents.</p>
              <Button asChild variant="outline">
                <Link to="/documents">Browse Documents</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Announcements & Calendar */}
      <section className="py-12 uni-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-university-dark">Recent Announcements</h2>
              <Button asChild variant="ghost" size="sm">
                <Link to="/portal">View All</Link>
              </Button>
            </div>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6 text-university-dark">Calendar</h2>
            <div className="bg-white p-4 rounded-lg border">
              <CalendarWidget events={calendarEvents} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-university-light">
        <div className="uni-container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-university-dark">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-university-dark/80">
            Create an account to join department communities, receive personalized updates, and access all resources.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/register">Create Account</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
