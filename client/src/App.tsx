import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Main from "./pages/Main"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import './App.css'
import { ProtectedRoute } from "./component/ProtectedRoute"


function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <Home />
    },
    {
      path: '/signUp', element: <SignUp />
    },
    {
      path: '/login', element: <SignIn />
    },
    {
      element: <ProtectedRoute />, children: [
        {
          path: '/main', element: <Main />
        },
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
