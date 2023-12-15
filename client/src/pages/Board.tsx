import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { boardSchema, boardType } from '../hookes/schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import instance from '../hookes/AxiosInstance';
import useSession from '../hookes/sessionData';
import { toast } from 'react-toastify';
import LoadingSpinner from '../component/toast';
import { REST } from '../types/interface';


export function Board() {
    const { sessionData } = useSession()
    const queryClient = useQueryClient()

    const { register, handleSubmit, formState: { errors } } = useForm<boardType>({
        resolver: zodResolver(boardSchema)
    })

    const getBoards = useQuery({
        queryKey: [`boards`],
        queryFn: async () => {
            const res = await instance.get(`/board/${sessionData.id}`)
            return res.data.rest as REST[]
        }
    })

    const createboard = useMutation({
        mutationFn: (data: { content: string, authorId: string }) => {
            return instance.post(`/board`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`boards`] })
            toast.success(`board created successfully`)
        },
        onError: (error) => {
            toast.error(`${error.message}`)
        }
    })
    const onSubmit: SubmitHandler<boardType> = (data) => {
        createboard.mutate({
            content: data.boardTitle,
            authorId: sessionData.id
        })
    }
    const deleteboard = useMutation({
        mutationFn: (id: string) => {
            return instance.delete(`/board/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`boards`] })
            toast.success(`deleted successfully`)
        },
        onError: (error) => {
            toast.error(`${error.message}`)
        }
    })

    const boards = getBoards

    return (
        <div className='container mx-auto px-4 flex flex-col gap-3'>
            <h3 className=' pt-4 font-extrabold text-2xl'>
                Your Board
            </h3>
            <form id="create-board" onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='add a new board' type="text" {...register(`boardTitle`)}
                    className='outline-none w-3/4 sm:w-2/5 bg-gray-200 p-2 rounded-sm' />
                <button
                    disabled={createboard.isPending}
                    type='submit'
                    className='bg-blue-800 outline-none p-2 text-white hover:bg-blue-600 disabled:bg-slate-50'>
                    {createboard.isPending ? (
                        <div className='animate-bounce text-lg text-blue-600'>
                            ...
                        </div>
                    ) : `add`}
                </button>
                {errors.boardTitle && <p className='text-red-500'>{errors.boardTitle.message} </p>}
            </form>
            {
                boards.isLoading || boards.data === undefined ? (
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div>
                        {boards.data.length === 0 ? (
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                                <h2
                                    className='text-slate-600 text-4xl text-center'
                                >No Exsiting Board</h2>
                            </div>
                        ) : (
                            <article id="board-list" className='flex gap-4 pt-2 justify-start flex-wrap  align-start'>
                                {boards.data.map((item: REST) => {
                                    return (
                                        <div key={item.id} className='p-10 relative  shadow-xl w-64 h-32 border-y-2 rounded-lg'>
                                            <Link to={`/main/${item.id}`}>
                                                <p className='uppercase hover:text-blue-900 hover:font-extrabold hover:italic'>{item.content}</p>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    deleteboard.mutate(item.id)
                                                }}
                                                className='absolute  bottom-3 right-2 bg-red-600 h-8 w-8 rounded-full text-white text-md'>
                                                X
                                            </button>
                                        </div>
                                    )
                                })}
                            </article>
                        )}

                    </div>
                )
            }
        </div>
    );
}
