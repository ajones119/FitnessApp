import { memo, useEffect, useState } from "react";
import { useExcercises } from "../../../service/WeightExcercises";
import { useBulkDeleteWorkoutWeightliftingSessionExercises, useMutateWorkoutWeightliftingSessionExercises, useWorkoutWeightliftingSession } from "../../../service/WorkoutWeightlifting";
import { Button } from "../../ui/button";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader } from "../../ui/drawer";
import Checkbox from "../../ui/checkbox";
import { Input } from "../../ui/input";


type DrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    workoutId: string;
}

const SetExercisesDrawer = ({isOpen, onClose, workoutId}: DrawerProps) => {
    const {data: exercisesCache} = useExcercises();
    const {data: workout, isLoading, isRefetching} = useWorkoutWeightliftingSession(workoutId);
    const [search, setSearch] = useState("");
    const [exerciseIds, setExerciseIds] = useState<string[]>([]);

    const {mutate: mutateExercise} = useMutateWorkoutWeightliftingSessionExercises();
    const {mutate: deleteExercise} = useBulkDeleteWorkoutWeightliftingSessionExercises( {
        onSuccess: onClose
    });

    useEffect(() => {
        if (!isLoading && !isRefetching && workout) {
            const ids = Object.keys(workout.exercises);
            setExerciseIds(ids);
        }
    }, [isLoading, isRefetching]);

    if (!exercisesCache) {
        return null;
    }

    const handleSave = () => {
        // this function should check if the exercise is already in the workout and if it is not, add it
        // if it is, do nothing
        // if the exercise is in the workout and not in the list, remove it

        const exercises = Object.keys(workout?.exercises || {});
        const exercisesToAdd = exerciseIds.filter((id) => !exercises.includes(id));
        const exercisesToRemove = exercises.filter((id) => !exerciseIds.includes(id));

        // add exercises
        mutateExercise(exercisesToAdd.map((id) => {
            return {
                workout: workoutId,
                exercise: id,
                reps: 0,
                weight: 0,
                user_id: workout?.user_id || "",
            }
        }));

        // remove exercises
        deleteExercise(exercisesToRemove.map((id) => {
            return {
                workout: workoutId,
                exercise: id,
            }
        }));
    }
    
    return (
        <Drawer open={isOpen} onClose={onClose}>
            <DrawerContent>
            <DrawerHeader>
                <h1>Set Exercises</h1>
            </DrawerHeader>
            
            <div>
                <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                {Object.values(exercisesCache.map).filter((exercise) => {
                    return exercise.name.toLowerCase().includes(search.toLowerCase());
                }).map((exercise) => {
                    return (
                        <div key={exercise.id} className="flex gap-2">
                            <Checkbox checked={exerciseIds.includes(exercise.id.toString())} onCheckedChange={(checked) => {
                                if (checked) {
                                    setExerciseIds([...exerciseIds, exercise.id.toString()]);
                                } else {
                                    setExerciseIds(exerciseIds.filter((id) => id !== exercise.id.toString()));
                                }
                            }} />
                            <p onClick={() => {
                                //recreate checkbox on the title
                                if (!exerciseIds.includes(exercise.id.toString())) {
                                    setExerciseIds([...exerciseIds, exercise.id.toString()]);
                                } else {
                                    setExerciseIds(exerciseIds.filter((id) => id !== exercise.id.toString()));
                                }
                            }}>{exercise.name}</p>
                        </div>
                    );
                })}
            </div>
            
            <DrawerFooter>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={onClose}>Close</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default memo(SetExercisesDrawer);