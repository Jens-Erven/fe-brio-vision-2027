import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_party/policy-holder/relations"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>relations</div>;
}
