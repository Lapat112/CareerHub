import { useState } from 'react'
import './App.css'

import Homepage from './PageWeb/Home/Homepage'
import Navbar from './Nav/Nav'
import Personnel from './PageWeb/Sear_Person/Personnel'
import Upload from './PageWeb/Upload/Upload'

function App() {
 

  return (
    <>
      <Navbar/>
      <Upload/>
    </>
  )
}

export default App
