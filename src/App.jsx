import React from "react";
import Logo from "./Components/Logo";
import Navbar from "./Components/Navbar";
import LocationList from "./Components/Sehri & Iftar/LocationList";
import RamadanTimings from "./Components/Sehri & Iftar/RamadanTimings";

const App = () => {
  return (

    <>
     <div className="mx-auto">
     
     <Navbar />
     <LocationList/>
     <RamadanTimings/>
       
      </div>
    </>
   
  );
};

export default App;
