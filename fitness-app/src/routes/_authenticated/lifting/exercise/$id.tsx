import { createFileRoute, Link } from '@tanstack/react-router'
import { useWorkoutExerciseData } from '../../../../service/WorkoutWeightlifting';
import { Badge } from '../../../../components/ui/badge';
import VolumeOrmChart from '../../../../components/pages/WeightliftingExerciseDetails/VolumeOrmChart';
import { Card, CardContent } from '../../../../components/ui/card';

export const Route = createFileRoute('/_authenticated/lifting/exercise/$id')({
  component: RouteComponent,
})

function RouteComponent() {
    const {id} = Route.useParams();

    const {data} = useWorkoutExerciseData(id)

    if (!data) {
        return <div>Loading ...</div>;
    }

  return <div className="p-2 max-w-[600px] m-auto relative">
    <h2>{data?.details?.name || "unnamed"}</h2>
    <Badge variant="default">{data?.details?.group?.name}</Badge>
    {data?.details?.group?.parentGroup?.name && <Badge className='ml-2' variant="secondary">{data?.details?.group?.parentGroup?.name}</Badge>}
    <VolumeOrmChart id={id} />
    <Card>
      <CardContent>
        <Link to={`/lifting/${data.largestORMWorkout}/details`}>Highest ORM: {data.largestOneRepMax.toFixed(2)}</Link>
        <p>Total Number of Sets: {data.totalNumberOfSets}</p>
      </CardContent>
    </Card>
    
  </div>
}
