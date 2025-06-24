import { WorkInProgressCard } from "@/components/WorkInProgressCard";
import * as React from "react";

export function TokenView(): React.JSX.Element {
  return (
    <WorkInProgressCard
      title="Token"
      description="This feature is currently under development."
    />
  );
}
