import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { supabase } from '../service/utils'
import { AuthStore } from '../service/auth'

export interface AuthRouteContext {
  auth: AuthStore | null
}

export const Route = createRootRouteWithContext<AuthRouteContext>()({
  component: RootComponent,
  beforeLoad: async ({ context }) => {
    if (!context?.auth?.session) {
      const auth = await supabase.auth.getSession();
      console.log("GET AUTH", auth)
      // look into login screen + redirect -> https://tanstack.com/router/v1/docs/framework/react/guide/authenticated-routes
      if (auth?.data?.session && context.auth) {
        context.auth.setSession(auth.data.session)
        context.auth.setUser(auth.data.session?.user)
      }
    }
  }
})

function RootComponent() {

  return (
    <React.Fragment>
      <div className='w-screen h-full bg-background text-foreground'>
        <Outlet />
      </div>
    </React.Fragment>
  )
}
