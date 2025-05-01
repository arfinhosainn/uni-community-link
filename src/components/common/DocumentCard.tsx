
import { FileText, Download } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Document {
  id: string;
  title: string;
  description?: string;
  fileType: string;
  fileSize?: string;
  uploadDate: Date;
  downloadUrl: string;
  department?: string;
}

interface DocumentCardProps {
  document: Document;
  className?: string;
}

export default function DocumentCard({ document, className }: DocumentCardProps) {
  const { title, description, fileType, fileSize, downloadUrl, department } = document;
  
  return (
    <Card className={cn("card-hover", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-2">
            <FileText className="h-5 w-5 text-university-secondary mt-1" />
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              {description && <p className="text-sm text-gray-500">{description}</p>}
            </div>
          </div>
          <Badge variant="outline" className="uppercase">{fileType}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2 pt-0">
        <div className="flex justify-between text-xs text-gray-500">
          <span>{fileSize}</span>
          {department && <span>Department: {department}</span>}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <a href={downloadUrl} download>
            <Download className="mr-2 h-4 w-4" />
            Download
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
