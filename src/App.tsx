import { Outlet } from 'react-router-dom'

import './App.css'

import Homepage from './PageWeb/Home/Homepage'
import Navbar from './Nav/Nav'
import Login from './PageWeb/Login/Login'

function App() {
 

  return (
    <>
      <Navbar/>
    
      <Outlet/>
    </>
  )
}

export default App
