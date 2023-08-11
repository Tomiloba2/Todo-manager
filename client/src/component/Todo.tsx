import * as React from 'react';
import instance from '../hookes/AxiosInstance';
import { ErrorHandler, LoadingSpinner } from './AsyncState';
import { useSession } from '../hookes/Session';

export interface ITodoListProps {
    id: string;
    content: string;
    createdAt: string;
    authorId: string
}

export function TodoList({ getRequest }: { getRequest: boolean }) {
    const session = useSession()
    const [todo, setTodo] = React.useState<ITodoListProps[]>([])
    const [loading, setLoading] = React.useState(false)
    const [err, setErr] = React.useState({ status: false, message: `` })
    React.useEffect(() => {
        const fetchTodo = async (id: string | undefined) => {
            setLoading(true)
            try {
                const { data } = await instance.get(`todo/${id} `)
                setTodo(data.rest)
            } catch (error: any) {
                if (error?.response) {
                    console.log(error.response.data);
                    setErr({ ...err, status: true, message: `${error.response.data}` })

                } else if (error.request) {
                    console.log(error.request);
                    setErr({ ...err, status: true, message: `${error.request}` })
                } else {
                    setErr({ ...err, status: true, message: `${error.message}` })
                }

            } finally {
                setLoading(false)
            }
        }
        fetchTodo(session?.currentUser?.rest.id)
    }, [getRequest])

    const deleteTodo = async (id: string) => {
        const res = await instance.delete(`todo/${id} `)
        console.log(res.data.message);
        location.reload()

    }

    return (
        <div style={{ position: `relative` }}>
            <div>{loading && <LoadingSpinner />} </div>
            <div>{err.status && <ErrorHandler message={err.message} />} </div>
            <section>
                {todo.length === 0 ? (
                    <div>
                        You do not have any task
                    </div>
                ) : (
                    <div>
                        {todo.map((item) => {
                            return (
                                <div key={item.id} style={{
                                    padding: ` 6px`,
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <p>{item.content} </p>
                                    <button style={{
                                        border: `none`,
                                        backgroundColor: `red`,
                                        color: `white`,
                                        width: `20px`,
                                        height: `20px`,
                                        borderRadius: `50%`
                                    }} onClick={() => deleteTodo(item.id)}>x</button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}
