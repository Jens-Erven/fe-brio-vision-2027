import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_party/policy-holder/$policyHolderId/file"
)({
  component: RouteComponent,
});

interface Tab {
  label: string;
  path: string;
  value: string;
}

const tabs: Tab[] = [
  {
    label: "Contracten",
    path: "/policy-holder/$policyHolderId/file/contracts",
    value: "contracts",
  },
  {
    label: "Risico-objecten",
    path: "/policy-holder/$policyHolderId/file/risk-objects",
    value: "risk-objects",
  },
  {
    label: "Schadegevallen",
    path: "/policy-holder/$policyHolderId/file/claims",
    value: "claims",
  },
];

function RouteComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { policyHolderId } = Route.useParams();

  // Determine the current active tab based on the pathname
  const getCurrentTab = () => {
    const currentPath = location.pathname;
    const activeTab = tabs.find((tab) => {
      const tabPath = tab.path.replace("$policyHolderId", policyHolderId);
      return currentPath.includes(tabPath);
    });
    return activeTab?.value || tabs[0].value;
  };

  const handleTabChange = (value: string) => {
    const tab = tabs.find((t) => t.value === value);
    if (tab) {
      navigate({
        to: tab.path,
        params: { policyHolderId },
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <Tabs value={getCurrentTab()} onValueChange={handleTabChange}>
        <TabsList className="flex flex-row gap-2 bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={getCurrentTab()} className="mt-0 p-4 flex-1">
          <Outlet />
        </TabsContent>
      </Tabs>
    </div>
  );
}
