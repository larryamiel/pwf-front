import React from 'react';
import SidebarNavigation from '../navigation/sidebar';

const DashboardLayout = () => {
  return (
    <div className={className ? `flex flex-row w-screen h-screen ${className}` : 'flex flex-row w-screen h-screen'}>
      <SidebarNavigation />
      <div className="flex flex-col flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;