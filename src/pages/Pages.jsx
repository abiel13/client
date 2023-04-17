import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import { Home, Login } from './'

function Pages() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/feed' exact element={<Home />} />
        <Route path='/' element={<Login />} />
    </Routes>
    </BrowserRouter>
  )
}

export default Pages