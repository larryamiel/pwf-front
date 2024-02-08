import React from 'react';
import { CiLock, CiMail } from 'react-icons/ci';
import { Link } from 'react-router-dom';

import BaseInput from '../input/base-input';
import BaseButton from '../button/base-button';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/auth-context';

const LoginForm = () => {
  const {
    register: registerField,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
    } catch (err) {
      console.log('handleLogin error: ', err);
      alert('Error logging in', err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
    onSubmit={handleSubmit(handleLogin)}
      className='flex flex-col relative w-[400px] items-center justify-center gap-4'
    >
      <BaseInput
        className='w-full'
        placeholder='Email'
        label='Email'
        type='email'
        name='email'
        Icon={({ className }) => <CiMail className={className} />}
        register={registerField}
        options={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }}}
        errors={errors.email}
      />
      <BaseInput
        className='w-full'
        placeholder='Password'
        label='Password'
        type='password'
        name='password'
        Icon={({ className }) => <CiLock className={className} />}
        register={registerField}
        options={{ required: 'Password is required' }}
        errors={errors.password}
      />
      <div className='flex flex-row gap-2 w-full items-center'>
        <BaseButton
          className='w-auto bg-primary'
          label='Login'
          disabled={isLoading}
          type='submit'
        />

        <span>or</span>

        <Link to='/register'>
          <span className='text-red'>Create an account?</span>
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;