import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter ,createBrowserRouter,RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import Homepage from './PageWeb/Home/Homepage.tsx'
import Personnel from './PageWeb/Sear_Person/Personnel.tsx'
import Upload from './PageWeb/Upload/Upload.tsx'
import Login from './PageWeb/Login/Login.tsx'
import Register from './PageWeb/Register/Register.tsx'
import ShowCv from './PageWeb/Sear_Person/ShowCv/ShowCv.tsx'
import History from './PageWeb/User/History/History.tsx'
import UserProfile from './PageWeb/User/UserProfile.tsx'



const router = createBrowserRouter([
  {path:'/', element: <App/>,
    children:[
      {path:'Homepage',element:<Homepage/>},
      {path:'Personnel',element:<Personnel/>},
      {path:'Upload',element:<Upload/>},

      
      {path:'Login',element:<Login/>},
      {path:'Register',element:<Register/>},
      {path:'ShowCv/:id', element:<ShowCv/>},
      {path:'UserProfile/History', element:<History/>}


     
    ]
  }
 ]
)


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
