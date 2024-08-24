import { useQuery } from "@tanstack/react-query";

//share login
export default function useQueryCart(key,fn) {
    return useQuery({queryKey:[key],
        queryFn:fn})
}
