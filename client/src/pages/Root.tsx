import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'


export function Root() {
    return (
        <div>
            <Outlet />
            <ToastContainer />
        </div>
    );
}
