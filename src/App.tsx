import { Outlet } from 'react-router-dom'

import './App.css'

import Homepage from './PageWeb/Home/Homepage'
import Navbar from './Nav/Nav'
import Login from './PageWeb/Login/Login'
import UserCv from './PageWeb/Sear_Person/UserCv/UserCv'

function App() {
 

  return (
    <>
      <Navbar/>
      <UserCv/>
      <Outlet/>
    </>
  )
}

export default App
