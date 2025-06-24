import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_risk-object/vehicle/$vehicleId/general"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { vehicleId } = Route.useParams();

  return (
    <div>
      <h1>Vehicle General Information</h1>
      <p>Vehicle ID: {vehicleId}</p>
      <p>General information content goes here</p>
    </div>
  );
}
