import { Outlet } from 'react-router-dom'

import './App.css'

import Homepage from './PageWeb/Home/Homepage'
import Navbar from './Nav/Nav'
import Login from './PageWeb/Login/Login'
import ShowCv from './PageWeb/Sear_Person/ShowCv/ShowCv'

function App() {
 

  return (
    <>
      <Navbar/>
      
      <Outlet/>
    </>
  )
}

export default App
