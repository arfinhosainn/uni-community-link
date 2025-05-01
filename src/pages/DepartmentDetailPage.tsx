
import { useParams, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, MessageSquare, Calendar } from "lucide-react";
import AnnouncementCard, { Announcement } from "@/components/common/AnnouncementCard";
import DocumentCard, { Document } from "@/components/common/DocumentCard";
import CalendarWidget from "@/components/common/CalendarWidget";

export default function DepartmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  // Mock data for departments - in a real app this would be fetched based on the ID
  const departments = {
    cse: {
      id: "cse",
      name: "Computer Science & Engineering",
      code: "CSE",
      description: "The Department of Computer Science & Engineering offers undergraduate and graduate programs in computer science, software engineering, and information technology. Our curriculum is designed to provide students with a strong foundation in theoretical concepts while emphasizing practical skills through hands-on projects and industry collaborations.",
      memberCount: 450,
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      announcements: [
        {
          id: "cse-1",
          title: "Programming Contest Next Week",
          content: "The department is organizing a programming contest next week. Register your team by Friday to participate.",
          date: new Date("2023-10-04"),
          category: "Event"
        },
        {
          id: "cse-2",
          title: "New Lab Equipment Installed",
          content: "The department has installed new equipment in the Advanced Computing Lab. Students can start using it from next Monday.",
          date: new Date("2023-10-02"),
          category: "Facility"
        }
      ],
      documents: [
        {
          id: "cse-doc-1",
          title: "Data Structures Syllabus",
          description: "Course syllabus for CSE-201 Data Structures",
          fileType: "PDF",
          fileSize: "420 KB",
          uploadDate: new Date("2023-09-05"),
          downloadUrl: "#",
          department: "CSE"
        },
        {
          id: "cse-doc-2",
          title: "Programming Lab Manual",
          description: "Lab manual for CSE-103 Programming Fundamentals",
          fileType: "PDF",
          fileSize: "1.2 MB",
          uploadDate: new Date("2023-09-10"),
          downloadUrl: "#",
          department: "CSE"
        },
        {
          id: "cse-doc-3",
          title: "Senior Project Proposal Template",
          description: "Template for final year project proposals",
          fileType: "DOCX",
          fileSize: "35 KB",
          uploadDate: new Date("2023-08-25"),
          downloadUrl: "#",
          department: "CSE"
        }
      ],
      events: [
        { date: new Date("2023-10-12"), title: "Programming Contest" },
        { date: new Date("2023-10-18"), title: "Faculty Meeting" },
        { date: new Date("2023-10-25"), title: "Guest Lecture: AI Ethics" },
        { date: new Date(), title: "Lab Session" }
      ]
    },
    eee: {
      id: "eee",
      name: "Electrical & Electronic Engineering",
      code: "EEE",
      description: "The Department of Electrical & Electronic Engineering offers programs covering electrical circuits, power systems, and electronic engineering. Our focus is on innovative technologies and sustainable energy solutions.",
      memberCount: 380,
      imageUrl: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      announcements: [
        {
          id: "eee-1",
          title: "Power Systems Workshop",
          content: "A two-day workshop on power systems will be held at the department next week.",
          date: new Date("2023-10-05"),
          category: "Workshop"
        }
      ],
      documents: [
        {
          id: "eee-doc-1",
          title: "Circuit Analysis Notes",
          description: "Course notes for EEE-105 Circuit Analysis",
          fileType: "PDF",
          fileSize: "850 KB",
          uploadDate: new Date("2023-09-08"),
          downloadUrl: "#",
          department: "EEE"
        },
        {
          id: "eee-doc-2",
          title: "Electronics Lab Safety Guidelines",
          description: "Safety procedures for electronics laboratories",
          fileType: "PDF",
          fileSize: "320 KB",
          uploadDate: new Date("2023-09-01"),
          downloadUrl: "#",
          department: "EEE"
        }
      ],
      events: [
        { date: new Date("2023-10-15"), title: "Power Systems Workshop" },
        { date: new Date("2023-10-22"), title: "Lab Equipment Training" }
      ]
    }
  };
  
  const department = departments[id as keyof typeof departments];
  
  // Handle case where department is not found
  if (!department) {
    return (
      <div className="uni-container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Department Not Found</h1>
        <p className="text-gray-600 mb-6">The department you're looking for doesn't exist or has been moved.</p>
        <Button asChild>
          <Link to="/departments">Back to Departments</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Department Header */}
      <div 
        className="w-full bg-cover bg-center h-64 relative" 
        style={{ 
          backgroundImage: `url(${department.imageUrl})`,
          backgroundPosition: 'center 30%' 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="uni-container py-8 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl sm:text-4xl font-bold">{department.name}</h1>
                  <Badge className="bg-university-primary text-white">{department.code}</Badge>
                </div>
                <div className="flex items-center text-gray-200">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{department.memberCount} members</span>
                </div>
              </div>
              <div>
                <Button>Join Department</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Department Content */}
      <div className="uni-container py-8">
        <p className="text-gray-700 mb-8">{department.description}</p>
        
        <Tabs defaultValue="announcements" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="announcements" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Members
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="announcements" className="space-y-6">
            {department.announcements && department.announcements.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {department.announcements.map((announcement: Announcement) => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-semibold mb-2">No Announcements</h3>
                <p className="text-gray-600">There are no announcements for this department yet.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
            {department.documents && department.documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {department.documents.map((document: Document) => (
                  <DocumentCard key={document.id} document={document} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-semibold mb-2">No Resources</h3>
                <p className="text-gray-600">There are no resources available for this department yet.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="calendar">
            <div className="max-w-md mx-auto">
              <CalendarWidget events={department.events} />
            </div>
          </TabsContent>
          
          <TabsContent value="members">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium mb-2 text-yellow-800">Login Required</h3>
              <p className="text-yellow-700 mb-4">
                You need to be logged in to view department members.
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
        </Tabs>
      </div>
    </div>
  );
}
