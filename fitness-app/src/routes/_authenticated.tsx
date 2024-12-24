import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { Button } from '../components/ui/button'
import { supabase } from '../service/utils'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: ({context}) => {
    if (!context?.auth?.session) {
      throw new Error("Not authenticated")
    }
  },
  errorComponent: ({ error }) => {
    const navigate = useNavigate()
    if (error.message === 'Not authenticated') {
      navigate({to: "/"})
      return <div />
    }

    throw error
  },
})

function RouteComponent() {
  return <div className=''>
    <Button onClick={async () => {
          await supabase.auth.signOut()
          window.location.reload();
      }}>LOGOUT</Button>
    <Outlet />
  </div>
}
