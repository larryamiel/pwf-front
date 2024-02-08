import React from 'react'
import { useAuth } from '../../context/auth-context';
import UserCreateForm from '../../components/form/user-create-form';
import male from '../../assets/images/male.png';
import female from '../../assets/images/female.png';

const UserGuard = ({ children }) => {
  const { user } = useAuth();

  // if not auth then redirect to sign in
  if (!user || !user.data) {
    return (
      <div className='w-full flex items-center justify-center'>
        <div className='flex flex-row border-1 border-black w-[400px] max-w-full relative z-[99] rounded-[500] justify-center items-center overflow-visible'>
          <img src={male} alt='male' className='h-auto w-2/3 absolute left-[-50px] z-[101]' />
          <img src={female} alt='female' className='h-auto w-2/3 relative z-[100]' />
        </div>
        <div className='mt-10'>
          <UserCreateForm />
        </div>
      </div>
    )
  }

  return <>{children}</>;
}

export default UserGuard;
