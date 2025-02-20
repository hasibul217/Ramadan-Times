import React, { useState } from 'react';
import NavItem from './NavItem'; // Assuming NavItem is another component
 // Replace with your actual logo file
import Logo from './Logo';

const Navbar = () => {
  // State for controlling hamburger menu
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu on click
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-100  shadow-md">
      <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
         <Logo/>
        </div>

        {/* Desktop NavItems */}
        <div className="hidden md:flex space-x-6">
          <NavItem />
        </div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white text-2xl"
          >
            {/* Use Flaticon SVG icons for hamburger and close */}
            <img
              src={isOpen ? "https://cdn-icons-png.flaticon.com/128/1828/1828778.png" : "https://cdn-icons-png.flaticon.com/128/1828/1828859.png"}
              alt={isOpen ? "Close Menu" : "Open Menu"}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white text-white`}
      >
        <NavItem />
      </div>
    </nav>
  );
};

export default Navbar;
