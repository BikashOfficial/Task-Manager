import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const Input = ({ value, type, onChange, placeholder, label }) => {

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div>
            <label className='text-[13px] text-slate-800' htmlFor={value}>{label}</label>

            <div className='input-box'>
                <input
                    type={
                        type == 'password' ? (showPassword ? "text" : "password") : type
                    }
                    placeholder={placeholder}
                    className='w-full bg-transparent outline-none'
                    value={value}
                    required
                    onChange={(e) => onChange(e)}
                />

                {type === 'password' && (
                    <>
                        {showPassword ?
                            (<FaRegEye
                                size={22}
                                className='text-blue-500 cursor-pointer'
                                onClick={() => toggleShowPassword()}
                            />) :
                            (<FaRegEyeSlash
                                size={22}
                                className='text-slate-500 cursor-pointer'
                                onClick={() => toggleShowPassword()}
                            />)
                        }
                    </>
                )}
            </div>
        </div>
    )
}

export default Input