import { useAuth } from '@/context/auth-context'
import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthGuard = ({ redirect = true }) => {
  const { isAuth } = useAuth();

  // if not auth then redirect to sign in
  if (!isAuth) {
    if (redirect) {
      return <Navigate to="/auth/sign-in" />;
    }
    return <></>;
  }

  return <>{children}</>;
}

export default AuthGuard;
