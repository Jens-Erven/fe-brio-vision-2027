import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_party/policy-holder/$policyHolderId/data"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { policyHolderId } = Route.useParams();

  return (
    <div>
      <h1>Policy Holder Data</h1>
      <p>Policy Holder ID: {policyHolderId}</p>
      <p>Data content goes here</p>
    </div>
  );
}
