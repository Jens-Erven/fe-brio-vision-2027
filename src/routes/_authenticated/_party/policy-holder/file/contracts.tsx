import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_party/policy-holder/file/contracts"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>contracts</div>;
}
