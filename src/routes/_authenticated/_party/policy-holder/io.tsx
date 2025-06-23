import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_party/policy-holder/io")(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  return <div>io</div>;
}
