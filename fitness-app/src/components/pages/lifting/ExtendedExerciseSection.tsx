import { memo, useMemo } from "react";
import { useExcercises } from "../../../service/WeightExcercises";
import { WorkoutWeightliftingExercises } from "../../../service/WorkoutWeightlifting";
import { motion } from "framer-motion";

type ExtendedExerciseSectionProps = {
    exercises: WorkoutWeightliftingExercises[];
}
const ExtendedExerciseSection = ({exercises}: ExtendedExerciseSectionProps) => {
    const {data: exercisesCache} = useExcercises();
    const [bestOneRepMax, totalVolume] = useMemo(() => {
        let bestOneRepMax = 0;
        let totalVolume = 0;

        exercises.forEach(exercise => {
            const {reps, weight, leftReps, leftWeight, completed} = exercise;
            

            if (completed) {
                // uses Brzycki
                const oneRepMax = (weight * (36/(37-reps))) + (leftWeight * (36/(37-leftReps)));
                const volume = (weight * reps) + (leftWeight * leftReps)

                if (oneRepMax > bestOneRepMax) {
                    bestOneRepMax = oneRepMax
                }
                totalVolume += volume;
            }
            
        })

        return [bestOneRepMax, totalVolume]

    }, [exercises])

    if (!exercisesCache || !exercises?.length) {
        return <div>Loading...</div>;
    }

    const firstExercise = exercises[0];


    return <motion.div
        layout
        key={`exercise-${firstExercise.id}-extra`}
        initial={{maxHeight: 0}}
        animate={{maxHeight: 400}}
        exit={{
            maxHeight: 0,
            opacity: 0,
        }}
        transition={{
            //duration: 0.3
        }}
    >
        <motion.div
        layout
        key={`exercise-${firstExercise.id}-extra`}
        initial={{opacity: "0%"}}
        animate={{opacity: "100%"}}
        exit={{
            opacity: "0%",
        }}
        transition={{
            delay: 0.1
        }}
    >
        <div>
            <p className="text-sm text-accent">Total Volume</p>
            <p>{totalVolume}lbs</p>
        </div>
        <div>
            <p className="text-sm text-accent">Best 1RM</p>
            <p>{bestOneRepMax.toFixed(2)}lbs</p>
        </div>

    </motion.div>
    </motion.div>
    };


export default memo(ExtendedExerciseSection);  