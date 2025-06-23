import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_risk-object/vehicle/dossier"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>Hello "/_authenticated/_risk-object/vehicle/vehicle/dossier"!</div>
  );
}
