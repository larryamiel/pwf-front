import React from 'react';
import { Link } from 'react-router-dom';

const BottomItem = ({ to, Icon, label, active }) => {
  let className = 'flex flex-row text-white hover:text-secondary items-center p-2 rounded-[50%]';
  if (active) {
    className += ' bg-white color-primary hover:text-primary';
  }
  return (
    <Link to={to} title={label} className={className}>
      <Icon className={`h-8 w-8`} />
      {/* <span className='text-lg text-white'>{label}</span> */}
    </Link>
  );
}

export default BottomItem;