import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Button } from '../components/ui/button';
import { supabase } from '../service/utils';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/"! Go To <Link href="/route1">route1</Link> <Button style={{maxWidth: 400}} onClick={async (_e) => {
        await supabase.auth.signInWithOAuth({provider: "google", options: {
        redirectTo: 'http://localhost:5173'
        }});
    }}
    >Login</Button></div>
}
