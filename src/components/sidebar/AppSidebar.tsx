import {
  ArrowRightLeft,
  ChevronLeft,
  FileScan,
  HardDrive,
  History,
  MessageCircle,
  SparklesIcon,
  SquareCheck,
} from "lucide-react";
import * as React from "react";

import { NavUser } from "@/components/sidebar/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { AssistantView } from "./views/assistant/AssistantView";
import { CustomerMessagesView } from "./views/customer-messages/CustomerMessagesView";
import { DataProcessingView } from "./views/data-processing/DataProcessingView";
import { LocalFilesView } from "./views/local-files/LocalFilesView";
import { NavigationHistoryView } from "./views/navigation-history/NavigationHistoryView";
import { ScanningView } from "./views/scanning/ScanningView";
import { TokenView } from "./views/token/TokenView";

// This is sample data
const data = {
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "Navigatie geschiedenis",
      url: "#",
      icon: History,
      isActive: false,
      component: NavigationHistoryView,
    },
    {
      title: "Klantberichten",
      url: "#",
      icon: MessageCircle,
      isActive: true,
      component: CustomerMessagesView,
    },
    {
      title: "Dataverwerking",
      url: "#",
      icon: ArrowRightLeft,
      isActive: false,
      component: DataProcessingView,
    },
    {
      title: "Token",
      url: "#",
      icon: SquareCheck,
      isActive: false,
      component: TokenView,
    },
    {
      title: "Studio Brio Assistant",
      url: "#",
      icon: SparklesIcon,
      isActive: false,
      component: AssistantView,
    },
    {
      title: "Lokale Files",
      url: "#",
      icon: HardDrive,
      isActive: false,
      isDisabled: true,
      component: LocalFilesView,
    },
    {
      title: "Scannen",
      url: "#",
      icon: FileScan,
      isActive: false,
      component: ScanningView,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const { setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      variant={item.isDisabled ? "outline" : "default"}
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        if (!item.isDisabled) {
                          setActiveItem(item);
                          setOpen(true);
                        }
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                      asChild
                    >
                      <item.icon />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className=" border-b h-14">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem?.title}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOpen(false)}
            >
              <ChevronLeft />
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-2">
            <SidebarGroupContent>
              {activeItem?.component && <activeItem.component />}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
