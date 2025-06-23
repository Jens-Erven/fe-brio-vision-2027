import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_risk-object")({
  component: RiskObjectLayout,
});

function RiskObjectLayout() {
  return (
    <div className="flex h-full w-full gap-4 p-4">
      <Outlet />
    </div>
  );
}
