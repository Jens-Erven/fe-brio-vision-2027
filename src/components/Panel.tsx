import { cn } from "@/lib/utils";
import { GripVertical, Pin, PinOff } from "lucide-react";
import { type HTMLAttributes, type ReactNode } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: ReactNode;
  variant?: "default" | "floating" | "outline";
  isPinned?: boolean;
  onPinToggle?: () => void;
  showActions?: boolean;
  showHeader?: boolean;
  showDragHandle?: boolean;
}

const Panel = ({
  title = "PanelTitle",
  children,
  variant: propVariant,
  className = "",
  isPinned = true,
  onPinToggle,
  showActions = true,
  showHeader = true,
  showDragHandle = false,
  ...props
}: PanelProps) => {
  // Determine variant based on pin state
  const variant = propVariant || (isPinned ? "default" : "floating");

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case "floating":
        return "shadow-lg transform hover:scale-[1.01] translate-y-[-2px] transition-all duration-200";
      case "outline":
        return "border-2 border-dashed border-muted-foreground/30";
      default:
        return "";
    }
  };

  const cardClassName = cn("h-full w-full", getVariantStyles(), className);

  return (
    <Card className={cardClassName} {...props}>
      {showHeader && (
        <CardHeader
          className={cn(
            "flex flex-row items-center justify-between space-y-0 pb-2",
            !isPinned && showDragHandle && "bg-muted/30 cursor-move"
          )}
        >
          <div className="flex items-center gap-2">
            {!isPinned && showDragHandle && (
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            )}
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </div>
          {showActions && onPinToggle && (
            <CardAction>
              <Button
                variant="ghost"
                size="sm"
                onClick={onPinToggle}
                onPointerDown={(e) => e.stopPropagation()} // Prevent drag when clicking pin button
                className="h-6 w-6 p-0"
              >
                {isPinned ? (
                  <Pin className="h-3 w-3" />
                ) : (
                  <PinOff className="h-3 w-3" />
                )}
              </Button>
            </CardAction>
          )}
        </CardHeader>
      )}
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  );
};

export default Panel;
