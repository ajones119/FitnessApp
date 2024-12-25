import { memo, useState } from "react";
import { useExcercises } from "../../../service/WeightExcercises";
import { useMutateWorkoutWeightliftingSessionExercises, WorkoutWeightliftingExercises } from "../../../service/WorkoutWeightlifting";
import { Button } from "../../ui/button";
import ExerciseRow from "./ExerciseRow";
import useAuthStore from "../../../service/auth";
import { ArrowDownNarrowWideIcon, PlusCircle } from "lucide-react";
import Checkbox from "../../ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "../../ui/seperator";
import ExtendedExerciseSection from "./ExtendedExerciseSection";


type ExerciseSectionProps = {
    exercises: WorkoutWeightliftingExercises[];
    disabled?: boolean;
    canShowCalculated?: boolean;
}
const ExerciseSection = ({exercises, disabled = false, canShowCalculated = false}: ExerciseSectionProps) => {
    const {user} = useAuthStore();
    const {data: exercisesCache} = useExcercises();
    const {mutate: mutateExercise} = useMutateWorkoutWeightliftingSessionExercises();
    const [doubleUnilateral, setDoubleUnilateral] = useState(false);
    const [showCalculated, setShowCalculated] = useState(false);

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
                {exercisesCache.map[firstExercise.exercise].unilateral && !disabled &&
                    <div className="flex gap-1 items-center">
                        <Checkbox checked={doubleUnilateral} onCheckedChange={() => setDoubleUnilateral(!doubleUnilateral)} disabled={disabled} />
                        <p className="text-xs">Double Unilateral</p>
                    </div>
                }
            </div>
        </div>
        <AnimatePresence presenceAffectsLayout>
        {
            exercises.map((exercise) => {
                return <ExerciseRow disabled={disabled} doubleUnilateral={doubleUnilateral} key={exercise.id} exercise={exercise} />
            })
        }
        </AnimatePresence>
        {!disabled && 
            <div className="flex justify-end">
                <Button size="icon" variant="link" className="text-accent" onClick={handleAddExercise}><PlusCircle /></Button>
            </div>
        }
        {canShowCalculated &&  <motion.div className="flex justify-end">
                <motion.div animate={{rotate: showCalculated ? 180 : 0}}><Button size="icon" variant="link" className="text-accent" onClick={() => setShowCalculated(!showCalculated)}><ArrowDownNarrowWideIcon /></Button></motion.div>
            </motion.div>
        }
        <AnimatePresence presenceAffectsLayout>
            {showCalculated && <ExtendedExerciseSection exercises={exercises} />}
        </AnimatePresence>
        {
            
        }
        <Separator />
    </motion.div>
    };


export default memo(ExerciseSection);  