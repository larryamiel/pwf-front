import React from 'react';
import { Outlet } from 'react-router-dom';

// Components
import HeaderNavigation from '../navigation/header';
import GuestGuard from '../helpers/guards/guest-guard';

const GuestLayout = ({ className }) => {
  return (
    <GuestGuard redirect={true}>
      <div className={className ? `flex flex-col w-screen h-screen gap-4 ${className}` : 'flex flex-col w-screen h-screen gap-4'}>
        <HeaderNavigation />
        <div className="flex flex-col flex-1">
          <Outlet />
        </div>
      </div>
    </GuestGuard>
  );
}

export default GuestLayout;