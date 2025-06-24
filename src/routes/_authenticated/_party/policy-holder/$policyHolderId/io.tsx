import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_party/policy-holder/$policyHolderId/io"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { policyHolderId } = Route.useParams();

  return (
    <div>
      <h1>Policy Holder Data Processing</h1>
      <p>Policy Holder ID: {policyHolderId}</p>
      <p>Data processing content goes here</p>
    </div>
  );
}
