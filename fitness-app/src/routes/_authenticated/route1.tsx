import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/route1')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/route1"!</div>
}
