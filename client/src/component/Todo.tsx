import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form'
import { TodoType, todoSchema } from '../hookes/schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify'
import instance from '../hookes/AxiosInstance'
import { SMain, REST, IMain } from '../types/interface';

interface ITodo {
    title: 'To Do' | "in progress" | "Done";
    board: SMain;
}


export function TodoList(props: ITodo) {
    const { board, title } = props
    const { register, handleSubmit, formState: { errors } } = useForm<TodoType>({
        resolver: zodResolver(todoSchema)
    })

    const queryClient = useQueryClient()
    const getTodo = useQuery({
        queryKey: [`todos`],
        queryFn: async (): Promise<IMain> => {
            const res = await instance.get(`/todo/${board.rest.id}`)
            return res.data
        }
    })
    const addTodo = useMutation({
        mutationFn: (data: { content: string, boardId: string }) => {
            return instance.post(`/todo`, data)
        },
        onSuccess: () => {
            toast.success(`added successfully`)
            queryClient.invalidateQueries({ queryKey: [`todos`] })
        },
        onError: (error) => {
            toast.error(`${error.message}`)
        }
    })
    const onSubmit: SubmitHandler<TodoType> = (data) => {
        addTodo.mutate({ content: data.content, boardId: board.rest.id })
    }

    const completedTodo = useMutation({
        mutationFn: (data: { id: string, isComplete: boolean }) => {
            return instance.patch(`/todo/${data.id}`, { isComplete: data.isComplete })
        },
        onSuccess: () => {
            toast.success(`Task successfully completed`)
            queryClient.invalidateQueries({ queryKey: [`todos`] })
        },
        onError: (error) => {
            toast.error(`${error.message}`)
        }
    })
    const deleteTodo = useMutation({
        mutationFn: (id: string) => {
            return instance.delete(`/todo/${id}`)
        },
        onSuccess: () => {
            toast.success(`deleted successfully`)
            queryClient.invalidateQueries({ queryKey: [`todos`] })
        },
        onError: (error) => {
            toast.error(`${error.message}`)
        }
    })

    const list = getTodo
    const done = list.data?.rest.filter((item: REST) => {
        return item.isComplete === true
    })
    const inProgress = list.data?.rest.filter((item: REST) => {
        return item.isComplete === false
    })

    return (
        <div className='border-2 w-full md:w-5/6 '>
            <h3 className='bg-blue-700 text-white p-2 text-center uppercase'>{title}</h3>
            <div className='flex flex-col justify-center align-middle p-5'>
                {title === 'To Do' ? (
                    <form action="" className='mb-6 relative' onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" className=' outline-none border-b-2 w-full' {...register(`content`)} />
                        <input type="submit"
                            value="+"
                            className='absolute right-4 rounded-full h-5 w-5 text-white bg-blue-400' />
                        {errors.content && <div className='pt-1 text-red-700'>{errors.content.message}</div>}
                    </form>
                ) : null}
                <div className='relative'>
                    {list.isLoading && list.data?.rest === undefined ? (
                        <div className='w-full relative mt-2 animate-pulse'>
                            <div className='bg-gray-400 border-2  p-2'></div>
                            <div className='bg-gray-400 border-2  p-2'></div>
                            <div className='bg-gray-400 border-2  p-2'></div>
                            <div className='bg-gray-400 border-2  p-2'></div>
                        </div>
                    ) : (
                        <div>
                            {list.data?.rest.length !== 0 ? (
                                <ul className='w-full'>
                                    {title === 'To Do' ? (
                                        <>
                                            {list.data?.rest.map((item: REST) => {
                                                return (
                                                    <li key={item.id} className='w-full relative mt-2'>
                                                        <div className='border-gray-200 border-2  p-2'>{item.content}</div>
                                                        <button
                                                            onClick={() => {
                                                                deleteTodo.mutate(item.id)
                                                            }}
                                                            className='absolute right-0.5 bottom-0.5 bg-red-500 text-white p-2'>X</button>
                                                        <input
                                                            type="checkbox"
                                                            name="complete" id=""
                                                            className='absolute -left-4 bottom-4'
                                                            checked={item.isComplete === true ? true : false}
                                                            onChange={() => completedTodo.mutate(
                                                                { id: item.id, isComplete: item.isComplete }
                                                            )} />
                                                    </li>
                                                )
                                            })}
                                        </>
                                    ) : (
                                        <>
                                            {title === 'in progress' ? (
                                                <>
                                                    {inProgress?.map((item: REST) => {
                                                        return (
                                                            <li key={item.id} className='w-full relative mt-2'>
                                                                <div className='border-gray-200 border-2  p-2'>{item.content}</div>
                                                                <button
                                                                    onClick={() => {
                                                                        deleteTodo.mutate(item.id)
                                                                    }}
                                                                    className='absolute right-0.5 bottom-0.5 bg-red-500 text-white p-2'>X</button>
                                                            </li>
                                                        )
                                                    })}
                                                </>
                                            ) : (
                                                <>
                                                    {done?.length === 0 && (
                                                        <div>
                                                            <div className='flex justify-center align-middle h-full'>
                                                                <h2
                                                                    className='text-slate-600 text-md text-center'
                                                                >No Completed Task</h2>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {done?.map((item: REST) => {
                                                        return (
                                                            <li key={item.id} className='w-full relative mt-2'>
                                                                <div className='border-gray-200 border-2  p-2'>{item.content}</div>
                                                                <button
                                                                    onClick={() => {
                                                                        deleteTodo.mutate(item.id)
                                                                    }}
                                                                    className='absolute right-0.5 bottom-0.5 bg-red-500 text-white p-2'>X</button>
                                                            </li>
                                                        )
                                                    })}
                                                </>
                                            )}
                                        </>
                                    )}
                                </ul>
                            ) : (
                                <div>
                                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                                        <h2
                                            className='text-slate-600 text-md text-center'
                                        >No Exsiting todos</h2>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
