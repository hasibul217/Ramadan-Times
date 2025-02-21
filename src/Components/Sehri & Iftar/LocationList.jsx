import React, { useState } from "react";
import RamadanTimings from "./RamadanTimings";

const LocationList = () => {
  const divisions = [
    "Dhaka",
    "Mymensingh",
    "Sylhet",
    "Chittagong",
    "Khulna",
    "Rajshahi",
    "Barisal",

    "Rangpur",
  ];

  const [selectedDivision, setSelectedDivision] = useState("Dhaka");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDivisionSelect = (division) => {
    setSelectedDivision(division);
    setIsDropdownOpen(false);
  };

  return (
    <div className="container mx-auto py-6">
      {/* Dropdown for Mobile */}
      <div className="sm:hidden flex flex-col">
        <label
          htmlFor="tabs"
          className="text-gray-700 font-medium mb-2 text-center text-xl"
        >
          Select your division
        </label>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-green-600 text-white rounded-md outline-none focus:ring-2 focus:ring-green-400 w-4/5 mx-auto p-3 text-xl flex justify-between items-center"
          >
            {selectedDivision}
            <span className="ml-2">{isDropdownOpen ? "▲" : "▼"}</span>
          </button>

          {isDropdownOpen && (
            <ul className="absolute z-10 w-4/5 bg-white rounded-md shadow-lg mt-1 p-2 items-center left-11">
              {divisions.map((division, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleDivisionSelect(division)}
                    className="w-full text-left p-3 hover:bg-green-100 text-black  rounded mb-1 shadow-md"
                  >
                    {division}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Tabs for PC */}
      <ul className="hidden sm:flex justify-center space-x-4 text-sm font-medium text-white rounded-lg shadow-lg bg-gradient-to-r from-green-400 to-green-600 py-2 px-4">
        {divisions.map((division, index) => (
          <li key={index}>
            <button
              onClick={() => setSelectedDivision(division)}
              className={`px-6 py-2 rounded-lg transition-transform duration-300 ease-in-out focus:outline-none ${
                selectedDivision === division
                  ? "bg-green-700 scale-105"
                  : "hover:bg-green-700 hover:scale-105"
              }`}
            >
              {division}
            </button>
          </li>
        ))}
      </ul>

      {/* Display selected division above the timings */}
      {selectedDivision && (
        <div className="mt-6 text-center">
          <p className="text-xl text-green-900 font-semibold">
            Iftar and Sehri time of:{" "}
            <span className="font-bold">{selectedDivision}</span>
          </p>
        </div>
      )}

      {/* Display Ramadan timings */}
      {selectedDivision && <RamadanTimings division={selectedDivision} />}
    </div>
  );
};

export default LocationList;
