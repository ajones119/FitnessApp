import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import {GiWeightLiftingUp, GiFoodTruck, GiRun} from 'react-icons/gi'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='h-screen bg-background text-foreground p-4'>
    <h1>Your Dashboard</h1>
    <div className='flex w-full flex-wrap justify-between'>
      <div className='flex lg:w-6/12 p-2'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-1 text-xl'>Calories & Macros <GiFoodTruck /></CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Link to="/macros"><Button variant={'outline'} className='btn btn-primary'>View More</Button></Link>
          </CardFooter>
        </Card>
      </div>
      <div className='flex lg:w-6/12 p-2'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-1 text-xl'>Cardio <GiRun /></CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Link to="/cardio"><Button variant={'outline'} className='btn btn-primary'>View More</Button></Link>

          </CardFooter>
        </Card>
      </div>
      <div className='flex lg:w-6/12 p-2'>
        <Card>
          <CardHeader>
            <CardTitle className='flex gap-1 items-center text-xl'>Lifting<GiWeightLiftingUp /></CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Link to="/lifting"><Button variant={'outline'} className='btn btn-primary'>View More</Button></Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
}
