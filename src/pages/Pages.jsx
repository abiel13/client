import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import { Home, Login } from './'

function Pages() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/*'  element={<Home />} />
        <Route path='/login' element={<Login />} />
    </Routes>
    </BrowserRouter>
  )
}

export default Pages