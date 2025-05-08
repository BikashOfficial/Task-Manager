import React from 'react'
import DashBoardLayout from '../../components/layout/DashBoardLayout'

const ManageUser = () => {
  return (
    <DashBoardLayout activeMenu="Team Members">
      
      <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-2xl font-bold'>Team Members</h1>
        <p className='text-gray-500'>This feature is under development.</p>
        <p className='text-gray-500'>Please check back later.</p>
      </div>
    </DashBoardLayout>
  )
}

export default ManageUser