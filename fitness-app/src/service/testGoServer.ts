import { useQuery } from "@tanstack/react-query";
import useAuthStore from "./auth";

export const useTestGoServer = () => {
    const {session} = useAuthStore();
    const token = session?.access_token;
    return useQuery<any>({
        queryKey: ["goTest"],
        queryFn: async () =>{
            // get from localhost:3000/account
            console.log("GETTING ACCOUNT")
            const response = await fetch("http://localhost:3000/check-login", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
            console.log("RESPONSE ACCOUNT", response)
            return response;
        }
    })
}