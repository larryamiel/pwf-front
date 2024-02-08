import React from 'react';
import tree from '../../assets/images/tree.png';
import RegisterForm from '../../components/form/register-form';

const RegisterPage = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col border-1 border-black w-[400px] max-w-full relative z-[99] rounded-[500] overflow-hidden justify-center items-center'>
        <img src={tree} alt='tree' className='h-auto w-full mx-auto' />
      </div>
      <div className='mt-10'>
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;