import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router'
import { Button } from '../components/ui/button'
import { supabase } from '../service/utils'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const session = useRouteContext({
    from: '/',
    select: (context) => context?.auth?.session,
  })
  return (
    <div className="w-screen h-screen bg-background text-foreground p-4">
      <div className="flex w-full">
        <div className="flex flex-col">
          {JSON.stringify(session)}
          <h1>Quisque</h1>
          <h1 style={{ lineHeight: '20px' }}>Amicus</h1>
          <h1>Meus</h1>
          {!session ? (
          <Button
            onClick={async (_e) => {
              await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                  redirectTo: 'http://localhost:5173',
                },
              })
            }}
          >
            Login
          </Button>
          ) : (
            <Link to="/dashboard">View Dashboard</Link>
          )}
        </div>
      </div>
    </div>
  )
}

/*
<Link href="/route1">route1</Link> <Button onClick={async (_e) => {
        await supabase.auth.signInWithOAuth({provider: "google", options: {
        redirectTo: 'http://localhost:5173'
        }});
    }}
    >Login</Button>
*/
