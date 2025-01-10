import { InfiniteData, useInfiniteQuery, useMutation, UseMutationOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { SERVER_URL, supabase, useServerAuth } from "./utils";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { queryClient } from "../App";
import useAuthStore from "./auth";
import { MuscleGroup } from "./MuscleGroups";

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

export type BulkWorkoutWeightliftingSessionSingle = {
    id: string;
    user_id: string;
    created_at: string;
    finished_at: string | null;
    exercises: WorkoutWeightliftingExercises[];
    name: string;
}

export const workoutWeightliftingSessionsQuery = (user: string, options: {skip: number, limit: number}) => ({
    queryKey: ["WorkoutWeightliftingSessions", user, options.skip, options.limit],
    queryFn: async () =>{
        const response = await supabase.from("Workout_Weightlifting_Sessions").select(`
            *,
            exercises: Workout_Weightlifting_Exercises(*)
        `).eq("user_id", user)
        .order("created_at", {ascending: false})
        .range(options.skip, options.limit)

        return response.data as BulkWorkoutWeightliftingSessionSingle[];
    },
    //why wont this one refetch when invalidated on another page
    refetchOnMount: true
})

export const useWorkoutWeightliftingSessions = (user: string, options: {skip: number, limit: number}) => {
    return useQuery<BulkWorkoutWeightliftingSessionSingle[]>(workoutWeightliftingSessionsQuery(user, options))
}

export const WorkoutWeightliftingSessionQuery = (id: string, disabled = false) => {
    return {
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
        enabled: !!id && !disabled,
    }
}

export const useWorkoutWeightliftingSession = (id: string) => {
    return useQuery<WorkoutWeightliftingSession>(WorkoutWeightliftingSessionQuery(id));
}

export const useWorkoutWeightliftingSessionPrefetch = (id: string) => {
    return () => queryClient.prefetchQuery(WorkoutWeightliftingSessionQuery(id));
}

export const useMutateWorkoutWeightliftingSession = (onSuccess?: (id?: string) => void) => {
    const queryCache = useQueryClient();

    return useMutation({
        mutationKey: ["WorkoutWeightliftingSession"],
        mutationFn: async (session: Partial<WorkoutWeightliftingSession>) => {
            const response = await supabase.from("Workout_Weightlifting_Sessions").upsert(session).select('id');
            return response;
        },
        onSuccess: (data) => {
            console.log('invalidate hook')
            queryCache.invalidateQueries({queryKey: ["WorkoutWeightliftingSessions"]});
            const id = data?.data?.length ? data?.data[0]?.id : '';
            onSuccess && onSuccess(id);
            
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
            return response;
        },
        onSuccess: () => {
            queryCache.invalidateQueries({queryKey: ["WorkoutWeightliftingSessions"]});
        },
        
    })
}

export const useDeleteWorkoutWeightliftingSessionExercises = () => {
    const queryCache = useQueryClient();

    return useMutation({
        mutationKey: ["WorkoutWeightliftingSessionExercises"],
        mutationFn: async (ids: string[]) => {
            queryCache.invalidateQueries({queryKey: ["WorkoutWeightliftingSessions"]});
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

export const useWorkoutSessionsInfiniteScroll = () => {
    const {user} = useAuthStore();

    const query = useInfiniteQuery<BulkWorkoutWeightliftingSessionSingle[], Error, InfiniteData<BulkWorkoutWeightliftingSessionSingle[], number>, any[], number>({
        queryKey: ['WorkoutWeightliftingSessions'],
        refetchOnMount: true,
        enabled: !!user?.id,
        initialPageParam: 0,
        queryFn: async ({pageParam = 0}) => {
            const skip: number= pageParam as number ?? 0
            const response = await supabase.from("Workout_Weightlifting_Sessions").select(`
                *,
                exercises: Workout_Weightlifting_Exercises(*)
            `)
            .order("created_at", {ascending: false})
            .range(skip, skip+2)
    
            return response.data as BulkWorkoutWeightliftingSessionSingle[];
        },
        getNextPageParam: (_lastPage, allPages) => {
            return _lastPage?.length > 2 ? allPages?.flatMap(m => m).length : undefined;
        },
    })

    const results = query?.data?.pages.flatMap(page => page);

    return {...query, results};
}

export type ExerciseDetails = {
    details: {
        id: string,
        name: string,
        group: MuscleGroup,
        bodyWeight: boolean,
        unilateral: boolean
    },
    totalNumberOfSets: number,
    highestVolume: number,
    largestOneRepMax: number,
    largestORMWorkout: number,
    lastOneHundredDaysOneRepMaxes: Array<{
        workout_date: string,
        highestORM: number
    }>,
    lastOneHundredDaysVolumes: Array<{
        workout_date: string,
        highestVolume: number
    }>


}

export const useWorkoutExerciseData = (id: string) => {
const standardToken = useServerAuth();

    return useQuery<ExerciseDetails>({
        queryKey: ['weightlifting', id],
        refetchOnMount: false,
        queryFn: async () =>{
            // get from localhost:3000/account
            const response = await fetch(SERVER_URL + `aggregate/exercises/${id}`, {
                method: "GET",
                ...standardToken
            });
            const data = response.json()
            return data;
        }
    })
}