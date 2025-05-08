import React, { useContext } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import PrivateRoute from './routes/PrivateRoute'

import Dashboard from './pages/Admin/DashBoard'
import ManageUser from './pages/Admin/ManageUser'
import ManageTask from './pages/Admin/ManageTask'
import CreateTask from './pages/Admin/CreateTask'

import UserDashBoard from './pages/User/UserDashBoard'
import MyTask from './pages/User/MyTasks'
import ViewTaskDetails from './pages/User/ViewTaskDetails'
import UserProvider, { UserContext } from './context/userContext'
import { Toaster } from 'react-hot-toast'





const App = () => {
  return (
    <UserProvider>
      <div>

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/tasks' element={<ManageTask />} />
            <Route path='/admin/create-task' element={<CreateTask />} />
            <Route path='/admin/users' element={<ManageUser />} />
          </Route>

          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={['user']} />}>
            <Route path='/user/dashboard' element={<UserDashBoard />} />
            <Route path='/user/tasks' element={<MyTask />} />
            <Route path='/user/task-details/:id' element={<ViewTaskDetails />} />
          </Route>

          {/* Default route */}
          <Route path='/' element={< Root />} />

        </Routes>


      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </UserProvider>
  )
};

export default App

const Root = () => {
  const { user, loading } = useContext(UserContext)

  if (loading) {
    return <Outlet />
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return user.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />
}