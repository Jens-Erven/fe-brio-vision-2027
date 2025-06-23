import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_risk-object/vehicle/parties',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Vehicle parties</div>
}
