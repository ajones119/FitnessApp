import { useEffect, useState } from "react";
import { useExcercises } from "../../../service/WeightExcercises";
import { useDeleteWorkoutWeightliftingSessionExercises, useMutateWorkoutWeightliftingSessionExercises, WorkoutWeightliftingExercises, WorkoutWeightliftingExercisesMutation } from "../../../service/WorkoutWeightlifting";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Trash2 } from "lucide-react";
import Checkbox from "../../ui/checkbox";
import { motion } from "framer-motion"

type ExerciseRowProps = {
    exercise: WorkoutWeightliftingExercises;
    doubleUnilateral?: boolean;
}
const ExerciseRow = ({exercise, doubleUnilateral = false}: ExerciseRowProps) => {
    const {data: exercisesCache} = useExcercises();
    const {mutate: mutateExercise} = useMutateWorkoutWeightliftingSessionExercises();
    const {mutate: deleteExercise} = useDeleteWorkoutWeightliftingSessionExercises();
    const [editReps, setEditReps] = useState("");
    const [editWeight, setEditWeight] = useState("");
    const [editRepsLeft, setEditRepsLeft] = useState("");
    const [editWeightLeft, setEditWeightLeft] = useState("");

    useEffect(() => {
        setEditReps(exercise.reps.toString());
        setEditWeight(exercise.weight.toString());
        setEditRepsLeft(exercise.leftReps.toString());
        setEditWeightLeft(exercise.leftWeight.toString());
    }, [exercise]);


    if (!exercisesCache) {
        return <div>Loading...</div>;
    }

    const exerciseTemplate = exercisesCache.map[exercise.exercise];

    return <motion.div
        className="flex gap-2 mb-3 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 80 }}
        >
        <Checkbox checked={exercise.completed} onCheckedChange={() => mutateExercise([{...exercise, completed: !exercise?.completed}])} className="pt-4" />
        {
            exerciseTemplate.unilateral && !doubleUnilateral && <div>
                <p className="text-xs pb-1 text-accent">(L)Reps</p>
                <Input value={editRepsLeft} onChange={(e) => setEditRepsLeft(e.target.value)} onBlur={(e) => mutateExercise([{...exercise, leftReps: parseInt(e.target.value)}])} />
            </div>
        }
        {
            exerciseTemplate.unilateral && !doubleUnilateral && <div>
                <p className="text-xs pb-1 text-accent">(L)Weight</p>
                <Input value={editWeightLeft} onChange={(e) => setEditWeightLeft(e.target.value)} onBlur={(e) => mutateExercise([{...exercise, leftWeight: parseInt(e.target.value)}])} />
            </div>
        }
        <div>
            <p className="text-xs pb-1 text-accent">Reps</p>
            <Input value={editReps} onChange={(e) => setEditReps(e.target.value)} onBlur={(e) => {
                const updateObject: Partial<WorkoutWeightliftingExercisesMutation> = {reps: parseInt(e.target.value)};
                if (exerciseTemplate.unilateral && doubleUnilateral) {
                    updateObject.leftReps = parseInt(e.target.value);
                    updateObject.leftWeight = parseInt(editWeight);
                }
                mutateExercise([{...exercise, ...updateObject}])}
            } />
        </div>
        <div>
            <p className="text-xs pb-1 text-accent">Weight</p>
            <Input value={editWeight} onChange={(e) => setEditWeight(e.target.value)} onBlur={(e) => {
                const updateObject: Partial<WorkoutWeightliftingExercisesMutation> = {weight: parseInt(e.target.value)};
                if (exerciseTemplate.unilateral && doubleUnilateral) {
                    updateObject.leftWeight = parseInt(e.target.value);
                    updateObject.leftReps = parseInt(editReps);
                }
                mutateExercise([{...exercise, ...updateObject}])}
            } />
        </div>
        <div className="pt-4">
            <Button size="icon" variant="link" onClick={() => deleteExercise([exercise.id])}><div className="text-destructive"><Trash2 /></div></Button>
        </div>

    </motion.div>
    };


export default ExerciseRow;  