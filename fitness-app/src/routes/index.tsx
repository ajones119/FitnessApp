import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router'
import LoginForm from '../components/loginForm/loginForm'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const session = useRouteContext({
    from: '/',
    select: (context) => context?.auth?.session,
  })
  return (
    <div className="w-full bg-background text-foreground p-4">
      <div className="flex justify-center">
        {!session ? (
          <LoginForm />
        ) : (
          <Link to="/dashboard">View Dashboard</Link>
        )}
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
