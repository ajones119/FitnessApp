import { createFileRoute, Link } from "@tanstack/react-router";
import useAuthStore from "../../../service/auth";
import { useMutateWorkoutWeightliftingSession, useWorkoutWeightliftingSessions } from "../../../service/WorkoutWeightlifting";
import { Button } from "../../../components/ui/button";

export const Route = createFileRoute("/_authenticated/lifting/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {user} = useAuthStore();
  const {data: workouts} = useWorkoutWeightliftingSessions(user?.id || "", {skip: 0, limit: 10});
  const {mutate, isPending} = useMutateWorkoutWeightliftingSession();

  return (
    <div>
      <Button isLoading={isPending} onClick={() => {
        mutate({});
        console.log("Start Workout");
      }}>Start Workout</Button>
      {workouts?.map((workout) => {
        return (
          <div key={workout.id} className="flex gap-2">
            <div>{workout.id}</div>
            <div>{workout.created_at}</div>
            <Link to={`/lifting/${workout.id}`}>View</Link>
          </div>
        );
      })}
    </div>
  );
}
