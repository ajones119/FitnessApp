import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutateWorkoutWeightliftingSession, useWorkoutSessionsInfiniteScroll, } from "../../../service/WorkoutWeightlifting";
import { Button } from "../../../components/ui/button";
import WorkoutSessionRow from "../../../components/pages/lifting/WorkoutSessionRow";
import {AnimatePresence, motion} from "framer-motion"
import { Virtuoso } from "react-virtuoso";

export const Route = createFileRoute("/_authenticated/lifting/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const {fetchNextPage, results, isLoading, hasNextPage, isFetching, isRefetching } = useWorkoutSessionsInfiniteScroll();
  const {mutate, isPending} = useMutateWorkoutWeightliftingSession((id) => navigate({to: `/lifting/${id}`}));

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
      <div className="h-screen m-auto w-11/12">
        <div className="flex justify-center items-center mb-3 mt-2">
          <Button size='lg' className="w-11/12" isLoading={isPending} onClick={() => {
            mutate({});
          }}>Start Workout</Button>
        </div>
        <div className={`flex-grow h-[calc(100%-80px)] flex-shrink overflow-y-auto`}>
          <Virtuoso
            className="h-full m-auto w-11/12 removeScrollbar"
            data={results || []}
            itemContent={(_, workout) => {
              return (<div className="mb-2">
                    <motion.div key={workout.id} initial={{x: -20, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{delay: (Number(workout.id)%10)/40}}>
                      <WorkoutSessionRow session={workout} />
                    </motion.div>
              </div>)
            }}
            endReached={() => {
              console.log("hit next page", !isLoading, !isFetching, !isRefetching, hasNextPage)
              !isLoading && !isFetching && !isRefetching && hasNextPage && fetchNextPage();
            }}
          />
        </div>
      </div>
    </motion.div>
    </AnimatePresence>
  );
}