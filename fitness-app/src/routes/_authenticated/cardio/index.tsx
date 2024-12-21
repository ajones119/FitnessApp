import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/cardio/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/cardio/"!</div>
}
