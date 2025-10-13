import React, { useState } from "react";
import {
  BiHome,
  BiUser,
  BiFile,
  BiImage,
  BiBriefcase,
  BiEnvelope,
  BiMenu,
  BiX,
  BiChevronDown,
} from "react-icons/bi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import profileImg from "../assets/my-profile-img.jpg"; // relative to Navbar.tsx

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const menuItems = [
    { name: "Home", icon: <BiHome /> },
    { name: "About", icon: <BiUser /> },
    { name: "Resume", icon: <BiFile /> },
    { name: "Portfolio", icon: <BiImage /> },
    { name: "Services", icon: <BiBriefcase /> },
    { name: "Dropdown", icon: <BiChevronDown /> },
    { name: "Contact", icon: <BiEnvelope /> },
  ];
  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="fixed top-4 right-4 z-50 bg-[#149ddd] p-2 rounded-full xl:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <BiX color="white" size={22} />
        ) : (
          <BiMenu color="white" size={22} />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-[#040b14] text-white flex flex-col items-center py-6 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0`}
      >
        {/* Profile */}
        <div className="mb-4">
          <img
            src={profileImg}
            alt="Profile"
            className="w-28 h-28 rounded-full border-8 border-white/15"
          />
        </div>

        <h1 className="text-xl mb-4 font-semibold font-Poppins">
          Sakar Pathak
        </h1>

        {/* Social icons */}
        <div className="flex gap-4 mb-6">
          <a
            href="mailto:your-email@example.com"
            className="hover:text-blue-400"
          >
            <BiEnvelope size={20} />
          </a>
          <a
            href="https://github.com/your-username"
            target="_blank"
            className="hover:text-gray-400"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/your-linkedin"
            target="_blank"
            className="hover:text-blue-600"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col w-full px-6">
          <ul className="flex flex-col">
            {menuItems.map((item) => (
              <li
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`group flex items-center gap-2 py-4 cursor-pointer transition-colors duration-200 ${
                  active === item.name
                    ? "text-white"
                    : "text-[#A8A9B4] hover:text-white"
                }`}
              >
                <span
                  className={`text-xl transition-colors duration-200 ${
                    active === item.name
                      ? "text-blue-400"
                      : "group-hover:text-blue-400 text-[#A8A9B4]"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-Poppins text-sm">{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
