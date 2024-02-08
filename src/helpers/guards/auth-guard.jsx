import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/auth-context';

const AuthGuard = ({ redirect = true, children }) => {
  const { isAuth } = useAuth();

  // if not auth then redirect to sign in
  if (!isAuth) {
    if (redirect) {
      return <Navigate to="/login" />;
    }
    return <></>;
  }

  return <>{children}</>;
}

export default AuthGuard;
