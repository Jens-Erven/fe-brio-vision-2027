import { Badge, Button } from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import policyHolderData from "@/data/policyHolderData.json";
import {
  Bell,
  Check,
  ChevronRight,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  Share2,
  X,
} from "lucide-react";

const getTagClasses = (variant: string): string => {
  switch (variant) {
    case "blue":
      return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50";
    case "gray":
      return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-50";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-50";
  }
};

const renderIcon = (iconName: string | undefined) => {
  if (!iconName) return null;

  const iconProps = "w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0";

  switch (iconName) {
    case "Check":
      return <Check className={`${iconProps} text-green-600`} />;
    case "Bell":
      return <Bell className={`${iconProps} text-red-500`} />;
    default:
      return null;
  }
};

export default function PolicyHolderLeftPanel() {
  return (
    <Card className=" max-w-sm  text-sm flex flex-col h-full w-1/5 p-0 bg-card text-card-foreground">
      <CardContent className="flex flex-col h-full py-2  overflow-hidden p-0">
        {/* Header Section - Fixed at top */}

        <header className="flex flex-col gap-4 p-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 bg-muted">
              <AvatarImage
                src={policyHolderData.user.avatar}
                alt={policyHolderData.user.name}
              />
              <AvatarFallback className="bg-gray-200 text-gray-600 text-lg font-medium">
                {policyHolderData.user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {policyHolderData.user.name}
              </h2>
              <Badge variant={"premium"}>
                {policyHolderData.user.status.label}
              </Badge>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="icon">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mail className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Check className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <Separator className="px-4" />

        {/* Scrollable Content Section */}
        <div className="flex flex-col gap-4 scrollbar-fade flex-1 min-h-0 my-2 pl-4 pr-2">
          <div className="flex flex-row w-full gap-2 flex-nowrap items-stretch">
            {policyHolderData.statusBadges.map((badge, index) => (
              <Badge
                onClick={() => {
                  console.log("clicked");
                }}
                variant={badge.variant as any}
                key={index}
                className="flex-1 flex items-center justify-center gap-1 px-1 sm:px-2 py-2 rounded-lg h-auto min-h-[60px] text-center cursor-pointer"
              >
                <div className="flex items-center gap-1 flex-col w-full">
                  <span className="text-[clamp(0.625rem,1.5vw,0.75rem)] sm:text-xs font-medium break-words text-center leading-tight w-full">
                    {badge.title}
                  </span>
                  <div className="flex items-center gap-1 justify-center w-full">
                    {renderIcon(badge.iconName)}
                    {badge.value && (
                      <span className="text-[clamp(0.5rem,1.2vw,0.625rem)] sm:text-xs font-medium break-words text-center leading-tight">
                        {badge.value}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-600 flex-shrink-0" />
              </Badge>
            ))}
          </div>

          {/* Intern beheer Section */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 text-sm">
              {policyHolderData.internBeheer.title}
            </h3>
            <div className="space-y-2 text-[clamp(0.625rem,1.5vw,0.75rem)]">
              {policyHolderData.internBeheer.fields.map((field, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{field.label}</span>
                  <span className="text-gray-900 font-medium">
                    {field.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Klantgegevens Section */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 text-sm">
              {policyHolderData.klantgegevens.title}
            </h3>
            <div className="space-y-2 text-[clamp(0.625rem,1.5vw,0.75rem)]">
              {policyHolderData.klantgegevens.fields.map((field, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{field.label}</span>
                  <span
                    className={`font-medium ${field.isClickable ? "text-teal-600" : "text-gray-900"}`}
                  >
                    {field.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">
              {policyHolderData.tags.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {policyHolderData.tags.items.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`${getTagClasses(tag.variant)} text-[clamp(0.625rem,1.5vw,0.75rem)]`}
                >
                  {tag.label}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-3 h-3 sm:w-4 sm:h-4 ml-1 p-0 hover:bg-transparent"
                  >
                    <X className="w-2 h-2 sm:w-3 sm:h-3" />
                  </Button>
                </Badge>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-dashed border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400"
              >
                <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
