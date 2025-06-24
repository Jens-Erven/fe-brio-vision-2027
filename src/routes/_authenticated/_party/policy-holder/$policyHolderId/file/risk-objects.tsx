import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_party/policy-holder/$policyHolderId/file/risk-objects"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { policyHolderId } = Route.useParams();

  return (
    <div>
      <Link to="/vehicle/$vehicleId" params={{ vehicleId: "1" }}>
        Vehicle 1
      </Link>
    </div>
  );
}
