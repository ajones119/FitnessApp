import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router'
import LoginForm from '../components/loginForm/loginForm'
import css from './root.module.scss'; 
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
      <div className='inset-0 overflow-hidden flex w-screen h-screen fixed top-0 left-0 justify-center items-center pointer-events-none'>
        {Array.from({ length: 200 }).map((_, i) => (
          <div key={i} className={css.snowflake} style={{left: `${i}%`, animationDelay: `${Math.random() * (10 - 0.1) + 0.1}s`}} />
        ))}
      </div>
      <div className="flex justify-center relative">
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
