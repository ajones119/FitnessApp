import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/macros/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    Hello "/_authenticated/macros/"!
  </div>
}
