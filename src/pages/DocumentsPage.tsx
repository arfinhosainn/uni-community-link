
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import DocumentCard, { Document } from "@/components/common/DocumentCard";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
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
    },
    {
      id: "3",
      title: "Laboratory Safety Guidelines",
      description: "Safety procedures for university laboratories",
      fileType: "PDF",
      fileSize: "1.2 MB",
      uploadDate: new Date("2023-08-20"),
      downloadUrl: "#",
      department: "CSE"
    },
    {
      id: "4",
      title: "Research Proposal Template",
      description: "Template for submitting research proposals",
      fileType: "DOCX",
      fileSize: "325 KB",
      uploadDate: new Date("2023-09-05"),
      downloadUrl: "#"
    },
    {
      id: "5",
      title: "Student Handbook 2023-24",
      description: "Official student handbook with university policies and guidelines",
      fileType: "PDF",
      fileSize: "5.8 MB",
      uploadDate: new Date("2023-08-10"),
      downloadUrl: "#"
    },
    {
      id: "6",
      title: "Campus Map",
      description: "Detailed map of the university campus with building information",
      fileType: "PDF",
      fileSize: "3.1 MB",
      uploadDate: new Date("2023-07-28"),
      downloadUrl: "#"
    },
    {
      id: "7",
      title: "Data Structures Syllabus",
      description: "Course syllabus for CSE-201 Data Structures",
      fileType: "PDF",
      fileSize: "420 KB",
      uploadDate: new Date("2023-09-05"),
      downloadUrl: "#",
      department: "CSE"
    },
    {
      id: "8",
      title: "Circuit Analysis Notes",
      description: "Course notes for EEE-105 Circuit Analysis",
      fileType: "PDF",
      fileSize: "850 KB",
      uploadDate: new Date("2023-09-08"),
      downloadUrl: "#",
      department: "EEE"
    }
  ];
  
  // Apply filters to documents
  const filteredDocuments = documents.filter(doc => {
    // Filter by search term
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by department
    const matchesDepartment = departmentFilter === "all" || 
                             (doc.department && doc.department === departmentFilter) || 
                             (!doc.department && departmentFilter === "general");
    
    // Filter by file type
    const matchesType = typeFilter === "all" || doc.fileType.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesDepartment && matchesType;
  });
  
  // Extract unique file types for filter
  const fileTypes = Array.from(new Set(documents.map(doc => doc.fileType)));
  
  return (
    <div className="uni-container py-8">
      <h1 className="page-title">Documents & Resources</h1>
      <p className="text-gray-600 mb-8">
        Find and download important university documents, forms, syllabi, and resources.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search documents..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Department</SelectLabel>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="general">General (No Department)</SelectItem>
                <SelectItem value="CSE">Computer Science (CSE)</SelectItem>
                <SelectItem value="EEE">Electrical Engineering (EEE)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by file type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>File Type</SelectLabel>
                <SelectItem value="all">All Types</SelectItem>
                {fileTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocuments.map(document => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h3 className="text-lg font-semibold mb-2">No Documents Found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search filters.</p>
          <Button onClick={() => {
            setSearchTerm("");
            setDepartmentFilter("all");
            setTypeFilter("all");
          }}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
}
