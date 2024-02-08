import React from 'react';
import { CiAt, CiPhone, CiUser } from 'react-icons/ci';
import { Link } from 'react-router-dom';

import BaseInput from '../../components/input/base-input';
import BaseButton from '../../components/button/base-button';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/auth-context';

const UserCreateForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    handleSubmit,
    register: registerField,
    formState: { errors }
  } = useForm();

  const { create } = useAuth();

  const handleRegisterForm = async (values) => {
    try {
      console.log('registering', values);
      setIsLoading(true);
      await create(values);
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
        placeholder='Name'
        label='Name'
        name='name'
        type='text'
        Icon={({ className }) => <CiUser className={className} />}
        options={{
          required: 'Name is required'
        }}
        register={registerField}
        errors={errors.name}
      />
      <BaseInput
        className='w-full'
        placeholder='Username'
        label='Username'
        name='username'
        type='text'
        Icon={({ className }) => <CiAt className={className} />}
        options={{
          required: 'Username is required'
        }}
        register={registerField}
        errors={errors.username}
      />
      <BaseInput
        className='w-full'
        placeholder='Phone'
        label='Phone'
        name='phone'
        type='tel'
        Icon={({ className }) => <CiPhone className={className} />}
        options={{
          required: 'Phone is required',
          // 11 digits or starts with +63 and 10 digits
          pattern: {
            value: /^(09|\+639)\d{9}$/,
            message: 'Invalid phone number'
          }
        }}
        register={registerField}
        errors={errors.phone}
      />
      <div className='flex flex-row gap-2 w-full items-center'>
        <BaseButton
          className='w-auto bg-primary'
          label='Create user'
          type='submit'
          disabled={isLoading}
        />
      </div>
    </form>
  );
}

export default UserCreateForm;