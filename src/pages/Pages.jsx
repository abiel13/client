import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import { Login } from './'
import Home from '../container/Home'
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