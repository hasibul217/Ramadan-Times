import { useState, useEffect } from "react";

const UserLocation = () => {
  const [location, setLocation] = useState({
    division: "Fetching...",
    error: "",
    isLoading: true,
  });

  const divisions = [
    { name: "Dhaka", latRange: [23.4, 24.4], lonRange: [90.2, 92.0] },
    { name: "Chittagong", latRange: [20.0, 23.3], lonRange: [91.0, 92.5] },
    { name: "Khulna", latRange: [22.0, 23.0], lonRange: [89.0, 90.5] },
    { name: "Rajshahi", latRange: [24.0, 25.0], lonRange: [88.0, 89.5] },
    { name: "Barisal", latRange: [22.0, 23.0], lonRange: [90.0, 91.5] },
    { name: "Sylhet", latRange: [24.0, 25.0], lonRange: [91.5, 92.5] },
    { name: "Rangpur", latRange: [25.0, 26.0], lonRange: [88.5, 89.5] },
    { name: "Mymensingh", latRange: [24.5, 25.5], lonRange: [90.5, 91.5] },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const foundDivision = divisions.find((division) => {
            return (
              latitude >= division.latRange[0] &&
              latitude <= division.latRange[1] &&
              longitude >= division.lonRange[0] &&
              longitude <= division.lonRange[1]
            );
          });

          if (foundDivision) {
            setLocation({
              division: foundDivision.name,
              error: "",
              isLoading: false,
            });
          } else {
            setLocation({
              division: "Unknown",
              error: "Division not found",
              isLoading: false,
            });
          }
        },
        (error) => {
          setLocation({
            division: "Unknown",
            error: error.message,
            isLoading: false,
          });
        }
      );
    } else {
      setLocation({
        division: "Unknown",
        error: "Geolocation not supported",
        isLoading: false,
      });
    }
  }, []);

  return (
    <div className="p-4 border rounded shadow-md text-center">
      <h2 className="text-lg font-bold">Your Location: {location.division}</h2>
      {location.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
         
          {location.error && <p className="text-red-500">Error: {location.error}</p>}
        </>
      )}
    </div>
  );
};

export default UserLocation;
