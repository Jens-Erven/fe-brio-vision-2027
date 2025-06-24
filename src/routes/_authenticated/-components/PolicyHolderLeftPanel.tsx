import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import policyHolderData from "@/data/policyHolderData.json";
import {
  Check,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  Share2,
  X,
} from "lucide-react";

const getStatusBadgeClasses = (variant: string): string => {
  switch (variant) {
    case "success":
      return "bg-teal-100 text-teal-800 hover:bg-teal-100 border-teal-200";
    case "warning":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200";
    case "danger":
      return "bg-red-100 text-red-800 hover:bg-red-100 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200";
  }
};

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

interface Tab {
  label: string;
  path: string;
  value: string;
}

const tabs: Tab[] = [
  {
    label: "Kerngegevens",
    path: "/vehicle/$vehicleId/general",
    value: "general",
  },
  {
    label: "Betrokkenen",
    path: "/vehicle/$vehicleId/parties",
    value: "parties",
  },
  {
    label: "Toebehoren",
    path: "/vehicle/$vehicleId/accessories",
    value: "accessories",
  },
  {
    label: "Rijhulpsystemen",
    path: "/vehicle/$vehicleId/driving-aid",
    value: "driving-aid",
  },
];

export default function PolicyHolderLeftPanel() {
  return (
    <Card className=" max-w-sm bg-white text-sm flex flex-col h-full w-1/5 p-0 ">
      <CardContent className="flex flex-col h-full  py-2  overflow-hidden p-0">
        {/* Header Section - Fixed at top */}

        <header className="flex flex-col gap-4 p-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
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
              <Badge
                className={getStatusBadgeClasses(
                  policyHolderData.user.status.variant
                )}
              >
                {policyHolderData.user.status.label}
              </Badge>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
            >
              <Phone className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
            >
              <Mail className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
            >
              <Check className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
            >
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <Separator className="px-4" />

        {/* Scrollable Content Section */}
        <div className="flex flex-col gap-4 scrollbar-fade flex-1 min-h-0 my-2 pl-4 pr-2">
          <div className="flex flex-row w-full gap-2 justify-between">
            {policyHolderData.statusBadges.map((badge, index) => (
              <Badge
                key={index}
                className={`${getStatusBadgeClasses(badge.variant)} ${badge.value ? "flex-col p-2" : ""} flex-1/3`}
              >
                <span className="text-xs flex flex-row items-center">
                  {badge.hasCheck && <Check className="w-3 h-3 mr-1" />}
                  {badge.hasDot && (
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                  )}
                  {badge.title}
                </span>
                {badge.value && <span className="text-xs">{badge.value}</span>}
              </Badge>
            ))}
          </div>

          {/* Intern beheer Section */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">
              {policyHolderData.internBeheer.title}
            </h3>
            <div className="space-y-2 text-xs">
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
            <h3 className="font-semibold text-gray-900">
              {policyHolderData.klantgegevens.title}
            </h3>
            <div className="space-y-2 text-xs">
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
            <h3 className="font-semibold text-gray-900">
              {policyHolderData.tags.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {policyHolderData.tags.items.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={getTagClasses(tag.variant)}
                >
                  {tag.label}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-4 h-4 ml-1 p-0 hover:bg-transparent"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="w-6 h-6 rounded-full border-dashed border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
