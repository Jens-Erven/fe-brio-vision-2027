import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_risk-object/vehicle/$vehicleId/accesories"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { vehicleId } = Route.useParams();

  return (
    <div>
      <h1>Vehicle Accessories</h1>
      <p>Vehicle ID: {vehicleId}</p>
      <p>Accessories content goes here</p>
    </div>
  );
}
