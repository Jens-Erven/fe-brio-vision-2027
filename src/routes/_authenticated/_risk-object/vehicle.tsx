import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_risk-object/vehicle")({
  component: VehicleComponent,
});

function VehicleComponent() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"></div>
    </div>
  );
}
