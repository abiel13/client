import React, { useState } from 'react'
import {Route , Routes} from 'react-router-dom'
import {Navbar , PinDetails , Searched , Feed , CreatePin } from '../components'

function Pins({ user }) {
  const [SerchTermed, setSerchTermed] = useState('')
  return (
    <div className='px-3 md:px-5'>
      <div className="bg-gray-50">
        <Navbar searched={SerchTermed} user={user} setSearched={setSerchTermed} />
      </div>
<div className="h-full">
  <Routes>
    <Route path='/' element={<Feed />} />
    <Route path='/category/:catId' element={<Feed />} />
    <Route path='/pin-detail/:pin' element={<PinDetails user={user}/>} />
    <Route path='/createPin' element={<CreatePin user={user} />} />
    <Route path='/search' element={<Searched searched={SerchTermed} setSearched={setSerchTermed} />} />
  </Routes>
</div>
    </div>
  )
}

export default Pins