import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_party/policy-holder/$policyHolderId/file/claims"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { policyHolderId } = Route.useParams();

  return (
    <div>
      <h1>Policy Holder Claims</h1>
      <p>Policy Holder ID: {policyHolderId}</p>
      <p>Claims content goes here</p>
    </div>
  );
}
