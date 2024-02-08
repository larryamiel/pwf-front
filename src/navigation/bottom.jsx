import React from 'react';
import BottomItem from './bottom-item';

// Icons
import { CiChat1, CiCalendarDate, CiHome, CiForkAndKnife } from "react-icons/ci";
import { useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className='absolute bottom-10 flex flex-row justify-center w-full'>
      <div className='flex flex-row gap-4 p-2 rounded-[140px] bg-primary'>
        <BottomItem
          to='/dashboard'
          Icon={(props) => <CiHome {...props} />}
          label='Dashboard'
          active = {pathname === '/dashboard' ? true : false}
        />
        <BottomItem
          to='/dashboard/chat'
          Icon={(props) => <CiChat1 {...props} />}
          label='Chat'
          active={pathname === '/dashboard/chat' ? true : false}
        />
        <BottomItem
          to='/dashboard/schedule'
          Icon={(props) => <CiCalendarDate {...props} />}
          label='Schedule'
          active={pathname === '/dashboard/schedule' ? true : false}
        />
        <BottomItem
          to='/dashboard/fast'
          Icon={(props) => <CiForkAndKnife {...props} />}
          label='Fast'
          active={pathname === '/dashboard/fast' ? true : false}
        />
      </div>
    </div>
  );
}

export default BottomNavigation;