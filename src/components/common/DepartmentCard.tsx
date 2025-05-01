
import { Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  memberCount: number;
  imageUrl?: string;
}

interface DepartmentCardProps {
  department: Department;
  className?: string;
}

export default function DepartmentCard({ department, className }: DepartmentCardProps) {
  const { id, name, code, description, memberCount, imageUrl } = department;
  
  return (
    <Card className={cn("card-hover overflow-hidden", className)}>
      {imageUrl && (
        <div className="h-32 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{name}</span>
          <span className="text-sm text-university-primary bg-university-light px-2 py-1 rounded">
            {code}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex items-center mt-4 text-sm text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          <span>{memberCount} members</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/departments/${id}`}>
            View Department
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
