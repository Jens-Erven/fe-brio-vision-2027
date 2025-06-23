import { cn } from "@/lib/utils";
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_party/policy-holder/file"
)({
  component: RouteComponent,
});

interface Tab {
  label: string;
  path: string;
}

const tabs: Tab[] = [
  {
    label: "Contracten",
    path: "/policy-holder/file/contracts",
  },
  {
    label: "Risico-objecten",
    path: "/policy-holder/file/risk-objects",
  },
  {
    label: "Schadegevallen",
    path: "/policy-holder/file/claims",
  },
];

function RouteComponent() {
  const location = useLocation();
  return (
    <div className="w-full h-full border border-border rounded-lg flex ">
      {/* Tab Navigation */}
      <div className="flex flex-1 flex-col gap-4">
        <div className="border-b border-border flex-shrink-0">
          <nav className="flex w-full" aria-label="Vehicle tabs">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path;
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
        <div className="flex-1 p-4 overflow-y-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
