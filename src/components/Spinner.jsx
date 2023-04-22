import React from 'react'
import {Circles} from 'react-loader-spinner'

function Spinner({message }) {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <Circles  height={50} width={200} ariaLabel='loading...' color='blue'  />
      <p className='text-lg '>{message}</p>
    </div>
  )
}

export default Spinner