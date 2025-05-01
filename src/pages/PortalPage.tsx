
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnnouncementCard, { Announcement } from "@/components/common/AnnouncementCard";
import CalendarWidget from "@/components/common/CalendarWidget";
import DocumentCard, { Document } from "@/components/common/DocumentCard";

export default function PortalPage() {
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
    },
    {
      id: "3",
      title: "Career Fair Next Month",
      content: "The annual university career fair will be held on November 10th. Prepare your resumes and meet representatives from top companies.",
      date: new Date("2023-10-01"),
      category: "Career"
    },
    {
      id: "4",
      title: "Holiday Notice",
      content: "The university will be closed on October 31st for the Fall Break. Classes will resume on November 1st.",
      date: new Date("2023-09-29"),
      category: "Administrative"
    }
  ];

  // Mock data for calendar events
  const calendarEvents = [
    { date: new Date("2023-10-15"), title: "Midterm Exams Begin" },
    { date: new Date("2023-10-22"), title: "Midterm Exams End" },
    { date: new Date("2023-10-25"), title: "Department Meeting" },
    { date: new Date("2023-10-31"), title: "Fall Break" },
    { date: new Date("2023-11-10"), title: "Career Fair" },
    { date: new Date(), title: "Today's Event" }
  ];

  // Mock data for documents
  const documents: Document[] = [
    {
      id: "1",
      title: "Fall Semester Course Catalog",
      description: "Complete list of courses offered for the Fall semester",
      fileType: "PDF",
      fileSize: "2.4 MB",
      uploadDate: new Date("2023-09-01"),
      downloadUrl: "#"
    },
    {
      id: "2",
      title: "Scholarship Application Form",
      description: "Form for applying to university scholarships for the next academic year",
      fileType: "DOCX",
      fileSize: "548 KB",
      uploadDate: new Date("2023-09-15"),
      downloadUrl: "#"
    }
  ];

  return (
    <div className="uni-container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="page-title">Student Portal</h1>
          <p className="text-gray-600">Access all your university resources and announcements in one place.</p>
        </div>
        <CalendarWidget className="mt-4 md:mt-0 w-full md:w-auto" events={calendarEvents} />
      </div>

      <Tabs defaultValue="announcements" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="schedule">Class Schedule</TabsTrigger>
          <TabsTrigger value="exams">Exam Schedule</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="announcements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {announcements.map(announcement => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="outline">Load More</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium mb-2 text-yellow-800">Login Required</h3>
            <p className="text-yellow-700 mb-4">
              You need to be logged in to view your personalized class schedule.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="exams">
          <div className="space-y-6">
            <div className="bg-white p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-university-secondary">
                Midterm Examination Schedule (October 15-22)
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 border">Date</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 border">Time</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 border">Course</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 border">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700 border">Oct 15</td>
                      <td className="py-3 px-4 text-sm text-gray-700 border">9:00 AM - 11:00 AM</td>
                      <td className="py-3 px-4 text-sm text-gray-700 border">Introduction to Computer Science</td>
                      <td className="py-3 px-4 text-sm text-gray-700 border">Hall A102</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-700 border">Oct 16</td>
                      <td className="py-3 px-4 text-sm text-gray-700 border">1:00 PM - 3:00 PM</td>
                      <td className="py-3 px-4 text-sm text-gray-700 border">Calculus I</td>
                      <td className="py-3 px-4 text-sm text-gray-700 border">Hall B201</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-700 border">Oct 18</td>
                      <td className="py-3 px-4 text-sm text-gray-700 border">10:00 AM - 12:00 PM</td>
                      <td className="py-3 px-4 text-sm text-gray-700 border">Introduction to Psychology</td>
                      <td className="py-3 px-4 text-sm text-gray-700 border">Hall C305</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-700 border">Oct 20</td>
                      <td className="py-3 px-4 text-sm text-gray-700 border">2:00 PM - 4:00 PM</td>
                      <td className="py-3 px-4 text-sm text-gray-700 border">English Composition</td>
                      <td className="py-3 px-4 text-sm text-gray-700 border">Hall D104</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                * Please arrive at least 15 minutes before your scheduled examination time. Bring your student ID and required stationery.
              </p>
            </div>
            
            <div className="bg-white p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-university-secondary">
                Final Examination Schedule (Coming Soon)
              </h3>
              <p className="text-gray-600">
                The final examination schedule will be posted here four weeks before the end of the semester.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map(document => (
                <DocumentCard key={document.id} document={document} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Link to="/documents">
                <Button>View All Documents</Button>
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
