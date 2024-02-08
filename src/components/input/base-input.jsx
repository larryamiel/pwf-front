import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const BaseInput = ({ className, type, name, label, placeholder, Icon, register, options, errors }) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <div className="relative">
        {
          Icon && (
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <Icon className='w-4 h-4 text-gray-500 dark:text-gray-400' />
            </div>
          )
        }
        {
          (register && options) ? (
            <input
              type={type}
              id={name}
              name={name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={placeholder}
              aria-invalid={errors ? 'true' : 'false'}
              {...register(name, options)}
            />
          ) : (
            <input
              type={type}
              id={name}
              name={name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={placeholder}
              aria-invalid={errors ? 'true' : 'false'}
            />
          )
        }
        
      </div>
      {
        errors && errors.message && (
          <div className="text-white text-sm mt-2 bg-red py-2 px-4 rounded-md">
            <FiAlertCircle className='w-4 h-4 inline-block mr-1' />
            <span>{errors.message}</span>
          </div>
        )
      }
    </div>
  );
}

export default BaseInput;