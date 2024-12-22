import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./utils";
import { useExcercises } from "./WeightExcercises";

export type WorkoutWeightliftingExercises = {
    id: string;
    workout: string;
    created_at: string;
    exercise: string;
    reps: number;
    weight: number;
    user_id: string;
};

export type WorkoutWeightliftingSession = {
    id: string;
    user_id: string;
    created_at: string;
    exercises: {[key: string]: WorkoutWeightliftingExercises[]};
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

export const useWorkoutWeightliftingSession = (id: string) => {
    const {data: exercises, isLoading} = useExcercises();
    console.log("EXERCISES", exercises)
    return useQuery<WorkoutWeightliftingSession>({
        queryKey: ["WorkoutWeightliftingSessions", id, ],
        queryFn: async () =>{
            const response = await supabase.from("Workout_Weightlifting_Sessions").select(`
                *,
                exercises: Workout_Weightlifting_Exercises(*)
            `).eq("id", id)

            const rawData =  response?.data ? response.data[0] : [];
            const exercises = rawData.exercises.reduce((acc: {[key: string]: WorkoutWeightliftingExercises[]}, curr: WorkoutWeightliftingExercises) => {
                if (!acc[curr.exercise]) {
                    acc[curr.exercise] = [];
                }
                acc[curr.exercise].push(curr);
                return acc;
            }, {} as {[key: string]: WorkoutWeightliftingExercises[]})

            return {...rawData, exercises} as WorkoutWeightliftingSession;
        },
        enabled: !isLoading || !id,
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

export type WorkoutWeightliftingExercisesMutation = {
    id: string;
    workout: string;
    created_at: string;
    exercise: string;
    reps: number;
    weight: number;
    user_id: string;
};

export const useMutateWorkoutWeightliftingSessionExercise = () => {
    const queryCache = useQueryClient();

    return useMutation({
        mutationKey: ["WorkoutWeightliftingSessionExercise"],
        mutationFn: async (exercise: Partial<WorkoutWeightliftingExercisesMutation>) => {
            const response = await supabase.from("Workout_Weightlifting_Exercises").upsert(exercise)
            return response
        },
        onSuccess: () => {
            queryCache.invalidateQueries({queryKey: ["WorkoutWeightliftingSessions"]})
        }
    })
}