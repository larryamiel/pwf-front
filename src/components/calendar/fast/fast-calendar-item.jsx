import React, { useEffect, useState } from 'react';
import useCalendar from '../../../hooks/use-calendar';

const FastCalendarItem = ({ day, month, year, dayOfTheWeek, isToday, isActive, pending, setPending, onClick }) => {
  const [availability, setAvailability] = useState(null);
  const { getFastingAvailability } = useCalendar();

  const getAvailability = async () => {
    const availability = await getFastingAvailability(day, month, year);
    setAvailability(availability);
  }
  
  useEffect(() => {
    if (!day || !month || !year) return;

    getAvailability();
  }, [day, month, year])

  useEffect(() => {
    if (pending) {
      getAvailability();
      setPending(null);
    }
  }, [pending]);

  if (!day || !availability) return (
    <div className='flex flex-col justify-center items-center gap-2 w-full h-full mb-4'>
      <div 
        className={`
          w-full h-auto rounded-lg bg-gray-300 flex flex-col items-center justify-center aspect-square
          cursor-pointer
          ${isToday ? 'bg-secondary' : 'bg-gray-300'}
        `}
      >
        <span className='text-white font-bold uppercase text-[12px] tracking-widest opacity-80'>
          {dayOfTheWeek}
        </span>
        <span className='text-white'>
          {day}
        </span>
      </div>
      <div className='flex flex-row gap-2'>
      <div className='w-3 h-3 bg-white rounded-[50%]'></div>
      </div>
    </div>
  );

  return (
    <div className='flex flex-col justify-center items-center gap-2 w-full h-full mb-4 relative'>
      <div
        className={`
          w-full h-auto rounded-lg flex flex-col items-center justify-center aspect-square
          cursor-pointer hover:bg-white hover:border-2 border-primary group
          ${isActive ? 'bg-white' : 'bg-primary'}
          ${isActive ? 'border-2 border-primary' : 'border-2 border-transparent'}
        `}
        onClick={() => onClick && onClick(day, availability)}
      >
        <span
          className={`
            group-hover:text-secondary font-bold uppercase text-[12px] tracking-widest opacity-80
            ${isToday ? 'text-red-400' : isActive ? 'text-primary' : 'text-white'}
          `}
        >
          {dayOfTheWeek}
        </span>
        <span
          className={`
            group-hover:text-secondary
            ${isToday ? 'text-red-400' : isActive ? 'text-primary' : 'text-white'}
          `}
        >
          {day}
        </span>
      </div>
      <div className='flex flex-row gap-2'>
        <div className={`w-3 h-3 ${availability.breakfast ? 'bg-green-300' : 'bg-red-300'} rounded-[50%]`}></div>
        <div className={`w-3 h-3 ${availability.lunch ? 'bg-green-300' : 'bg-red-300'} rounded-[50%]`}></div>
        <div className={`w-3 h-3 ${availability.dinner ? 'bg-green-300' : 'bg-red-300'} rounded-[50%]`}></div>
      </div>
    </div>
  );
}

export default FastCalendarItem;