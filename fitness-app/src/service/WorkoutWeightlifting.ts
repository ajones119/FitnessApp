import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./utils";
import { useExcercises, WeightExercises } from "./WeightExcercises";

export type WorkoutWeightliftingExercises = {
    id: string;
    workout: string;
    created_at: string;
    exercise: WeightExercises;
    reps: number;
    weight: number;
    user_id: string;
};

export type WorkoutWeightliftingSession = {
    id: string;
    user_id: string;
    created_at: string;
    exercises: WorkoutWeightliftingExercises[];
}

export const useWorkoutWeightliftingSessions = (user: string, options: {skip: number, limit: number}) => {
    const {data: exercises, isLoading} = useExcercises();
    console.log("EXERCISES", exercises)
    return useQuery<WorkoutWeightliftingSession[]>({
        queryKey: ["WorkoutWeightliftingSessions", user, options.skip, options.limit],
        queryFn: async () =>{
            const response = await supabase.from("Workout_Weightlifting_Sessions").select(`
                *,
                exercises: Workout_Weightlifting_Exercises(*)
            `).eq("user_id", user).range(options.skip, options.limit)
            return response.data as WorkoutWeightliftingSession[];
        },
        enabled: !isLoading || !user,
    })
}

export const useMutateWorkoutWeightliftingSession = () => {
    const queryCache = useQueryClient();

    return useMutation({
        mutationKey: ["WorkoutWeightliftingSession"],
        mutationFn: async (session: Partial<WorkoutWeightliftingSession>) => {
            const response = await supabase.from("Workout_Weightlifting_Sessions").upsert(session)
            return response
        },
        onSuccess: () => {
            queryCache.invalidateQueries({queryKey: ["WorkoutWeightliftingSessions"]})
        }
    })
}