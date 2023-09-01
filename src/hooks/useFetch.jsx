import { useQuery } from "@tanstack/react-query"
import axiosClient from "../axios-client"


export const useFetch = (queryKey, endPoint) => {
    return useQuery({
        queryKey: queryKey,
        queryFn: () => axiosClient(endPoint).then(({ data }) => data)
    })
}


