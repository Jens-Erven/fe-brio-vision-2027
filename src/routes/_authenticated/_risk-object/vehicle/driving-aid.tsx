import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_risk-object/vehicle/driving-aid"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Vehicle driving aid</div>;
}
