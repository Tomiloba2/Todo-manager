import { Outlet, useNavigate } from "react-router-dom";
import useSession from "../hookes/sessionData";
import { toast } from 'react-toastify'
import { useQuery } from "@tanstack/react-query";
import instance from "../hookes/AxiosInstance";

export function ProtectedRoute() {
    const { sessionData, isloading, isError } = useSession()
    const navigate = useNavigate()
    const logoutQuery = useQuery({
        queryFn: async () => {
            const res = await instance.get(`/logout`)
            return res.data
        },
        queryKey: ['logout'],
        enabled: false,
    })
    const logout = () => {
        if (!logoutQuery.isError) {
            logoutQuery.refetch()
            navigate(`/`)
            toast.success(`logout successful`)
        } else {
            toast.error(`logout unsuccessful`)
        }
    }
    if (isError) {
        toast.error(`not authenticated`)
        navigate(`/login`)
    }
    if (isloading) {
        return (
            <main className="">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div
                        className=" w-28 h-28
                 rounded-full border-r-8 border-l-8 p-1 border-r-orange-700 border-green-700  animate-spin">

                    </div>
                </div>
            </main>
        )
    }

    return (
        <div>
            <nav className="bg-blue-800">
                {sessionData && sessionData.name !== undefined &&
                    <div className="flex gap-8 justify-end align-middle h-full  text-white p-3">
                        <p className="uppercase">
                            welcome <span className="underline text-orange-500">{sessionData.name && sessionData.name}</span>
                        </p>
                        <button type="button"
                            onClick={logout}
                            className="bg-white rounded-md border-2 border-blue-400 text-black p-1">logout</button>
                    </div>
                }
            </nav>
            <Outlet />
        </div>
    );

}
