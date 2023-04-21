import React, { useState } from 'react'
import {Route , Routes} from 'react-router-dom'
import {Nabar , PinDetails , Searched , Feed , CreatePin } from '../components'

function Pins() {
  const [SerchTermed, setSerchTermed] = useState('')
  return (
    <div className='px-3 md:'>pins</div>
  )
}

export default Pins