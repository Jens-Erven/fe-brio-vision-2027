import { WorkInProgressCard } from "@/components/WorkInProgressCard";
import * as React from "react";

export function AssistantView(): React.JSX.Element {
  return (
    <WorkInProgressCard
      title="Assistant"
      description="This feature is currently under development."
    />
  );
}
