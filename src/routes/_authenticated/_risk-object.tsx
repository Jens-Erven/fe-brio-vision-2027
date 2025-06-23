import Panel from "@/components/Panel";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Logs } from "lucide-react";

export const Route = createFileRoute("/_authenticated/_risk-object")({
  component: RiskObjectLayout,
});

function RiskObjectLayout() {
  return (
    <div className="flex h-full w-full gap-4 p-4">
      <Panel title="Left Panel" showHeader={true} className="w-1/5">
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-col h-full w-full">
            <p>content</p>
          </div>
        </div>
      </Panel>
      <div className="flex flex-1 flex-col gap-4">
        <div className="w-full flex items-center gap-2 rounded-lg border border-border p-2">
          <Logs className="w-4 h-4" />
          <p>Poelmans Peter</p>
        </div>
        <Outlet />
      </div>
      <Panel title="Right Panel" showHeader={true} className="w-1/5">
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-col h-full w-full">
            <p>content</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
