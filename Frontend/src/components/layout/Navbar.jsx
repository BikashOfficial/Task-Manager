import React, { useState } from 'react'
import SideMenu from './SideMenu'
import {HiOutlineMenu,HiOutlineX} from 'react-icons/hi'

const Navbar = ({ activeManu }) => {

    const [openSideManu, setOpenSideManu] = useState(false)

    return (
        <div className='flex bg-white border-b border-gray-200/50 backdrop-blur-[10px] shadow-sm py-4 px-7 sticky top-0 z-30'>
            <button
                className='block lg:hidden text-black'
                onClick={() => {
                    setOpenSideManu(!openSideManu)
                }}>
                {openSideManu ? (
                    <HiOutlineX className="text-2xl" />
                ) : (
                    <HiOutlineMenu className="text-2xl" />
                )}
            </button>

            <h2 className='text-xl font-medium ml-3 text-black'>Task Manager</h2>

            {openSideManu && (
                <div className='fixed top-[61px] -ml-4 bg-white'>
                    <SideMenu activeManu={activeManu} />
                </div>
            )}
            

            
        </div>
        
    )
}

export default Navbar