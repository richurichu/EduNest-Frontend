import React from 'react'
import Lottie from 'lottie-react'
import animationData from '../../lottieani/animation_lo5okwp7.json'

function Admin_dashboard() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
    <h1 className="text-4xl font-bold">
      Hi, this is the Admin dashboard
    </h1>
    <div className='w-1/4  h-14' >
    <Lottie animationData={animationData}  width={50}  
    height={50} />
    </div>
  </div>
  )
}

export default Admin_dashboard