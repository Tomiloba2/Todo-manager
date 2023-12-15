import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

export interface IRootProps {
}

export function Root(props: IRootProps) {
    return (
        <div>
            <Outlet />
            <ToastContainer />
        </div>
    );
}
