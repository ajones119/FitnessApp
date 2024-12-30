import { createFileRoute, Link } from '@tanstack/react-router'
import { useMutateWorkoutWeightliftingSession, useWorkoutWeightliftingSession, WorkoutWeightliftingExercises } from '../../../../service/WorkoutWeightlifting';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import SetExercisesDrawer from '../../../../components/pages/lifting/SetExercisesDrawer';
import ExerciseSection from '../../../../components/pages/lifting/ExerciseSection';
import { Input } from '../../../../components/ui/input';
import Timer from '../../../../components/ui/timer';
import { parseISO } from 'date-fns';
import EndWorkoutModal from '../../../../components/pages/lifting/EndWorkoutModal';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, DumbbellIcon, TrophyIcon } from 'lucide-react';
import { Separator } from '../../../../components/ui/seperator';
import { Progress } from '../../../../components/ui/progress';
import { useReward } from 'react-rewards';

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
  const { reward } = useReward('rewardId', 'confetti');
  let numberOfExercises = 0
  let numberOfCompletedExercises = 0

  const currentVolume = Object.values((workout?.exercises || {})).reduce((acc: number, current: WorkoutWeightliftingExercises[]) => {
    let addedVolume = 0;
    current.forEach(exercise => {
      numberOfExercises ++;
      if (exercise.completed) {
        numberOfCompletedExercises ++;
        addedVolume += exercise.reps * exercise.weight;
        addedVolume += exercise.leftReps * exercise.leftWeight;
      }
    })

    return acc += addedVolume;
  }, 0 )

  useEffect(() => {
    if (numberOfCompletedExercises/numberOfExercises >= 1) {
      reward();
    }
  }, [workout?.exercises])

  useEffect(() => {
    setName(workout?.name || '')
  }, [workout?.name])

  if (!workout) {
    return null;
  }

  //sort exercises so that they are in an array of awwaysm and the first item's created_at is the last
  const sortedExercises = Object.entries(workout.exercises).sort((a, b) => {
    return new Date(a[1][0].created_at).getTime() - new Date(b[1][0].created_at).getTime();
  });




  return <motion.div layout className='p-2 max-w-[600px] m-auto relative'>
    <span id="rewardId" className='pointer-events-none absolute top-[50%] right-[50%]' />
    <Link className='flex gap-1 text-xs mb-2 items-center' to="/lifting"><ChevronLeftIcon /> All Workouts</Link>
    <div>
      <Input placeholder='Unnamed Workout' value={name} onChange={(e) => setName(e?.target?.value)} onBlur={(e) => mutate({id: workout.id, name: e.target.value})} />
      
      <div className='flex justify-between mt-2 flex-wrap'>
        <div>
          <Timer startDate={parseISO(workout?.created_at)} endDate={workout?.finished_at ? parseISO(workout?.finished_at) : undefined} />
          <p>Volume: {currentVolume}</p>
        </div>
        {
          workout?.finished_at ?<Link to={`/lifting/${id}/details`}><Button size="sm" className='text-xs p-1' variant='default'>To Details</Button></Link>
          : <Button size="sm" className='text-xs p-1' variant='destructive' onClick={() => setIsEndModalOpen(true)}>Finish Workout</Button>
        }
        
      </div>
      
    </div>
    <div className='flex gap-1 items-center'>
      🏋🏻
      <DumbbellIcon />
      <Progress value={numberOfCompletedExercises/(numberOfExercises || 1) * 100} />
      <TrophyIcon />
      💪
    </div>
    <Separator />
    <AnimatePresence presenceAffectsLayout>
      {sortedExercises.map(([id, exercises]) => {
        return <ExerciseSection key={id} exercises={exercises} />
      })}
    </AnimatePresence>
    <div id="new-exercise-add" className="mt-2">
      <Button onClick={() => setIsDrawerOpen(true)}>Add Exercise</Button>
    </div>
    <div>
      
    </div>
    <SetExercisesDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} workoutId={id} />
    <EndWorkoutModal id={id} handleClose={() => setIsEndModalOpen(false)} isOpen={isEndModalOpen} />
  </motion.div>
}
