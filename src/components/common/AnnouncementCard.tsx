
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: Date;
  category?: string;
  isImportant?: boolean;
}

interface AnnouncementCardProps {
  announcement: Announcement;
  className?: string;
}

export default function AnnouncementCard({ announcement, className }: AnnouncementCardProps) {
  const { title, content, date, category, isImportant } = announcement;
  
  return (
    <Card className={cn("card-hover", className, isImportant && "border-l-4 border-l-red-500")}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {category && (
            <Badge variant={isImportant ? "destructive" : "outline"}>
              {category}
            </Badge>
          )}
        </div>
        <CardDescription>
          {formatDistanceToNow(date, { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{content}</p>
      </CardContent>
    </Card>
  );
}
