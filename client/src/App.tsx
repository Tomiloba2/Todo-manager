import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Main from "./pages/Main"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import './App.css'
import { ProtectedRoute } from "./component/ProtectedRoute"
import { Board } from "./pages/Board"
import { ForgotPassword } from "./pages/ForgotPAssword"
import { ChangePassword } from "./pages/Change-Password"
import { Root } from "./pages/Root"
import 'react-toastify/dist/ReactToastify.css'
import { NotFound } from "./pages/Not-found"


function App() {
  const router = createBrowserRouter([
    {
      element: <Root />, children: [
        {
          path: '/', element: <Home />
        },
        {
          path: '/signUp', element: <SignUp />
        },
        {
          path: '/login', element: <SignIn />
        }, {
          path: '/forgot-password', element: <ForgotPassword />
        },
        {
          path: '/change-password/:id', element: <ChangePassword />
        },
        {
          element: <ProtectedRoute />, children: [
            {
              path: '/main/:id', element: <Main />
            }, {
              path: '/board', element: <Board />
            },
          ]
        },
        {
          path: `*`, element: <NotFound />
        }
      ]
    }
  ])

  return (
    <>
      <div id="app">
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
