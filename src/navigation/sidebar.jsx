import React from 'react';
import SidebarItem from './sidebar-item';

// Icons
import { CiAlignLeft, CiChat1, CiCalendarDate } from "react-icons/ci";

const SidebarNavigation = () => {
  return (
    <div className='flex flex-col'>
      <SidebarItem
        to='/dashboard'
        Icon={() => <CiAlignLeft />}
        label='Dashboard'
      />
      <SidebarItem
        to='/chat'
        Icon={() => <CiChat1 />}
        label='Chat'
      />
      <SidebarItem
        to='/schedule'
        Icon={() => <CiCalendarDate />}
        label='Schedule'
      />
    </div>
  );
}

export default SidebarNavigation;