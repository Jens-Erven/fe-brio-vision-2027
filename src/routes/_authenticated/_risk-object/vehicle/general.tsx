import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_risk-object/vehicle/general"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>vehicle general</div>;
}
