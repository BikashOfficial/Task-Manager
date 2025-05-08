import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector = ({ image, setImage }) => {

    const inputRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file)

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview)
        }
    }

    const handleRemoveImage = () => {
        setImage(null)
        setPreviewUrl(null)
    }

    const onChooseFile = () => {
        inputRef.current.click()
    }
    return (
        <div className='flex justify-center mb-6'>

            <input type="file"
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

            {!image ? (
                <div className='flex items-center w-20 h-20 justify-center bg-blue-600/50 rounded-full relative cursor-pointer'>
                    <LuUser className='text-4xl text-blue-600' />

                    <button type='button'
                        className='flex items-center w-8 h-8 justify-center bg-blue-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                        onClick={onChooseFile}>
                        <LuUpload />
                    </button>
                </div>
            ) :
                (
                    <div className='relative'>
                        <img src={previewUrl} className='w-20 h-20 rounded-full relative object-cover' />

                        <button type='button' className='flex items-center w-8 h-8 justify-center bg-red-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer' onClick={handleRemoveImage}><LuTrash /></button>
                    </div>
                )}

        </div>
    )
}

export default ProfilePhotoSelector