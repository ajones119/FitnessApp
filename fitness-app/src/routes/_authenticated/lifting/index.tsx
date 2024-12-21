import { createFileRoute } from "@tanstack/react-router";
import { useExcercises } from "../../../service/WeightExcercises";
import { useMuscleGroups } from "../../../service/MuscleGroups";
import useAuthStore from "../../../service/auth";
import { useMutateWorkoutWeightliftingSession, useWorkoutWeightliftingSessions } from "../../../service/WorkoutWeightlifting";
import { Button } from "../../../components/ui/button";

export const Route = createFileRoute("/_authenticated/lifting/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: groups } = useMuscleGroups();
  const { data: excercises } = useExcercises();
  const {user} = useAuthStore();
  const {data: workouts} = useWorkoutWeightliftingSessions(user?.id || "", {skip: 0, limit: 10});
  const {mutate, isPending} = useMutateWorkoutWeightliftingSession();
  return (
    <div>
      Hello "/_authenticated/lifting/"!
      {JSON.stringify(groups)}++++
      {JSON.stringify(excercises)}++++
      {JSON.stringify(user?.id)}
      <br />
      <br />
      <Button isLoading={isPending} onClick={() => {
        mutate({});
        console.log("Start Workout");
      }}>Start Workout</Button>
      {JSON.stringify(workouts)}
    </div>
  );
}
