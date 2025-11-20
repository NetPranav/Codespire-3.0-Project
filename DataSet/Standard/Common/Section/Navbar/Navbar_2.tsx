import React from "react";

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
    { name: "Contact", link: "/contact" }
  ],
  textColor = "black",
  backgroundColor = "white"
}) => {
  return (
    <nav
      style={{ backgroundColor }}
      className="fixed top-0 left-0 w-full z-50 shadow-lg p-4"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold" style={{ color: textColor }}>
          {name}
        </h1>
        <ul className="flex space-x-6">
          {navItems.map((item, index) => (
            <li key={index} className="cursor-pointer">
              <a href={item.link} style={{ color: textColor }}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
