import { useQuery } from "@tanstack/react-query";
import { supabase } from "./utils";
import { MuscleGroup } from "./MuscleGroups";

export type WeightExercises = {
    id: string;
    name: string;
    user?: string;
    group?: MuscleGroup | null;
    unilateral: boolean;
}

export type ExerciseCache = {
    map: {[key: string]: WeightExercises};
    list: WeightExercises[];
    typeMap: {[key: string]: WeightExercises[]};
}

export const useExcercises = () => {
    
    return useQuery<ExerciseCache>({
        queryKey: ["weightExercises"],
        queryFn: async () =>{
            const response = await supabase.from("Weight_Exercises").select(`
                *,
                group: Muscle_Groups(*)
            `)
            const data = (response.data || []) as WeightExercises[];
            console.log("DATA", data)
            const typeMap = data.reduce((acc, curr) => {
                if (curr.group) {
                    if (!acc[curr.group.id]) {
                        acc[curr.group.id] = [];
                    }
                    acc[curr.group.id].push(curr);
                } else {
                    if (!acc["ungrouped"]) {
                        acc["ungrouped"] = [];
                    }
                    acc["ungrouped"].push(curr);
                }
                return acc;
            }, {} as {[key: string]: WeightExercises[]})

            console.log("TYPE MAP", typeMap)

            const map = data.reduce((acc, curr) => {
                acc[curr.id] = curr;
                return acc;
            }, {} as {[key: string]: WeightExercises})

            return {map, typeMap, list: data} as ExerciseCache;
        }
    })
}