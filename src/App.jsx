import React, { useState } from "react";
import RamadanTimings from "./Components/Sehri & Iftar/RamadanTimings";
import LocationList from "./Components/Sehri & Iftar/LocationList";

import Navbar from "./Components/Navbar";

import PrayerTiming from "./Components/Prayer Time/PrayingTiming";
import UserLocation from "./Components/UserLocation";




const App = () => {
  const [selectedDivision, setSelectedDivision] = useState("Dhaka");

  return (
    <div>
      <Navbar />
      <UserLocation/>

      
      <LocationList onDivisionSelect={setSelectedDivision} />
        {/* Display selected division above the timings */}
        {selectedDivision && (
        <div className="text-center">
          <p className="text-xl text-green-900 font-semibold">
            Iftar and Sehri time of:{" "}
            <span className="font-bold">{selectedDivision}</span>
          </p>
        </div>
      )}
      <RamadanTimings division={selectedDivision} />
      <PrayerTiming division={selectedDivision} />
    </div>
  );
};

export default App;
