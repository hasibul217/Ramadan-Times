import { useState, useEffect } from "react";

const UserLocation = () => {
  const [location, setLocation] = useState({ division: "Fetching...", error: "" });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
            );
            const data = await response.json();
            const division = data.results[0]?.components?.state || "Unknown";
            setLocation({ division, error: "" });
          } catch (error) {
            setLocation({ division: "Unknown", error: "Failed to fetch location" });
          }
        },
        (error) => {
          setLocation({ division: "Unknown", error: error.message });
        }
      );
    } else {
      setLocation({ division: "Unknown", error: "Geolocation not supported" });
    }
  }, []);

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold">Your Location</h2>
      <p>Division: {location.division}</p>
      {location.error && <p className="text-red-500">Error: {location.error}</p>}
    </div>
  );
};

export default UserLocation;
