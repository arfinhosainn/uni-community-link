
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import DepartmentCard, { Department } from "@/components/common/DepartmentCard";

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for departments
  const departments: Department[] = [
    {
      id: "cse",
      name: "Computer Science & Engineering",
      code: "CSE",
      description: "Department focusing on computer science, software engineering, and information technology.",
      memberCount: 450,
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "eee",
      name: "Electrical & Electronic Engineering",
      code: "EEE",
      description: "Department focusing on electrical circuits, power systems, and electronic engineering.",
      memberCount: 380,
      imageUrl: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "bba",
      name: "Business Administration",
      code: "BBA",
      description: "Department focusing on business management, marketing, finance, and entrepreneurship.",
      memberCount: 520,
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "law",
      name: "Law & Justice",
      code: "LAW",
      description: "Department focusing on legal studies, constitutional law, and human rights.",
      memberCount: 280,
      imageUrl: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "eng",
      name: "English & Literature",
      code: "ENG",
      description: "Department focusing on English language, literature, linguistics, and communication.",
      memberCount: 180,
      imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "phy",
      name: "Physics",
      code: "PHY",
      description: "Department focusing on theoretical and applied physics, astrophysics, and quantum mechanics.",
      memberCount: 120,
      imageUrl: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];
  
  // Filter departments based on search term
  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="uni-container py-8">
      <h1 className="page-title">Departments</h1>
      <p className="text-gray-600 mb-8">
        Join your department's community to access resources, announcements, and connect with fellow students.
      </p>
      
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search departments by name or code..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredDepartments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map(department => (
            <DepartmentCard key={department.id} department={department} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h3 className="text-lg font-semibold mb-2">No departments found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search query.</p>
          <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
        </div>
      )}
    </div>
  );
}
