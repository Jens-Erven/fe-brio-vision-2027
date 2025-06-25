import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_risk-object")({
  component: RiskObjectLayout,
});

function RiskObjectLayout() {
  return <Outlet />;
}
