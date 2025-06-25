import { Button } from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import {
  Calendar,
  EllipsisVertical,
  FlipHorizontal,
  Hash,
  Import,
  Palette,
} from "lucide-react";
import HeaderBadge from "./$vehicleId/-components/HeaderBadge";

// Mock vehicle data interface
interface Vehicle {
  id: string;
  brand: string;
  model: string;
  licensePlate: string;
  year: number;
  color: string;
  imageUrl: string;
  badges: {
    label: string;
    icon: React.ReactNode;
    value: string;
  }[];
}

// Mock function to simulate API call
const getVehicle = async (vehicleId: string): Promise<Vehicle> => {
  // Simulate network delay
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 4000)
  );

  // Mock vehicle data
  return {
    id: vehicleId,
    brand: "BMW",
    model: "X5",
    licensePlate: `ABC-${vehicleId.padStart(3, "0")}`,
    year: 2023,
    color: "Black",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
    badges: [
      {
        label: "License Plate",
        icon: <Hash className="h-3.5 w-3.5" />,
        value: "ABC-123",
      },
      {
        label: "Year",
        icon: <Calendar className="h-3.5 w-3.5" />,
        value: "2023",
      },
      {
        label: "Color",
        icon: <Palette className="h-3.5 w-3.5" />,
        value: "Black",
      },
    ],
  };
};

export const Route = createFileRoute(
  "/_authenticated/_risk-object/vehicle/$vehicleId"
)({
  component: VehicleLayoutComponent,
  pendingComponent: VehicleLoadingComponent,
  loader: async ({ params }) => {
    const vehicle = await getVehicle(params.vehicleId);
    return { vehicle };
  },
});

// Loading component to show while data is being fetched
function VehicleLoadingComponent() {
  return (
    <div className="flex flex-col border border-border rounded-lg h-full w-full">
      <header className="flex w-full flex-col">
        <section className="flex flex-row justify-between gap-2 p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>
        </section>
        <section className="w-full flex flex-row justify-start gap-4 p-4">
          {/* Badge skeletons matching HeaderBadge layout */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-6 w-12" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-6 w-16" />
          </div>
        </section>
      </header>

      <Separator />

      <div className="flex flex-col gap-2 h-full">
        {/* Tabs skeleton matching actual Tabs structure */}
        <div className="grid grid-cols-4 h-auto bg-transparent p-1 rounded-lg mx-4 mt-4">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="flex items-center justify-center py-2 px-3"
            >
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>

        {/* TabsContent skeleton */}
        <div className="mt-0 p-4 flex-1">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div className="pt-4">
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  // {
  //   label: "Aanvullingen",
  //   path: "/vehicle/$vehicleId/additionals",
  // },
  // {
  //   label: "Contracten",
  //   path: "/vehicle/$vehicleId/contracts",
  // },
  // {
  //   label: "Schadegevallen",
  //   path: "/vehicle/$vehicleId/claims",
  // },
  // {
  //   label: "Tarifiëringen",
  //   path: "/vehicle/$vehicleId/tariffs",
  // },
];

function VehicleLayoutComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicleId } = Route.useParams();
  const { vehicle } = Route.useLoaderData();

  // Determine the current active tab based on the pathname
  const getCurrentTab = () => {
    const currentPath = location.pathname;
    const activeTab = tabs.find((tab) => {
      const tabPath = tab.path.replace("$vehicleId", vehicleId);
      return currentPath.includes(tabPath);
    });
    return activeTab?.value || tabs[0].value;
  };

  const handleTabChange = (value: string) => {
    const tab = tabs.find((t) => t.value === value);
    if (tab) {
      navigate({
        to: tab.path,
        params: { vehicleId },
      });
    }
  };

  return (
    <div className="flex flex-col border border-border rounded-lg h-full w-full">
      <header className="flex w-full flex-col">
        <section className="flex flex-row justify-between gap-2 p-4">
          <div className="flex items-center gap-2">
            <Avatar className="w-16 h-16">
              <AvatarImage src={vehicle.imageUrl} alt={vehicle.brand} />
              <AvatarFallback className="bg-gray-200 text-gray-600 text-lg font-medium">
                {vehicle.brand.charAt(0)}
                {vehicle.model.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">
                {vehicle.brand} {vehicle.model}
              </h1>
              <p className="text-sm text-muted-foreground">Voertuig</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size={"icon"} variant={"outline"}>
              <EllipsisVertical />
            </Button>
            <Button variant={"outline"}>
              <FlipHorizontal />
              Brio Compare
            </Button>
            <Button variant={"secondary"}>
              <Import className="-rotate-90" />
              Broker Entry Point
            </Button>
          </div>
        </section>
        <section className="w-full flex flex-row justify-start gap-4 p-4">
          {vehicle.badges.map((badge) => (
            <HeaderBadge
              key={badge.label}
              label={badge.label}
              icon={badge.icon}
              value={badge.value}
            />
          ))}
        </section>
      </header>

      <Separator />
      <div className="flex-1 overflow-y-auto p-4">
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
    </div>
  );
}
