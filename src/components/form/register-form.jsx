import React from 'react';
import { CiLock, CiMail } from 'react-icons/ci';
import { Link } from 'react-router-dom';

import BaseInput from '../../components/input/base-input';
import BaseButton from '../../components/button/base-button';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/auth-context';

const RegisterForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    handleSubmit,
    register: registerField,
    formState: { errors }
  } = useForm();

  const { register } = useAuth();

  const handleRegisterForm = async (values) => {
    try {
      console.log('registering', values);
      setIsLoading(true);
      await register(values);
      console.log('registered?');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className='flex flex-col relative w-[400px] items-center justify-center gap-4'
      onSubmit={handleSubmit(handleRegisterForm)}
    >
      <BaseInput
        className='w-full'
        placeholder='Email'
        label='Email'
        name='email'
        type='email'
        Icon={({ className }) => <CiMail className={className} />}
        options={{
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email address'
          }
        }}
        register={registerField}
        errors={errors.email}
      />
      <BaseInput
        className='w-full'
        placeholder='Password'
        label='Password'
        name='password'
        type='password'
        Icon={({ className }) => <CiLock className={className} />}
        options={{
          required: 'Password is required'
        }}
        register={registerField}
        errors={errors.password}
      />
      <div className='flex flex-row gap-2 w-full items-center'>
        <BaseButton
          className='w-auto bg-primary'
          label='Create an account'
          type='submit'
          disabled={isLoading}
        />

        <span>or</span>

        <Link to='/login'>
          <span className='text-red'>Sign in</span>
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;