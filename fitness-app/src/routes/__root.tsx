import * as React from 'react'
import { Outlet, createRootRoute, createRootRouteWithContext } from '@tanstack/react-router'
import { supabase } from '../service/utils'

export interface AuthRouteContext {
    auth: any
}

export const Route = createRootRouteWithContext<AuthRouteContext>()({
  component: RootComponent,
  beforeLoad: async ({context}) => {
    if (!context?.auth?.session) {
        const auth = await supabase.auth.getSession();
        console.log("GET AUTH", auth)
        // look into login screen + redirect -> https://tanstack.com/router/v1/docs/framework/react/guide/authenticated-routes
        if (auth?.data?.session) {
            context.auth.setSession(auth.data.session)
            context.auth.setUser(auth.data.session?.user)
        }
    }
  }
})

function RootComponent() {
  return (
    <React.Fragment>
      <div>Hello "__root"!</div>
      <Outlet />
    </React.Fragment>
  )
}
