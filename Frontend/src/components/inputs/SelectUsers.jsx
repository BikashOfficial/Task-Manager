import axios from 'axios'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import { LuUsers } from 'react-icons/lu'
import Model from '../Model'
import AvatarGroup from '../AvatarGroup'

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {

    const [allUser, setAllUser] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [tempSelectedUsers, setTempSelectedUsers] = useState([])

    useEffect(() => {
        getAllUsers()
        // Initialize tempSelectedUsers with selectedUsers
        setTempSelectedUsers(selectedUsers || [])
    }, [])

    const getAllUsers = async () => {
        try {
            const res = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS)
            if (res?.data?.length > 0) {
                setAllUser(res.data)
            }
        } catch (error) {
            console.error("Error while fetching users: ", error.message)
        }
    }

    const toggleUserSelection = (userId) => {
        setTempSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        )
    }

    const handleAssign = () => {
        setSelectedUsers(tempSelectedUsers)
        setIsModalOpen(false)
    }

    const selectedUserAvatars = allUser
        .filter((user) => selectedUsers.includes(user._id))
        .map((user) => user.profileImageUrl)

    useEffect(() => {
        if (selectedUsers.length === 0) {
            setTempSelectedUsers([])
        }

        return () => { }
    }, [selectedUsers])


    return (
        <div className='space-y-4 mt-2'>
            {selectedUserAvatars.length === 0 ? (
                <button className='card-btn' onClick={() => setIsModalOpen(true)}>
                    <LuUsers className='text-sm' /> Add Members
                </button>
            ) : (
                <button className='card-btn' onClick={() => setIsModalOpen(true)}>
                    <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
                </button>
            )}

            <Model
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Select Users"
            >
                <div className='space-y-4 h-[60vh] overflow-y-auto'>
                    {allUser.map((user) => (
                        <div
                            key={user._id}
                            className='flex items-center gap-4 p-3 border-b border-gray-200'
                        >
                            <img
                                src={user.profileImageUrl}
                                alt={user.name}
                                className='rounded-full w-10 h-10'
                            />

                            <div className='flex-1'>
                                <p className='font-medium text-gray-800 '>{user.name}</p>
                                <p className='text-[13px] text-gray-500'>{user.email}</p>
                            </div>

                            <input type="checkbox"
                                checked={tempSelectedUsers.includes(user._id)}
                                onChange={() => toggleUserSelection(user._id)}
                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm outline-none'
                            />

                        </div>
                    ))}
                </div>

                <div className='flex justify-end gap-4 pt-4'>
                    <button
                        className='card-btn'
                        onClick={() => setIsModalOpen(false)}
                    >
                        Cancel
                    </button>

                    <button className='card-btn-fill'
                        onClick={handleAssign}
                    >
                        Done
                    </button>
                </div>
            </Model>

        </div>
    )
}

export default SelectUsers