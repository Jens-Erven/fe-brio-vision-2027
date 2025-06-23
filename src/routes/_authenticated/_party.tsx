import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_party")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full w-full gap-4 p-4">
      <div className="flex flex-1 flex-col gap-4">
        <Outlet />
      </div>
    </div>
  );
}
