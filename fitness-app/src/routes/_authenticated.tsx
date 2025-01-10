import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import {AnimatePresence} from "framer-motion"
import { useUserExerciseAggregate } from '../service/user'

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
  const {data} = useUserExerciseAggregate();

  console.log("data", data)

  return <div className=''>
    
    <AnimatePresence presenceAffectsLayout>
      <Outlet />
    </AnimatePresence>
  </div>
}

/*
<Button onClick={async () => {
          await supabase.auth.signOut()
          window.location.reload();
      }}>LOGOUT</Button>
*/
