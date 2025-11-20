"use client";
import React, { useState } from "react";
import { User,AlignRight } from "lucide-react"; // Import User icon from lucide-react

interface NavItem {
  name: string;
  link: string;
}

interface NavbarProps {
  name?: string;
  navItems?: NavItem[];
  textColor?: string;
  backgroundColor?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  name = "Website Name",
  navItems = [
    { name: "Home", link: "/home" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Contact", link: "/contact" },
  ],
  textColor = "black",
  backgroundColor = "white",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav style={{ backgroundColor }} className="fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left Section: Website Name */}
        <div className="flex items-center">
          <h1
            className="text-xl font-bold hover:scale-110 transition-transform duration-300"
            style={{ color: textColor }}
          >
            {name}
          </h1>
        </div>

        {/* Middle Section: Nav Items */}
        <div className="hidden lg:flex items-center space-x-12">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              style={{ color: textColor }}
              className={`text-base font-medium hover:scale-110 transition-all duration-300`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right Section: User Profile */}
        <div className="flex items-center">
          <div
            className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <User className="w-5 h-5" style={{ color: textColor }} /> {/* User icon */}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            <AlignRight style={{ color: textColor }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="lg:hidden shadow-lg w-full absolute top-20 left-0 py-4"
          style={{ backgroundColor }}
        >
          <div className="px-4 flex flex-col space-y-3">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                style={{ color: textColor }}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-opacity-20 transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;