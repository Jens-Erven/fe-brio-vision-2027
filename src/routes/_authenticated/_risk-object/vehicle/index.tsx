import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_risk-object/vehicle/")({
  component: VehicleLayoutComponent,
});

function VehicleLayoutComponent() {
  return <Outlet />;
}
