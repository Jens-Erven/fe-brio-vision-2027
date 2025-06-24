import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_party/policy-holder/$policyHolderId/relations"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { policyHolderId } = Route.useParams();

  return (
    <div>
      <h1>Policy Holder Relations</h1>
      <p>Policy Holder ID: {policyHolderId}</p>
      <p>Relations content goes here</p>
    </div>
  );
}
