import React from 'react';
import { Outlet } from 'react-router-dom';

// Components
import HeaderNavigation from '../navigation/header';

const GuestLayout = ({ className }) => {
  return (
    <div className={className ? `flex flex-col w-screen h-screen gap-4 ${className}` : 'flex flex-col w-screen h-screen gap-4'}>
      <HeaderNavigation />
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default GuestLayout;