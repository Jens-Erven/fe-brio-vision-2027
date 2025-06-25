import Panel from "@/components/Panel";
import { Button } from "@/components/ui";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  createFileRoute,
  Link,
  Outlet,
  useMatches,
} from "@tanstack/react-router";
import { IndentDecrease } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { TopNavBar } from "./-components/navigation/TopNavBar";
import PolicyHolderLeftPanel from "./-components/PolicyHolderLeftPanel";
import { AppSidebar } from "./-components/sidebar/AppSidebar";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const matches = useMatches();

  // Filter and process matches to create breadcrumbs
  const breadcrumbs = matches
    .filter((match) => {
      return (
        match.id !== "__root__" &&
        match.id !== "/_authenticated" &&
        !isPathlessRoute(match.id)
      );
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
            <div className="flex items-center gap-2 flex-row border border-border rounded-lg bg-accent/30 p-1">
              <Button variant={"outline"} size={"icon"}>
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
                              <Link
                                to={breadcrumb.pathname}
                                className="font-medium hover:underline text-primary"
                              >
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

// Helper function to check if a route is pathless (starts with _)
function isPathlessRoute(routeId: string): boolean {
  // A route is pathless if it ends with a segment that starts with _
  // For example: /_authenticated or /_authenticated/_risk-object
  // But NOT /_authenticated/_risk-object/vehicle/1 (vehicle/1 is not pathless)

  const segments = routeId.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  // Check if the last meaningful segment starts with _
  return lastSegment?.startsWith("_") || false;
}

// Helper function to generate breadcrumb titles from route matches using TanStack Router context
function getBreadcrumbTitle(match: any): string {
  const routeId = match.id;
  const params = match.params || {};
  const pathname = match.pathname || "";

  // Extract meaningful path segments (excluding pathless routes)
  const pathSegments = pathname.split("/").filter(Boolean);

  // If the route has parameters, we can build a more meaningful title
  if (Object.keys(params).length > 0) {
    // Handle dynamic routes with parameters
    const paramEntries = Object.entries(params);

    // Check for vehicle ID parameter
    if (params.vehicleId) {
      // If this route's pathname ends with just the vehicleId, it's the vehicle route
      if (pathname.endsWith(`/${params.vehicleId}`)) {
        return `Vehicle ${params.vehicleId}`;
      }
      // For routes beyond the vehicle ID, use the last segment
      // This ensures /vehicle/1/general shows "General" and /vehicle/1/driving-aid shows "Driving Aid"
      const lastSegment = pathSegments[pathSegments.length - 1];
      return formatSegmentTitle(lastSegment);
    }

    // Check for policy holder ID parameter
    if (params.policyHolderId) {
      if (pathname.endsWith(`/${params.policyHolderId}`)) {
        return `Policy Holder ${params.policyHolderId}`;
      }
      // For routes beyond the policy holder ID, use the last segment
      // This ensures /policy-holder/1/file shows "File" and /policy-holder/1/file/contracts shows "Contracts"
      const lastSegment = pathSegments[pathSegments.length - 1];
      return formatSegmentTitle(lastSegment);
    }

    // Handle splat parameters
    if (params._splat) {
      return `Files: ${params._splat}`;
    }
  }

  // For non-parameterized routes, use the last segment
  if (pathSegments.length > 0) {
    const lastSegment = pathSegments[pathSegments.length - 1];
    return formatSegmentTitle(lastSegment);
  }

  // Handle root/index routes
  if (pathname === "/" || routeId === "/") {
    return "Home";
  }

  // Fallback
  return "Page";
}

// Helper function to format a path segment into a readable title
function formatSegmentTitle(segment: string): string {
  // Handle special cases first
  const specialCases: Record<string, string> = {
    "risk-objects": "Risk Objects",
    "driving-aid": "Driving Aid",
    accesories: "Accessories", // Note: keeping the original spelling from the routes
    io: "I/O",
    "policy-holder": "Policy Holder",
  };

  if (specialCases[segment]) {
    return specialCases[segment];
  }

  // Convert kebab-case, snake_case, or camelCase to Title Case
  return segment
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}
