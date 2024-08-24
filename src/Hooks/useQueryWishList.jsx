import { useQuery } from '@tanstack/react-query'

export default function useQueryWishList(key,fn) {
    return useQuery({queryKey:[key],
        queryFn:fn})
}
