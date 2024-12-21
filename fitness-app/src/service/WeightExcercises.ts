import { useQuery } from "@tanstack/react-query";
import { supabase } from "./utils";
import { MuscleGroup } from "./MuscleGroups";

export type WeightExercises = {
    id: string;
    name: string;
    user?: string;
    group?: MuscleGroup | null;
}

export const useExcercises = () => {
    
    return useQuery<WeightExercises[]>({
        queryKey: ["weightExercises"],
        queryFn: async () =>{
            const response = await supabase.from("Weight_Exercises").select(`
                *,
                Muscle_Groups(*)
            `)
            return response.data as WeightExercises[];
        }
    })
}