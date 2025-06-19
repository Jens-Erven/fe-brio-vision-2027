import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_risk-object")({
  component: RiskObjectLayout,
});

function RiskObjectLayout() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Risk Objects</h1>
        <p className="text-muted-foreground">
          Manage and monitor objects at risk across your organization
        </p>
      </div>
      <Outlet />
    </div>
  );
}
