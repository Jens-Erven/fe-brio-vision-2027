import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_risk-object/vehicle/$vehicleId/parties"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { vehicleId } = Route.useParams();

  return (
    <div>
      <h1>Vehicle Parties</h1>
      <p>Vehicle ID: {vehicleId}</p>
      <p>Parties content goes here</p>
    </div>
  );
}
