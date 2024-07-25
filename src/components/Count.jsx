import React, { useState, useEffect } from 'react';

export default function Count() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const getTimeValues = () => {
    const year = currentTime.getFullYear();
    const monthIndex = currentTime.getMonth(); // Get month index (0-11)
    const day = currentTime.getDate();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    // Get month and day names
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[monthIndex];

    // Get the name of the day
    const dayName = currentTime.toLocaleDateString('id-ID', { weekday: 'long' });

    return { year, monthName, day, hours, minutes, seconds, dayName };
  };

  const { year, monthName, day, hours, minutes, seconds, dayName } = getTimeValues();

  return (
    <div className="content">
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-end py-4 px-4 content">
  <span className="countdown font-mono text-2xl">
  <span style={{"--value": hours}}></span>:
  <span style={{"--value": minutes}}></span>:
  <span style={{"--value": seconds}}></span>
</span>
</div>
</div>
  );
}
