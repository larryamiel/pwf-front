import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ to, Icon, label }) => {
  return (
    <Link to={to} className='flex flex-row gap-2'>
      <Icon />
      <span>{label}</span>
    </Link>
  );
}

export default SidebarItem;