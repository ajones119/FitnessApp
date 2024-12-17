import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: ({context}) => {
    if (!context?.auth?.session) {
      throw new Error("Not authenticated")
    }
  },
  errorComponent: ({ error }) => {
    if (error.message === 'Not authenticated') {
      return (
        <div className="flex items-center justify-center p-12">
          UH OH
        </div>
      )
    }

    throw error
  },
})

function RouteComponent() {
  return <div>Hello "/_authenticated"!</div>
}
