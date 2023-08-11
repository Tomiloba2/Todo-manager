import { useSession } from '../hookes/Session';
import { Navigate, Outlet } from 'react-router-dom';


export function ProtectedRoute() {
    const session = useSession()
    if (session?.currentUser?.message === "success") {
        return (
            <div>
                <Outlet />
            </div>
        );
    }
    return <Navigate to='/login' />

}
