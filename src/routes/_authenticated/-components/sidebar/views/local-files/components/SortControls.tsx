import { Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import type { SortBy, SortSettings } from "../types";

interface SortControlsProps {
  sortSettings: SortSettings;
  onSortChange: (sortBy: SortBy) => void;
}

export const SortControls: React.FC<SortControlsProps> = ({
  sortSettings,
  onSortChange,
}) => {
  const getSortIndicator = (sortBy: SortBy): string => {
    if (sortSettings.sortBy === sortBy) {
      return sortSettings.sortOrder === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onSortChange("name")}>
          Sort by Name{getSortIndicator("name")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSortChange("size")}>
          Sort by Size{getSortIndicator("size")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSortChange("type")}>
          Sort by Type{getSortIndicator("type")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSortChange("modified")}>
          Sort by Modified{getSortIndicator("modified")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
