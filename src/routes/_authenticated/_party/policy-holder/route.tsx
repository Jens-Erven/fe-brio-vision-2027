import Panel from "@/components/Panel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import {
  ArrowLeftRight,
  Folder,
  IdCard,
  IndentDecrease,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/_party/policy-holder")({
  component: RouteComponent,
});

interface PolicyHolderTab {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const policyHolderTabs: PolicyHolderTab[] = [
  {
    label: "Dossier",
    path: "/policy-holder/file",
    icon: <Folder className="w-4 h-4" />,
  },
  {
    label: "Klantgegevens",
    path: "/policy-holder/data",
    icon: <IdCard className="w-4 h-4" />,
  },
  {
    label: "Relaties",
    path: "/policy-holder/relations",
    icon: <Users className="w-4 h-4" />,
  },
  {
    label: "Dataverwerking",
    path: "/policy-holder/io",
    icon: <ArrowLeftRight className="w-4 h-4" />,
  },
];

function RouteComponent() {
  const location = useLocation();
  return (
    <div className="flex flex-1  gap-4">
      <Panel title="Left Panel" showHeader={true} className="w-1/5">
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-col h-full w-full">
            <p>content</p>
          </div>
        </div>
      </Panel>
      <div className="w-full h-full flex flex-col gap-2">
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
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-col gap-2 border border-border rounded-lg h-full">
          <div className="border-b border-border flex-shrink-0">
            <nav className="flex w-full" aria-label="Vehicle tabs">
              {policyHolderTabs.map((tab) => {
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
                    {tab.icon}
                    {tab.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-1 p-4 overflow-y-auto ">
            <Outlet />
          </div>
        </div>
      </div>
      <Panel title="Right Panel" showHeader={true} className="w-1/5">
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-col h-full w-full">
            <p>content</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
