import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

const convertTo12HourFormat = (time) => {
  if (!time) return "N/A";
  const [hours, minutes] = time.split(":");
  let hour = parseInt(hours, 10);
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minutes} ${period}`;
};

const fetchPrayerTimings = async (division, setTimings) => {
  try {
    const response = await axios.get("https://api.aladhan.com/v1/timingsByCity", {
      params: { city: division, country: "Bangladesh", method: 2 },
    });
    setTimings(response.data.data.timings);
  } catch (error) {
    console.error("Error fetching prayer timings:", error);
  }
};

const PrayerTiming = ({ division }) => {
  const [timings, setTimings] = useState(null);

  useEffect(() => {
    if (division) fetchPrayerTimings(division, setTimings);
  }, [division]);

  const prayerTimes = useMemo(() => {
    return timings
      ? [
          { name: "Fajr", start: timings.Fajr, end: timings.Sunrise },
          { name: "Dhuhr", start: timings.Dhuhr, end: timings.Asr },
          { name: "Asr", start: timings.Asr, end: timings.Maghrib },
          { name: "Maghrib", start: timings.Maghrib, end: timings.Isha },
          { name: "Isha", start: timings.Isha, end: null },
        ]
      : [];
  }, [timings]);
  return (
    <div className="mt-8 px-5 md:px-12 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Prayer Times</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
        {prayerTimes.map((prayer, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300  hover:shadow-lg"
          >
            <div className="bg-green-500 p-4 text-white"> {/* Header Section */}
              <h2 className="text-2xl font-semibold">{prayer.name}</h2>
            </div>
            <div className="p-4 bg-gray-100"> {/* Time Section */}
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-lg">Start:</span>
                <span className="text-xl font-bold">
                  {convertTo12HourFormat(prayer.start)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">End:</span>
                <span className="text-xl font-bold">
                  {prayer.end ? convertTo12HourFormat(prayer.end) : "TBD"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default PrayerTiming;
