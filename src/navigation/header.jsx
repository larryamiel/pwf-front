import React from 'react';
import logo from '../assets/images/pwf-icon-base.png';

const HeaderNavigation = () => {
  return (
    <div className='flex justify-center items-center mt-20'>
      <img src={logo} alt='logo' className='w-36 h-36 border-4 border-black rounded-[100px]' />
    </div>
  );
}

export default HeaderNavigation;