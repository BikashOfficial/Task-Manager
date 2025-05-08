import React, { useContext } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
// import { useUserAuth } from '../../hooks/useUserAuth'
import { UserContext } from '../../context/userContext';

const UserDashBoard = () => {
  useUserAuth();

  const { user } = useContext(UserContext)
  return (
    <div>UserDashBoard</div>
  )
}

export default UserDashBoard