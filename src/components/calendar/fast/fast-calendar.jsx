import React, { useEffect, useState } from 'react';
import FastCalendarItem from './fast-calendar-item';
import useCalendar from '../../../hooks/use-calendar';
import { CiCircleRemove } from 'react-icons/ci';
import { useAuth } from '../../../context/auth-context';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];

const YEARS = [
  2024, 2025, 2026, 2027, 2028, 2029, 2030
];

const MEALS = [
  'breakfast', 'lunch', 'dinner'
];

const FastCalendar = (props) => {
  const date = new Date();

  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(date.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(date.getFullYear());

  const [selected, setSelected] = useState(null);
  const [mealSelected, setMealSelected] = useState(null);
  const [pending, setPending] = useState(null);

  const { getDaysInMonth, addFasting } = useCalendar();

  const handleAddFasting = async (day, month, year, meal) => {
    await addFasting(day, month, year, meal, user.uid);
  }

  const days = getDaysInMonth(currentMonth, currentYear);
  const rows = Math.ceil(days / 7);

  let day = 0;
  const selectorLength = 80;
  const initialOffset = 238;
  const yearIndex = YEARS.indexOf(currentYear);
  const offset = ((yearIndex * 12) + (currentMonth - 1)) * selectorLength;

  return (
    <div className='flex flex-col gap-2 w-[540px] mx-auto '>
      <div className='mb-4 overflow-hidden'>
        <div
          className={`flex flex-row gap-4 relative`}
          style={{ left: `${initialOffset - offset}px`, transition: `left 0.5s ease` }}
        >
          {
            YEARS.map((year, x) => {
              return MONTHS.map((month, y) => {
                const isActive = currentMonth === y + 1 && currentYear === year;

                return (
                  <div
                    key={`${x}:${y}`}
                    className='flex flex-row gap-2'
                    onClick={(e) => {
                      setCurrentMonth(y + 1);
                      setCurrentYear(year);

                      // get the left offset
                      const rect = e.target.getBoundingClientRect();
                      console.log(rect.left);
                    }}
                  >
                    <div className={`
                      w-[64px] h-[64px] bg-white rounded-lg flex flex-col justify-center items-center cursor-pointer
                      ${isActive ? 'border-2 border-primary' : ''}
                    `}
                    >
                      <span className='text-primary font-bold text-[12px] uppercase opacity-50'>
                        {month.substring(0, 3)}
                      </span>
                      <span className='text-primary font-bold text-[12px]'>
                        {year}
                      </span>
                    </div>
                  </div>
                );
              })
            })
          }
        </div>
      </div>
      {
        Array(rows).fill(0).map((_, index) => {
          return (
            <div key={index} className='flex flex-row gap-2'>
              {
                Array(7).fill(0).map((_, index) => {
                  const dayOfTheWeek = new Date(currentYear, currentMonth - 1, index + 1).toLocaleDateString('en-US', { weekday: 'short' });

                  day += 1;

                  if (day > days) {
                    return (
                      <FastCalendarItem
                        key={day}
                      />
                    );
                  }

                  return (
                    <FastCalendarItem
                      key={day}
                      day={day}
                      month={currentMonth}
                      year={currentYear}
                      pending={pending && pending.day === day && pending.month === currentMonth && pending.year === currentYear}
                      setPending={setPending}
                      // this day of the same month and year
                      isToday = {day === new Date().getDate() && currentMonth === new Date().getMonth() + 1 && currentYear === new Date().getFullYear()}
                      dayOfTheWeek={dayOfTheWeek}
                      isActive={selected && selected.day === day && selected.month === currentMonth && selected.year === currentYear}
                      onClick={(day, availability) => setSelected({ day: day, month: currentMonth, year: currentYear, availability: availability })}
                    />
                  );
                })
              }
            </div>
          );
        })
      }
      {
        selected && !mealSelected && (
          <div className='flex flex-col justify-center items-center mt-4 bg-gray-300 p-4 rounded-lg gap-4'>
            <div>
              <span className='text-primary text-sm font-medium text-[18px]'>
                Select A Meal to Fast for on <span className='text-secondary font-bold'>{selected ? `${MONTHS[selected.month - 1].substring(0, 3)} ${selected.day < 10 ? `0${selected.day}` : selected.day}, ${selected.year}` : ''}</span>
              </span>
            </div>
            <div className='flex flex-row justify-center items-center gap-2'>
              <span
                className='p-2 bg-secondary cursor-pointer rounded-lg flex flex-col justify-center items-center text-white'
                onClick={() => setSelected(null)}
              >
                cancel
              </span>
              {
                MEALS.map((meal, index) => {
                  let isAvailable = false;
                  if (selected.availability && selected.availability[meal]) {
                    isAvailable = selected.availability[meal];
                    console.log('isAvailable: ', isAvailable, meal);
                  }
                  return (
                    <div
                      key={index}
                      className={`
                        py-2 px-4 rounded-lg flex flex-col justify-center items-center text-white
                        ${isAvailable ? 'cursor-pointer bg-primary' : 'bg-gray-400 cursor-not-allowed'}
                      `}
                      onClick={() => {
                        if (!isAvailable) {
                          return;
                        }
                        console.log('Fasting for: ', meal);
                        setMealSelected(meal);
                      }}
                    >
                      {meal}
                    </div>
                  );
                })
              }
            </div>
          </div>
        )
      }
      {
        selected && mealSelected && (
          <div className='flex flex-col justify-center items-center mt-4 bg-gray-300 p-4 rounded-lg gap-4'>
            <div>
              <span className='block text-primary text-center text-sm font-medium text-[18px]'>
                Are you sure you want to spend <span className='text-secondary font-bold'>{mealSelected}</span> fasting on <span className='text-secondary font-bold'>{selected ? `${MONTHS[selected.month - 1].substring(0, 3)} ${selected.day < 10 ? `0${selected.day}` : selected.day}, ${selected.year}` : ''}</span>?
              </span>
            </div>
            <div className='flex flex-row justify-center items-center gap-2'>
              <span
                className='p-2 px-4 bg-primary cursor-pointer rounded-lg flex flex-col justify-center items-center text-white'
                onClick={() => {
                  setSelected(null);
                  setMealSelected(null);

                  handleAddFasting(selected.day, selected.month, selected.year, mealSelected);
                  setPending({ day: selected.day, month: selected.month, year: selected.year, meal: mealSelected });
                }}
              >
                yes
              </span>
              <span
                className='p-2 px-4 bg-secondary cursor-pointer rounded-lg flex flex-col justify-center items-center text-white'
                onClick={() => {
                  setSelected(null)
                  setMealSelected(null);
                }}
              >
                no
              </span>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default FastCalendar;