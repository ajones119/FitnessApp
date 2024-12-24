import { memo, useState } from "react";
import { useExcercises } from "../../../service/WeightExcercises";
import { useMutateWorkoutWeightliftingSessionExercises, WorkoutWeightliftingExercises } from "../../../service/WorkoutWeightlifting";
import { Button } from "../../ui/button";
import ExerciseRow from "./ExerciseRow";
import useAuthStore from "../../../service/auth";
import { PlusCircle } from "lucide-react";
import Checkbox from "../../ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";


type ExerciseSectionProps = {
    exercises: WorkoutWeightliftingExercises[];
    }
const ExerciseSection = ({exercises}: ExerciseSectionProps) => {
    const {user} = useAuthStore();
    const {data: exercisesCache} = useExcercises();
    const {mutate: mutateExercise} = useMutateWorkoutWeightliftingSessionExercises();
    const [doubleUnilateral, setDoubleUnilateral] = useState(false);


    if (!exercisesCache || !exercises?.length) {
        return <div>Loading...</div>;
    }

    const firstExercise = exercises[0];

    const handleAddExercise = () => {
        mutateExercise([{workout: firstExercise.workout, exercise: firstExercise.exercise, reps: 0, weight: 0, user_id: user?.id || ""}]);
    };

    return <motion.div
        layout
        key={`exercise-${firstExercise.id}`}
        exit={{
            x: "80%",
            opacity: 0
        }}
        transition={{
            duration: 0.3
        }}
    >
        <div className="flex gap-2 justify-between items-top">
            <div>
                <h3>{exercisesCache.map[firstExercise.exercise].name || "Unnamed"}</h3>
                <p>{exercisesCache.map[firstExercise.exercise].group?.name}</p>
                {exercisesCache.map[firstExercise.exercise].unilateral &&
                <div className="flex gap-1 items-center">
                    <Checkbox checked={doubleUnilateral} onCheckedChange={() => setDoubleUnilateral(!doubleUnilateral)} />
                    <p className="text-xs">Double Unilateral</p>
                </div>
                }
            </div>
        </div>
        <AnimatePresence presenceAffectsLayout>
        {
            exercises.map((exercise) => {
                return <ExerciseRow doubleUnilateral={doubleUnilateral} key={exercise.id} exercise={exercise} />
            })
        }
        </AnimatePresence>
        <div className="flex justify-end">
            <Button size="icon" variant="link" className="text-accent" onClick={handleAddExercise}><PlusCircle /></Button>
        </div>
    </motion.div>
    };


export default memo(ExerciseSection);  