import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_party/policy-holder/file/risk-objects"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-2">
      <Link to="/vehicle">vehicle a</Link>
      <Link to="/vehicle">vehicle b</Link>
    </div>
  );
}
