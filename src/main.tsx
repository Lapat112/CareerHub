import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter ,createBrowserRouter,RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import Homepage from './PageWeb/Home/Homepage.tsx'
import Personnel from './PageWeb/Sear_Person/Personnel.tsx'
import Upload from './PageWeb/Upload/Upload.tsx'


const router = createBrowserRouter([
  {path:'/', element: <App/>,
    children:[
      {path:'Homepage',element:<Homepage/>},
      {path:'Personnel',element:<Personnel/>},
      {path:'Upload',element:<Upload/>},
     
    


     
    ]
  }
 ]
)


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
