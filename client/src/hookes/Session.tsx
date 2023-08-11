import * as React from 'react';
//import axios from 'axios'
import instance from './AxiosInstance';
type ISessionContext = {
    currentUser: {
        message: string;
        rest: {
            id: string | undefined;
            name: string | undefined;
            email: string | undefined;
            createdAt: string | undefined;
        }
    } | undefined;
    Login: (input: { email: string, password: string }) => Promise<any>;
    LogOut: () => Promise<unknown>;
    loading: boolean;
    err: { status: boolean, message: string }
}
const SessionContext = React.createContext<ISessionContext | null>(null)

export interface ISessionProviderProps {
    children: React.ReactNode
}

export function SessionProvider(props: ISessionProviderProps) {
    const [currentUser, setCurrentUser] = React.useState(JSON.parse(localStorage.getItem("user") || '{}'))
    const [loading, setLoading] = React.useState(false)
    const [err, setErr] = React.useState({ status: false, message: `` })
    async function Login(input: { email: string, password: string }) {
        setLoading(true)
        try {
            const res = await instance.post(`login`, input)
            setCurrentUser(res.data)
            console.log(res.data);
            return res.data
        } catch (error: any) {
            if (error.response) {
                setErr({ ...err, status: true, message: `${error.response.data}` })
            } else if (error.request) {
                setErr({ ...err, status: true, message: `${error.request}` })
            } else {
                setErr({ ...err, status: true, message: `${error.message}` })
            }
        } finally {
            setLoading(false)
        }
    }
    async function LogOut() {
        try {
            await instance.post('logout')
            setCurrentUser(null)
        } catch (error) {
            console.log(error);
            return error
        }
    }
    React.useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    const value = { currentUser, Login, LogOut, loading, err }
    return (
        <div>
            <SessionContext.Provider value={value}>
                {props.children}
            </SessionContext.Provider>
        </div>
    );
}

export const useSession = () => {
    return React.useContext(SessionContext)
}
