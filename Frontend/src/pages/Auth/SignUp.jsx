// import React from 'react'

// const SignUp = () => {
//   return (
//     <div>SignUp</div>
//   )
// }

// export default SignUp

import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import axios from 'axios'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'
import { API_PATHS } from '../../utils/apiPath'
import uploadImage from '../../utils/uploadImage'
import axiosInstance from '../../utils/axiosInstance'
import { UserContext } from '../../context/userContext'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adminInviteToken, setAdminInviteToken] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   let profileImageUrl = "";

  //   try {

  //     if (profilePic) {
  //       const imgUploadRes = await uploadImage(profilePic)
  //       profileImageUrl = imgUploadRes.imageUrl || "";
  //     }

  //     const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
  //       name,
  //       email,
  //       password,
  //       profileImageUrl,
  //       adminInviteToken
  //     })

  //     const { token, role } = res.data;

  //     if (token) {
  //       localStorage.setItem("token", token);
  //       console.log('Stored token:', localStorage.getItem("token"));
  //       updateUser(res.data)

  //       if (role === 'admin') {
  //         navigate("/admin/dashboard")
  //       } else {
  //         navigate("/user/dashboard")
  //       }
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.data.message) {
  //       setError(error.response.data.message)
  //     } else {
  //       setError("something went wrong,try again!")
  //     }
  //   }

  // }

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      console.log('Sending signup request with:', {
        name:fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken
      });

      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name:fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken
      });

      console.log('Signup response:', res.data);

      const { token, role } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", role); // Add this line
        console.log('Stored token:', localStorage.getItem("token"));
        updateUser(res.data);

        if (role === 'admin') {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      console.error('Signup error:', error.response || error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, try again!");
      }
    }
};

  return (
    <AuthLayout>

      <div className='lg:w-[70%] h-3/4 md:h-full  flex flex-col justify-center mt-4 '>
        <h3 className='text-1xl font-semibold text-black'>Welcome !</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Enter detals to create Account..</p>


        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />


          <div>
            <label className='text-[13px] text-slate-800' htmlFor="">Enter full name <span className='text-rose-600 font-bold'>*</span></label>

            <input
              type="text"
              value={fullName}
              className='input-box mb-2'
              required
              onChange={({ target }) => setFullName(target.value)}
              placeholder='Enter full name'
            // label="Emai Eddress"
            />

            <label className='text-[13px] text-slate-800' htmlFor="">Enter Email Address <span className='text-rose-600 font-bold'>*</span></label>

            <input
              type="email"
              value={email}
              className='input-box mb-2'
              required
              onChange={({ target }) => setEmail(target.value)}
              placeholder='john@example'
            // label="Emai Eddress"
            />
            <label className='text-[13px] text-slate-800' htmlFor="">Enter Password <span className='text-rose-600 font-bold'>*</span></label>

            <input
              type="password"
              value={password}
              required
              className='input-box mb-2'
              onChange={({ target }) => setPassword(target.value)}
              placeholder='min 8 characters'
            // label="Password"
            />

            <label className='text-[13px] text-slate-800' htmlFor="">Enter admin Invite Token (optional to become admin)</label>
            <input
              type="text"
              value={adminInviteToken}
              className='input-box mb-2'
              onChange={({ target }) => setAdminInviteToken(target.value)}
              placeholder='Enter Token '
            // label="Emai Eddress"
            />
            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button type='submit'
              className='btn-primary'>Create Acount</button>

            <p className='text-[13px] text-slate-800 mt-3 '>
              Already have an account?{" "}
              <Link to="/login" className='text-blue-600 underline font-medium'>login</Link>
            </p>
          </div>
        </form>
      </div>

    </AuthLayout>
  )
}

export default SignUp