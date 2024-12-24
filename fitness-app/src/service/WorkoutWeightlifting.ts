import { useMutation, UseMutationOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./utils";
import { useExcercises } from "./WeightExcercises";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export type WorkoutWeightliftingExercises = {
    id: string;
    workout: string;
    created_at: string;
    exercise: string;
    reps: number;
    weight: number;
    user_id: string;
    leftReps: number;
    leftWeight: number;
    completed: boolean;
};

export type WorkoutWeightliftingSession = {
    id: string;
    user_id: string;
    created_at: string;
    finished_at: string | null;
    exercises: {[key: string]: WorkoutWeightliftingExercises[]};
    name: string;
}

export const useWorkoutWeightliftingSessions = (user: string, options: {skip: number, limit: number}) => {
    const {isLoading} = useExcercises();
    return useQuery<WorkoutWeightliftingSession[]>({
        queryKey: ["WorkoutWeightliftingSessions", user, options.skip, options.limit],
        queryFn: async () =>{
            const response = await supabase.from("Workout_Weightlifting_Sessions").select(`
                *,
                exercises: Workout_Weightlifting_Exercises(*)
            `).eq("user_id", user)
            .order("created_at", {ascending: false})
            .range(options.skip, options.limit)
            return response.data as WorkoutWeightliftingSession[];
        },
        enabled: !isLoading || !user,
    })
}

export const useWorkoutWeightliftingSession = (id: string) => {
    const {isLoading} = useExcercises();
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
            const session = {...rawData, exercises} as WorkoutWeightliftingSession;
            // sort each exercise by created_at date within the exercise
            Object.keys(session.exercises).forEach((key) => {
                session.exercises[key] = session.exercises[key].sort((a, b) => {
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                })
            })

            return session;
        },
        enabled: !isLoading || !id,
    })
}

export const useMutateWorkoutWeightliftingSession = (onSuccess?: () => void) => {
    const queryCache = useQueryClient();

    return useMutation({
        mutationKey: ["WorkoutWeightliftingSession"],
        mutationFn: async (session: Partial<WorkoutWeightliftingSession>) => {
            const response = await supabase.from("Workout_Weightlifting_Sessions").upsert(session)
            return response
        },
        onSuccess: () => {
            onSuccess && onSuccess()
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
    leftReps: number;
    leftWeight: number;
    completed: boolean;
};

export const useMutateWorkoutWeightliftingSessionExercises = () => {
    const queryCache = useQueryClient();

    return useMutation({
        mutationKey: ["WorkoutWeightliftingSessionExercises"],
        mutationFn: async (exercises: Partial<WorkoutWeightliftingExercisesMutation>[]) => {
            const response = await supabase.from("Workout_Weightlifting_Exercises").upsert([...exercises])
            return response
        },
        onSuccess: () => {
            queryCache.invalidateQueries({queryKey: ["WorkoutWeightliftingSessions"]})
        }
    })
}

export const useDeleteWorkoutWeightliftingSessionExercises = () => {
    const queryCache = useQueryClient();

    return useMutation({
        mutationKey: ["WorkoutWeightliftingSessionExercises"],
        mutationFn: async (ids: string[]) => {
            const response = await supabase.from("Workout_Weightlifting_Exercises").delete().in("id", ids)
            return response
        },
        onSuccess: () => {
            queryCache.invalidateQueries({queryKey: ["WorkoutWeightliftingSessions"]})
        }
    })
}

export const useBulkDeleteWorkoutWeightliftingSessionExercises = (options?: Partial<UseMutationOptions<PostgrestSingleResponse<null>, unknown, any, unknown>>) => {
    const queryCache = useQueryClient();

    return useMutation<PostgrestSingleResponse<null>, unknown, any, unknown>({
        mutationKey: ["WorkoutWeightliftingSessionExercises"],
        mutationFn: async (exercises: Array<{workout: string, exercise: string}>) => {
            const response = await supabase.from("Workout_Weightlifting_Exercises").delete().in("workout", exercises.map((e) => e.workout)).in("exercise", exercises.map((e) => e.exercise))
            return response
        },
        onSuccess: (data, variables, context) => {
            options?.onSuccess && options.onSuccess(data, variables, context)
            queryCache.invalidateQueries({queryKey: ["WorkoutWeightliftingSessions"]})
        }
    })
}