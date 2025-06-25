import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_party/policy-holder/$policyHolderId/file/contracts"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { policyHolderId } = Route.useParams();

  return (
    <div>
      <h1>Policy Holder Contracts</h1>
      <p>Policy Holder ID: {policyHolderId}</p>
      <p>Contracts content goes here</p>
    </div>
  );
}
