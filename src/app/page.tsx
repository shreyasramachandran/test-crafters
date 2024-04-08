"use client"

import React, { useState, useEffect } from 'react';

// Target date for countdown (Year, Month (0-indexed), Day, Hour, Minute)
const targetDate = new Date(2024, 3, 14, 12, 0).getTime();

export default function Home() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
        // Handle expiration, e.g., redirect or change state
      } else {
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24 bg-gradient-to-r from-indigo-200 via-purple-300 to-indigo-300">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h2 className="text-6xl font-bold mb-8">We Are Coming Soon</h2>
        <div className="flex justify-center space-x-4">
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold">{countdown.days}</span>
            <span>Days</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold">{countdown.hours}</span>
            <span>Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold">{countdown.minutes}</span>
            <span>Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold">{countdown.seconds}</span>
            <span>Seconds</span>
          </div>
        </div>
      </div>
    </main>
  );
}