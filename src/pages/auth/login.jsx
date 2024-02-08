import React from 'react';
import read from '../../assets/images/read.png';
import BaseInput from '../../components/input/base-input';
import { CiLock, CiMail } from 'react-icons/ci';
import BaseButton from '../../components/button/base-button';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/form/login-form';

const LoginPage = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col border-1 border-black w-[400px] max-w-full relative z-[99] rounded-[500] overflow-hidden justify-center items-center'>
        <img src={read} alt='read' className='h-auto w-full mx-auto' />
      </div>
      <div className='mt-10'>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;