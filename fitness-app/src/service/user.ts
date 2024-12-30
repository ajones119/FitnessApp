import { useQuery } from "@tanstack/react-query";
import { SERVER_URL, useServerAuth } from "./utils";

export const useUserExerciseAggregate = () => {
    const standardToken = useServerAuth();

    return useQuery<any>({
        queryKey: ["aggregate"],
        queryFn: async () =>{
            // get from localhost:3000/account
            console.log("GETTING Aggregate")
            const response = await fetch(SERVER_URL + 'aggregate/exercises', {
                method: "GET",
                ...standardToken
            })
            console.log("RESPONSE Aggregate", response)
            return response;
        }
    })
}