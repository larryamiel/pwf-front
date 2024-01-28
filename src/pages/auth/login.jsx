import React from 'react';
import read from '../../assets/images/read.png';
import BaseInput from '../../components/input/base-input';
import { CiLock, CiMail } from 'react-icons/ci';
import BaseButton from '../../components/button/base-button';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col border-1 border-black w-[400px] max-w-full relative z-[99] rounded-[500] overflow-hidden justify-center items-center'>
        <img src={read} alt='read' className='h-auto w-full mx-auto' />
      </div>
      <div className='flex flex-col relative w-[400px] bg-white items-center justify-center gap-4'>
        <BaseInput
          className='w-full'
          placeholder='Email'
          label='Email'
          type='email'
          Icon={({ className }) => <CiMail className={className} />}
        />
        <BaseInput
          className='w-full'
          placeholder='Password'
          label='Password'
          type='password'
          Icon={({ className }) => <CiLock className={className} />}
        />
        <div className='flex flex-row gap-2 w-full items-center'>
          <BaseButton
            className='w-auto'
            label='Login'
            onClick={() => alert('Login')}
          />

          <span>or</span>

          <Link to='/register'>
            <span className='text-red'>Create an account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;