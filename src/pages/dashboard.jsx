import React from 'react';
import { useAuth } from '../context/auth-context';
import MonthlySchedule from '../components/dashboard/monthly-schedule';
import BulletinBoard from '../components/dashboard/bulletin-board';

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row justify-between'>
        <span className='text-lg'>Hello, <b className='font-medium'>{user.data.name}</b></span>
        <span
          className='p-2 px-4 bg-primary cursor-pointer rounded-lg flex flex-col justify-center items-center text-white'
          onClick={logout}
        >
          Logout
        </span>
      </div>
      <div>
        <MonthlySchedule />
      </div>
      <div>
        <BulletinBoard />
      </div>
    </div>
  );
}

export default DashboardPage;