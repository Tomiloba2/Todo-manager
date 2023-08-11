import * as React from 'react';
import svg from '../assets/teacher5.webp'
import { useClock } from '../hookes/Clock';
import { useSession } from '../hookes/Session';
//import axios from 'axios'
import instance from '../hookes/AxiosInstance';
import { TodoList } from '../component/Todo';
import { useNavigate } from 'react-router-dom';


export default function Main() {
  const session = useSession()
  const navigate = useNavigate()
  const [inputTodo, setInputTodo] = React.useState({
    content: '',
    authorId: session?.currentUser?.rest.id
  })
  const [getRequest, setGetRequest] = React.useState(false)
  const clock = useClock()
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    instance.post(`todo`, inputTodo)
      .then((res) => {
        console.log(res.data);
        if (!getRequest) {
          setGetRequest(true)
        } else if (getRequest) {
          setGetRequest(false)
        }
      }).catch(error => {
        if (error?.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(error.message);

        }

      }).finally(() => {
        setInputTodo({ ...inputTodo, content: `` })
      })
  }
  const LogOut = () => {
    session?.LogOut().then(() => navigate(`/`))
  }
  return (
    <section id='main'>
      <section className='img-wrapper'>
        <img src={svg} alt="avatar image" />
        <p>{`welcome ${session?.currentUser?.rest.name} `}</p>
      </section>
      <section className='clock'>
        {clock}
        <button style={{
          border: `1px solid green`,
          color: `white`,
          backgroundColor: `teal`
        }} onClick={LogOut}>logout</button>
      </section>
      <section className='todo-section'>
        <article>
          <h4>Tasks list</h4>
          <article className='card'>
            <div>
              <form className='add-todo' action="" method="post" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder='Tasks list'
                  value={inputTodo.content}
                  onChange={(e) => setInputTodo({ ...inputTodo, content: e.target.value })} />
                <button type='submit'>+</button>
              </form>
            </div>
            <div className='li'>
              <TodoList getRequest={getRequest} />
            </div>
          </article>
        </article>
      </section>
    </section>
  );
}
