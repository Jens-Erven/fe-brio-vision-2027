import { TriangleAlertIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WorkInProgressCardProps {
  title: string;
  description: string;
}

export function WorkInProgressCard({
  title,
  description,
}: WorkInProgressCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <TriangleAlertIcon className="w-4 h-4" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  );
}
