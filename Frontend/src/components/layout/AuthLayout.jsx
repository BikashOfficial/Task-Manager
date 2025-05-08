import React from 'react'
import image from '../../assets/hero.jpg'

const AuthLayout = ({ children }) => {
  return (
    <div className='flex'>

      <div className='w-screen h-screen md:w-[60vw] bg-white px-12 pt-8 pb-12'>
        <h2 className='text-2xl font-semibold text-black'>Task Manager</h2>
        {children}
      </div>

      <div className='hidden md:flex w-[40vw] bg-blue-200 h-screen bg-cover bg-norepeat bg-center overfolow-hidden p-8  items-center justify-center '>
        {/* bg-cover bg-norepeat bg-center overfolow-hidden p-8 */}
        <img src={""} className='' />
      </div>

    </div>
  )
}

export default AuthLayout