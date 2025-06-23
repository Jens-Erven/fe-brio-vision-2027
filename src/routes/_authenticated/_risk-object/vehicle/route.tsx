import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_risk-object/vehicle")({
  component: VehicleIndexComponent,
});

function VehicleIndexComponent() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Link to="/vehicle/dossier">Dossier</Link>
        <Link to="/vehicle/dataverwerking">Dataverwerking</Link>
        <Link to="/vehicle/klantgegevens">Klantgegevens</Link>
        <Link to="/vehicle/relaties">Relaties</Link>
      </div>
      <Outlet />
    </div>
  );
}
