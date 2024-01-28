import React from 'react';

const defaultClassName = "inline-flex items-center justify-center border border-transparent shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex flex-row gap-2";

const BaseButton = ({ className, label, Icon, onClick }) => {
  return (
    <button
      type="button"
      className={className ? `${defaultClassName} ${className}` : defaultClassName}
      onClick={onClick ? onClick : () => {}}
    >
      {
        Icon && (
          <Icon className='w-4 h-4 text-white dark:text-gray-400' />
        )
      }
      {
        label && (
          <span>{label}</span>
        )
      }
    </button>
  );
}

export default BaseButton;