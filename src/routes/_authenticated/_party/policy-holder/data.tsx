import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_party/policy-holder/data"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>data</div>;
}
