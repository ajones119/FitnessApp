import { useQuery } from "@tanstack/react-query";
import { supabase } from "./utils";

export type MuscleGroup = {
    id: string;
    name: string;
    parent?: MuscleGroup;
}

export const useMuscleGroups = () => {

    return useQuery<MuscleGroup[]>({
        queryKey: ["muscleGroups"],
        queryFn: async () =>{
            const response = await supabase.from("Muscle_Groups").select()
            return response.data as MuscleGroup[];
        }
    })
}