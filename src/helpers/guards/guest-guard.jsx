import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/auth-context';

const GuestGuard = ({ redirect = true, children }) => {
  const { isAuth } = useAuth();

  // if auth then redirect to dashboard
  if (isAuth) {
    if (redirect) {
      return <Navigate to="/dashboard" />;
    }
    return <></>;
  }

  return <>{children}</>;
}

export default GuestGuard;
