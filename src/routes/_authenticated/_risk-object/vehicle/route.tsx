import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { IndentDecrease, SlashIcon } from "lucide-react";

export const Route = createFileRoute("/_authenticated/_risk-object/vehicle")({
  component: VehicleLayoutComponent,
});

interface Tab {
  label: string;
  path: string;
}

const tabs: Tab[] = [
  {
    label: "Kerngegevens",
    path: "/vehicle/general",
  },
  {
    label: "Betrokkenen",
    path: "/vehicle/parties",
  },
  {
    label: "Toebehoren",
    path: "/vehicle/accessories",
  },
  {
    label: "Rijhulpsystemen",
    path: "/vehicle/driving-aid",
  },
  // {
  //   label: "Aanvullingen",
  //   path: "/vehicle/additionals",
  // },
  // {
  //   label: "Contracten",
  //   path: "/vehicle/contracts",
  // },
  // {
  //   label: "Schadegevallen",
  //   path: "/vehicle/claims",
  // },
  // {
  //   label: "Tarifiëringen",
  //   path: "/vehicle/tariffs",
  // },
];

function VehicleLayoutComponent() {
  const location = useLocation();
  return (
    <div>
      <div className="flex items-center gap-2 flex-row border border-border rounded-lg p-2 bg-accent">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            console.log("clicked");
          }}
        >
          <IndentDecrease />
        </Button>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/policy-holder">
                Poelmans Peter
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/policy-holder/file/risk-objects">
                Risico-objecten
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/vehicle">
                1-ABC-123 Mercedes Benz
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col gap-2 border border-border rounded-lg h-full">
        <header>
          <p>header content here!</p>
        </header>
        <Separator />
        <div className="flex flex-col gap-2 border border-border rounded-lg h-full">
          <div className="border-b border-border flex-shrink-0">
            <nav className="flex w-full" aria-label="Vehicle tabs">
              {tabs.map((tab) => {
                const isActive = location.pathname.includes(tab.path);
                return (
                  <Link
                    key={tab.path}
                    to={tab.path}
                    className={cn(
                      "flex-1 border-b-2 py-2 px-4 text-sm font-medium transition-colors text-center flex items-center justify-center gap-2",
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                    )}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
