import Panel from "@/components/Panel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TopNavBar } from "@/routes/_authenticated/-components/navigation/TopNavBar";
import PolicyHolderLeftPanel from "@/routes/_authenticated/-components/PolicyHolderLeftPanel";
import { AppSidebar } from "@/routes/_authenticated/-components/sidebar/AppSidebar";
import {
  createFileRoute,
  Link,
  Outlet,
  useMatches,
} from "@tanstack/react-router";
import { IndentDecrease } from "lucide-react";
import { Fragment } from "react";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const matches = useMatches();

  // Filter and process matches to create breadcrumbs
  const breadcrumbs = matches
    .filter((match) => {
      // Filter out root route and authenticated layout route
      return match.id !== "__root__" && match.id !== "/_authenticated";
    })
    .map((match) => {
      // Create breadcrumb data from each match
      return {
        id: match.id,
        pathname: match.pathname,
        params: match.params,
        // Create a display name from the route ID or pathname
        title: getBreadcrumbTitle(match),
      };
    });

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="flex flex-col overflow-hidden h-screen">
        <TopNavBar />

        <div className="flex flex-1 gap-2 w-full min-h-0 p-2">
          <PolicyHolderLeftPanel />

          <main className="flex flex-1 flex-col gap-2">
            <div className="flex items-center gap-2 flex-row border border-border rounded-lg bg-accent">
              <Button variant={"ghost"} size={"icon"}>
                <IndentDecrease />
              </Button>

              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.length === 0 ? (
                    <BreadcrumbItem>
                      <BreadcrumbPage>Home</BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : (
                    breadcrumbs.map((breadcrumb, index) => (
                      <Fragment key={breadcrumb.id}>
                        <BreadcrumbItem>
                          {index === breadcrumbs.length - 1 ? (
                            // Last item should not be a link
                            <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                          ) : (
                            // Other items should be links
                            <BreadcrumbLink asChild>
                              <Link to={breadcrumb.pathname}>
                                {breadcrumb.title}
                              </Link>
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && (
                          <BreadcrumbSeparator />
                        )}
                      </Fragment>
                    ))
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <Outlet />
          </main>
          <Panel title="Right Panel" showHeader={true} className="w-1/5">
            <div className="flex flex-col h-full w-full">
              <div className="flex flex-col h-full w-full">
                <p>content</p>
              </div>
            </div>
          </Panel>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

// Helper function to generate breadcrumb titles from route matches
function getBreadcrumbTitle(match: any): string {
  const routeId = match.id;
  const params = match.params || {};

  // Handle specific routes with parameters
  if (routeId.includes("policy-holder")) {
    if (params.policyHolderId) {
      return `Policy Holder ${params.policyHolderId}`;
    }
    return "Policy Holders";
  }

  if (routeId.includes("vehicle")) {
    if (params.vehicleId) {
      return `Vehicle ${params.vehicleId}`;
    }
    return "Vehicles";
  }

  // Handle specific route segments
  if (routeId === "/") return "Home";
  if (routeId.includes("data")) return "Data";
  if (routeId.includes("file")) {
    if (routeId.includes("claims")) return "Claims";
    if (routeId.includes("contracts")) return "Contracts";
    if (routeId.includes("risk-objects")) return "Risk Objects";
    return "Files";
  }
  if (routeId.includes("io")) return "I/O";
  if (routeId.includes("relations")) return "Relations";
  if (routeId.includes("accessories")) return "Accessories";
  if (routeId.includes("driving-aid")) return "Driving Aid";
  if (routeId.includes("general")) return "General";
  if (routeId.includes("parties")) return "Parties";

  // Default: extract and format the last segment
  const segments = routeId
    .split("/")
    .filter((segment: string) => segment && !segment.startsWith("$"));
  const lastSegment = segments[segments.length - 1] || "";

  return lastSegment
    .split("-")
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
