import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/briowebview')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/briowebview"!</div>
}
