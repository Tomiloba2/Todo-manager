import { useQuery } from '@tanstack/react-query';
import { TodoList } from '../component/Todo';
import { useParams } from 'react-router-dom';
import instance from '../hookes/AxiosInstance';
import { SMain } from '../types/interface';


export default function Main() {
  const params = useParams()
  const { id } = params

  const getBoards = useQuery({
    queryKey: [`boards`],
    queryFn: async () => {
      const res = await instance.get(`/a-board/${id}`)
      return res.data as SMain
    }
  })


  return (
    <section id='main' className='container mx-auto px-4 flex flex-col gap-3'>
      <h3 className='pt-4 font-extrabold text-2xl'>
        {getBoards.isLoading || getBoards.data?.rest === undefined ? (
          <div className='animate-bounce text-green-700'>....</div>
        ) : (
          <div>{getBoards.data?.rest.content.toUpperCase()}</div>
        )}
      </h3>
      <article>
        {getBoards.data === undefined ? null : (
          <div className=' flex gap-5 max-sm:flex-col sm:max-xl:flex-col xl:flex-row justify-between align-middle h-full  '>
            <TodoList board={getBoards?.data} title='To Do' />
            <TodoList board={getBoards.data} title='in progress' />
            <TodoList board={getBoards.data} title='Done' />
          </div>
        )}
      </article>
    </section>
  );
}

