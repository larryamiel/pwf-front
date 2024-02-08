import React from 'react';
import BottomNavigation from '../navigation/bottom';
import AuthGuard from '../helpers/guards/auth-guard';
import { Outlet } from 'react-router-dom';
import UserGuard from '../helpers/guards/user-guard';

const DashboardLayout = ({ className }) => {
  return (
    <AuthGuard redirect={true}>
      <div className={className ? `flex flex-row w-screen h-screen ${className}` : 'flex flex-row w-screen h-screen'}>
        <UserGuard>
          <BottomNavigation />
          <div className="flex flex-col flex-1 p-8 mx-auto max-w-[1024px] w-full">
            <Outlet />
          </div>
        </UserGuard>
      </div>
    </AuthGuard>
  );
}

export default DashboardLayout;