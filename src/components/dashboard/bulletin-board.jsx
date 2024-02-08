import React from 'react';
import { CiBullhorn, CiImport, CiMapPin } from 'react-icons/ci';

const BulletinBoard = () => {
  return (
    <div className='flex flex-col p-4 gap-2 rounded-lg bg-gray-200'>
      <div className='flex flex-row gap-2 items-center'>
        <span className='text-xl text-primary font-bold'>BulletinBoard</span>
        <CiBullhorn className='w-6 h-6 text-secondary' />
      </div>
      <div>
        <span className='text-primary'>Coming soon...</span>
      </div>
    </div>
  );
}

export default BulletinBoard;