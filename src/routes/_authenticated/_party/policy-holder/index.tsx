import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_party/policy-holder/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
