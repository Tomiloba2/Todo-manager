import { useQuery } from "@tanstack/react-query";
import instance from "./AxiosInstance";

type Isession={
    name:string,
    email:string,
    id:string,
}
const useSession = () => {
    const session = useQuery({
        queryKey: [`session`],
        queryFn: async () => {
            const res = await instance.get(`/sessionData`)
            return res.data
        }
    })
    return {
        sessionData: session.data as Isession,
        isloading: session.isLoading,
        isError: session.isError
    }
}

export default useSession;