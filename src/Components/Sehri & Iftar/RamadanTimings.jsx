import React, { useEffect, useState } from "react";
import axios from "axios";

// Helper function to convert 24-hour time to 12-hour format
const convertTo12HourFormat = (time) => {
  const [hours, minutes] = time.split(":");
  let hour = parseInt(hours);
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert 0 to 12 for midnight
  return `${hour}:${minutes} ${period}`;
};

// Helper function to calculate time left until Iftar
const getTimeLeft = (iftarTime) => {
  const now = new Date();
  const [hours, minutes] = iftarTime.split(":");
  const iftarDate = new Date(now);
  iftarDate.setHours(hours);
  iftarDate.setMinutes(minutes);
  iftarDate.setSeconds(0);

  const timeLeft = iftarDate - now;

  if (timeLeft < 0) {
    return "Iftar time has passed";
  }

  const hoursLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutesLeft = Math.floor((timeLeft / (1000 * 60)) % 60);
  const secondsLeft = Math.floor((timeLeft / 1000) % 60); // Calculate seconds

  return `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`; // Include seconds
};

const RamadanTimings = ({ division }) => {
  const [timings, setTimings] = useState(null);
  const [date, setDate] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [iftarPassed, setIftarPassed] = useState(false);

  // Dua for Iftar and Sehri
  const duaIftar = {
    arabic: "اللهم إني لك صمت وعلى رزقك أفطرت",
    bengali: "হে আল্লাহ! আমি তোমার জন্য রোজা রেখেছি এবং তোমার রিযিক দ্বারা ইফতার করেছি।",
    english: "O Allah, I fasted for You, and I break my fast with Your provision."
  };

  const duaSehri = {
    arabic: "اللهم إني نويت صيام غدٍ عن أداء فرض رمضان",
    bengali: "হে আল্লাহ! আমি আগামীকালের রোজা রাখার নিয়ত করলাম।",
    english: "O Allah, I intend to fast tomorrow in the month of Ramadan."
  };

  useEffect(() => {
    const fetchTimings = async () => {
      try {
        const response = await axios.get("https://api.aladhan.com/v1/timingsByCity", {
          params: {
            city: division,
            country: "Bangladesh",
            method: 2, // Calculation method
          },
        });
        setTimings(response.data.data.timings);
        setDate(response.data.data.date.readable);
      } catch (error) {
        console.error("Error fetching prayer timings:", error);
      }
    };

    if (division) {
      fetchTimings();
    }
  }, [division]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timings) {
        const timeRemaining = getTimeLeft(timings.Maghrib); // Change to Maghrib for Iftar
        setTimeLeft(timeRemaining);
        setIftarPassed(timeRemaining === "Iftar time has passed");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timings]);

  if (!timings) {
    return null; // Remove the loading text completely
  }

  return (
    <div className="mt-8 px-6 md:px-12 text-center">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {/* Date Card */}
        <div className="bg-green-700 text-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-3 text-shadow">Date</h2>
          <p className="text-3xl font-bold">{date}</p>
        </div>

        {/* Sehri Last Time Card */}
        <div className="bg-green-700 text-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-3 text-shadow">Sehri Last Time</h2>
          <p className="text-3xl font-bold">{convertTo12HourFormat(timings.Fajr)}</p>
        </div>

        {/* Iftar Time Card */}
        <div className="bg-green-700 text-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-3 text-shadow">Iftar Time</h2>
          <p className="text-3xl font-bold">{convertTo12HourFormat(timings.Maghrib)}</p>
        </div>

        {/* Timer Card for Iftar */}
        <div className="bg-green-700 text-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-3 text-shadow">Time Left for Iftar</h2>
          <p className="text-3xl font-bold">{timeLeft}</p>
        </div>
      </div>

      {/* Dua Display */}
      <div className="mt-6 text-center">
        {iftarPassed ? (
          <div>
            <h2 className="text-xl font-semibold">Dua for Sehri</h2>
            <p className="text-lg">{duaSehri.arabic}</p>
            <p className="text-lg">{duaSehri.bengali}</p>
            <p className="text-lg">{duaSehri.english}</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold">Dua for Iftar</h2>
            <p className="text-lg">{duaIftar.arabic}</p>
            <p className="text-lg">{duaIftar.bengali}</p>
            <p className="text-lg">{duaIftar.english}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RamadanTimings;
