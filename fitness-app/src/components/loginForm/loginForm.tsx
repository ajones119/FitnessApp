import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../../components/ui/button'
import { supabase } from '../../service/utils'

const loginForm = () => {
  return (
    <div className='flex'>
      <Card>
        <CardHeader>
          <CardTitle>Fitness App</CardTitle>
          <CardDescription>
            Welcome to the fitness app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-2'>
            <Button
              variant="outline" className="w-full"
              onClick={async (_e) => {
                await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: {
                    redirectTo: 'http://localhost:5173',
                  },
                })
              }}
            >
              Login with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default loginForm