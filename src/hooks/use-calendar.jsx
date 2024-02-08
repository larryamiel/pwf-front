import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase';

const useCalendar = () => {
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  }

  const getFastingAvailability = async (day, month, year) => {
    try {
      console.log('getting fasting availability', day, month, year);
      const q = query(collection(db, "fasting-schedule"), where("day", "==", day), where("month", "==", month), where("year", "==", year));

      const availability = {
        breakfast: true,
        lunch: true,
        dinner: true
      };

      const snap = await getDocs(q);
      snap.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };

        if (data.meal === 'breakfast') availability.breakfast = false;
        if (data.meal === 'lunch') availability.lunch = false;
        if (data.meal === 'dinner') availability.dinner = false;
      });

      return availability;
    } catch (err) {
      console.log('Error getting fasting availability: ', err);
    }
  }

  const addFasting = async (day, month, year, meal, user) => {
    try {
      // add to firebase db
      const fastingRef = collection(db, 'fasting-schedule');

      await addDoc(fastingRef, {
        day,
        month,
        year,
        meal,
        user
      });
    } catch (err) {
      console.log('Error adding fasting: ', err);
    }
  }
  
  return {
    getDaysInMonth,
    getFastingAvailability,
    addFasting
  }
}

export default useCalendar;