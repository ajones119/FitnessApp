import { createFileRoute } from '@tanstack/react-router'
import { useMutateWorkoutWeightliftingSessionExercise, useWorkoutWeightliftingSession } from '../../../../service/WorkoutWeightlifting';
import { ExerciseSelect } from '../../../../components/Selects/ExerciseSelect';
import useAuthStore from '../../../../service/auth';

export const Route = createFileRoute('/_authenticated/lifting/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {id = ""} = Route.useParams();
  const {user} = useAuthStore();

  const {data: workout} = useWorkoutWeightliftingSession(id);
  const {mutate: mutateExercise} = useMutateWorkoutWeightliftingSessionExercise();

  const handleAddExercise = (exercise: string) => {
    mutateExercise({workout: id, exercise, reps: 0, weight: 0, user_id: user?.id || ""});
  };

  return <div>
    {JSON.stringify(workout)}
    
    <div id="new-exercise-add">
      <ExerciseSelect value="" onChange={(value) => {handleAddExercise(value)}} />
    </div>
  </div>
}

/*
{workout?.exercises.map((exercise) => {
      return <div key={exercise.id}>
        {JSON.stringify(exercise)}
        <ExerciseSelect value={exercise.exercise} onChange={(value) => mutateExercise({...exercise, exercise: value})} />
      </div>
    })}
*/
