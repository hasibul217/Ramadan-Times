import React from 'react';

const NavItem = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center lg:gap-5  p-4 rounded-lg sm:rounded-none sm:p-0">
      <div className="text-white flex items-center gap-1  text-center px-6 py-3 cursor-pointer rounded-lg transition-all transform hover:scale-110 hover:bg-green-600 hover:shadow-lg active:scale-100 mb-2 sm:mb-0 bg-green-500 shadow-md hover:text-white">
        <img 
          src="https://cdn-icons-png.flaticon.com/128/4358/4358636.png" 
          alt="Sehri and Iftar Time" 
          className="w-6 h-6 mr-2 " 
        />
        Sehri and Iftar Time
      </div>
      <div className="text-white text-center flex items-center gap-1  px-6 py-3 cursor-pointer rounded-lg transition-all transform hover:scale-110 hover:bg-green-600 hover:shadow-lg active:scale-100 mb-2 sm:mb-0 bg-green-500 shadow-md hover:text-white">
        <img 
          src="https://cdn-icons-png.flaticon.com/128/4336/4336680.png" 
          alt="Prayer Time" 
          className="w-6 h-6 mr-2 " 
        />
        Prayer Time
      </div>
      <div className="text-white text-center px-6 py-3  flex items-center gap-1 cursor-pointer rounded-lg transition-all transform hover:scale-110 hover:bg-green-600 hover:shadow-lg active:scale-100 mb-2 sm:mb-0 bg-green-500 shadow-md hover:text-white">
        <img 
          src="https://cdn-icons-png.flaticon.com/128/384/384372.png" 
          alt="Dua and Hadeeth" 
          className="w-6 h-6 mr-2 " 
        />
        Dua and Hadeeth
      </div>
    </div>
  );
};

export default NavItem;
