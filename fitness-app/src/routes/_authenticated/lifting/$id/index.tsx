import { createFileRoute } from '@tanstack/react-router'
import { useMutateWorkoutWeightliftingSession, useWorkoutWeightliftingSession } from '../../../../service/WorkoutWeightlifting';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import SetExercisesDrawer from '../../../../components/pages/lifting/SetExercisesDrawer';
import ExerciseSection from '../../../../components/pages/lifting/ExerciseSection';
import { Input } from '../../../../components/ui/input';
import Timer from '../../../../components/ui/timer';
import { parseISO } from 'date-fns';
import EndWorkoutModal from '../../../../components/pages/lifting/EndWorkoutModal';
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute('/_authenticated/lifting/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {id = ""} = Route.useParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false)
  const [name, setName] = useState("");

  const {data: workout} = useWorkoutWeightliftingSession(id);
  const {mutate} = useMutateWorkoutWeightliftingSession();

  useEffect(() => {
    setName(workout?.name || '')
  }, [workout?.name])

  if (!workout) {
    return <div>Loading...</div>;
  }

  //sort exercises so that they are in an array of awwaysm and the first item's created_at is the last
  const sortedExercises = Object.entries(workout.exercises).sort((a, b) => {
    return new Date(a[1][0].created_at).getTime() - new Date(b[1][0].created_at).getTime();
  });

  return <motion.div layout className='p-2 max-w-[600px] m-auto'>
    <div>
      <Input placeholder='Unnamed Workout' value={name} onChange={(e) => setName(e?.target?.value)} onBlur={(e) => mutate({id: workout.id, name: e.target.value})} />
      <div className='flex justify-between mt-2'>
        <Timer startDate={parseISO(workout?.created_at)} endDate={workout?.finished_at ? parseISO(workout?.finished_at) : undefined} />
        {
          workout?.finished_at ? <Button size="sm" className='text-xs p-1' variant='default' onClick={() => {
            mutate({id: workout.id, finished_at: null});
          }}>Restart Workout</Button>
          : <Button size="sm" className='text-xs p-1' variant='destructive' onClick={() => setIsEndModalOpen(true)}>Finish Workout</Button>
        }
        
      </div>
      
    </div>
    <AnimatePresence presenceAffectsLayout>
      {sortedExercises.map(([id, exercises]) => {
        return <ExerciseSection key={id} exercises={exercises} />
      })}
    </AnimatePresence>
    <div id="new-exercise-add">
      <Button onClick={() => setIsDrawerOpen(true)}>Add Exercise</Button>
    </div>
    <div>
      
    </div>
    <SetExercisesDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} workoutId={id} />
    <EndWorkoutModal id={id} handleClose={() => setIsEndModalOpen(false)} isOpen={isEndModalOpen} />
  </motion.div>
}
