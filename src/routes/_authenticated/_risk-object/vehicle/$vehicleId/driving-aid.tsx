import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_risk-object/vehicle/$vehicleId/driving-aid"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { vehicleId } = Route.useParams();

  return (
    <div>
      <h1>Vehicle Driving Aid</h1>
      <p>Vehicle ID: {vehicleId}</p>
      <p>Driving aid content goes here</p>
    </div>
  );
}
