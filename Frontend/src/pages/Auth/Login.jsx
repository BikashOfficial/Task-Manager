import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import axios from 'axios'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import { UserContext } from '../../context/userContext'

const Login = () => {


  // const userData = {

  //   "email": "test@gg.com",
  //   "password": "1111111111111"

  // }
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email, password
      })

      const { token, role } = res.data;

      if (token) {
        // localStorage.setItem("token", token);
        localStorage.setItem("token", token);
        // sessionStorage.setItem("token", token);
        // document.cookie = `token=${token}; path=/`;
        // localStorage.setItem("userRole", role);
        // localStorage.setItem("userData", JSON.stringify(res.data));
        console.log('Stored token:', localStorage.getItem("token"));
        updateUser(res.data)

        if (role === 'admin') {
          navigate("/admin/dashboard")
        } else {
          navigate("/user/dashboard")
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("something went wrong,try again!")
      }
    }
  }

  return (
    <AuthLayout>

      <div className='lg:w-[70%] h-3/4 md:h-full  flex flex-col justify-center '>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Enter detals to login..</p>


        <form onSubmit={handleLogin}>
          <label className='text-[13px] text-slate-800' htmlFor="">Enter Email Address</label>

          <input
            type="email"
            value={email}
            className='input-box'
            required
            onChange={({ target }) => setEmail(target.value)}
            placeholder='john@example'
            label="Emai Eddress"
          />
          <label className='text-[13px] text-slate-800' htmlFor="">Enter Password</label>

          <input
            type="password"
            value={password}
            required
            className='input-box'
            onChange={({ target }) => setPassword(target.value)}
            placeholder='min 8 characters'
            label="Password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit'
            className='btn-primary'>Login</button>

          <p className='text-[13px] text-slate-800 mt-3 '>
            Dont't have an account?{" "}
            <Link to="/signup" className='text-blue-600 underline font-medium'>signUp</Link>
          </p>
        </form>
      </div>

    </AuthLayout>
  )
}

export default Login