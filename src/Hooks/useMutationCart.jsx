import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCartApi } from "../API/CartApi";


export default function useMutationCart(fn) {
    const queryClient = useQueryClient()
    return useMutation({mutationFn:fn,
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:['getcart']})
            if(fn==clearCartApi){
                queryClient.setQueriesData('getcart' , null)
            }
        }
    })
}
