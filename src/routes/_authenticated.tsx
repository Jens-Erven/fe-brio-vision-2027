import { TopNavBar } from "@/components/navigation/TopNavBar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  // Here you could add authentication logic
  // For now, we'll just render the layout
  // In a real app, you might check if user is authenticated here
  // or use beforeLoad to redirect to login if not authenticated

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="flex flex-col overflow-hidden ">
        <TopNavBar />

        {/* <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Inbox</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header> */}
        <div className="flex flex-1   ">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
