import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/briowebview")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-full">
      <iframe
        src="https://briowebview.briomarketing.com/dashboard"
        className="w-full h-full"
      />
    </div>
  );
}
