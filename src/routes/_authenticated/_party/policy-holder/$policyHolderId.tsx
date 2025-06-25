import { cn } from "@/lib/utils";
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { ArrowLeftRight, Folder, IdCard, Users } from "lucide-react";

export const Route = createFileRoute(
  "/_authenticated/_party/policy-holder/$policyHolderId"
)({
  component: RouteComponent,
});

interface Tab {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  {
    label: "Dossier",
    path: "/policy-holder/$policyHolderId/file",
    icon: <Folder className="w-4 h-4" />,
  },
  {
    label: "Klantgegevens",
    path: "/policy-holder/$policyHolderId/data",
    icon: <IdCard className="w-4 h-4" />,
  },
  {
    label: "Relaties",
    path: "/policy-holder/$policyHolderId/relations",
    icon: <Users className="w-4 h-4" />,
  },
  {
    label: "Dataverwerking",
    path: "/policy-holder/$policyHolderId/io",
    icon: <ArrowLeftRight className="w-4 h-4" />,
  },
];

function RouteComponent() {
  const location = useLocation();
  const { policyHolderId } = Route.useParams();

  return (
    <div className="flex flex-col gap-2 border border-border rounded-lg h-full w-full">
      <div className="border-b border-border flex-shrink-0">
        <nav className="flex w-full" aria-label="Policy holder tabs">
          {tabs.map((tab) => {
            const tabPath = tab.path.replace("$policyHolderId", policyHolderId);
            const isActive = location.pathname.includes(tabPath);
            return (
              <Link
                key={tab.path}
                to={tab.path}
                params={{ policyHolderId }}
                className={cn(
                  "flex-1 border-b-2 py-4 px-4 text-sm font-medium transition-colors text-center flex items-center justify-center gap-2",
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
      <div className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}
