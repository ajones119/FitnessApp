import { createFileRoute, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../../../service/auth";
import { useMutateWorkoutWeightliftingSession, useWorkoutWeightliftingSessions, workoutWeightliftingSessionsQuery } from "../../../service/WorkoutWeightlifting";
import { Button } from "../../../components/ui/button";
import WorkoutSessionRow from "../../../components/pages/lifting/WorkoutSessionRow";
import {AnimatePresence, motion} from "framer-motion"
import { queryClient } from "../../../App";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/lifting/")({
  component: RouteComponent,
  beforeLoad: async (ctx) => {
    const { context } = ctx;
    const { auth } = context;
    if (auth && auth.user) {
      const { user } = auth;

      const query = workoutWeightliftingSessionsQuery(user.id, {skip: 0, limit: 10})
      queryClient.setQueryData(query.queryKey, await query.queryFn())
    }
  },
});

function RouteComponent() {
  const {user} = useAuthStore();
  const navigate = useNavigate();
  const {data: workouts = []} = useWorkoutWeightliftingSessions(user?.id || "", {skip: 0, limit: 10});
  const {mutate, isPending} = useMutateWorkoutWeightliftingSession((id) => navigate({to: `/lifting/${id}`}));

  const [mounted, setMounted] = useState(false);

  useEffect(() => {setMounted(true)}, [])

  return (
    <AnimatePresence presenceAffectsLayout>
    <motion.div
      initial={{
        x: "-100%",
      }}
      exit={{x: "100%",}}
      animate={{x: 0}}
      transition={{duration: 0.3}}
    >
      <div className="">
        <div className="flex justify-center items-center mb-3 mt-2">
          <Button size='lg' className="w-11/12" isLoading={isPending} onClick={() => {
            mutate({});
          }}>Start Workout</Button>
        </div>
        <AnimatePresence presenceAffectsLayout>
          <div className="flex flex-col gap-3">
            {workouts?.map((workout, index) => {
              return (
                <motion.div key={workout.id} initial={{x: -20, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{delay: !mounted ? index * 0.1 : 0}}>
                  <WorkoutSessionRow session={workout} />
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>
    </motion.div>
    </AnimatePresence>
  );
}
