import React, { useState, useEffect, useMemo } from "react";
import {
  BiHome,
  BiUser,
  BiDollar,
  BiBriefcase,
  BiBook,
  BiBot,
  BiX,
  BiMenu,
  BiEnvelope,
} from "react-icons/bi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  // Memoize menu items to prevent unnecessary re-renders
  const menuItems = useMemo(
    () => [
      { name: "Home", icon: <BiHome />, link: "#home" },
      { name: "About", icon: <BiUser />, link: "#about" },
      { name: "My Startup", icon: <BiDollar />, link: "#startup" },
      { name: "Job Experience", icon: <BiBriefcase />, link: "#jobExperience" },
      {
        name: "Teaching Experience",
        icon: <BiBook />,
        link: "#teachingExperience",
      },
      { name: "Projects", icon: <BiBot />, link: "#projects" },
    ],
    []
  );

  // Scroll-spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // adjust offset
      menuItems.forEach((item) => {
        const section = document.querySelector(item.link);
        if (section) {
          const sectionTop =
            section.getBoundingClientRect().top + window.scrollY;
          const sectionHeight = section.clientHeight;
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActive(item.name);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuItems]); // now safe because menuItems is memoized

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="fixed top-4 right-4 z-50 bg-[#149ddd] p-2 rounded-full xl:hidden hover:cursor-pointer"
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
        className={`fixed z-50 inset-y-0 left-0 w-[18.75rem] bg-[#040b14] text-white flex flex-col items-center py-4 transform transition-transform duration-300
${open ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0`}
      >
        {/* Profile */}
        <div className="mb-4">
          <img
            src="/photo/my-profile2.jpg"
            alt="Profile"
            className="w-30 h-30 rounded-full border-8 border-white/15"
          />
        </div>

        <h1 className="font-Raleway text-white text-2xl font-bold mb-4">
          Sakar Pathak
        </h1>

        {/* Social Icons */}
        <div className="flex gap-4 mb-6">
          <a
            href="mailto:sakar.pathak111@gmail.com"
            className="hover:text-blue-400"
          >
            <BiEnvelope size={20} />
          </a>

          <a
            href="https://github.com/sakar111"
            target="_blank"
            className="hover:text-gray-400"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/sakar-pathak"
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
                onClick={() => {
                  const el = document.querySelector(item.link);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  setActive(item.name);
                  setOpen(false);
                }}
                className={`group flex items-center gap-2 py-5 cursor-pointer transition-colors duration-200 ${
                  active === item.name
                    ? "text-white"
                    : "text-[#A8A9B4] hover:text-white"
                }`}
              >
                <span
                  className={`text-2xl transition-colors duration-200 ${
                    active === item.name
                      ? "text-blue-400"
                      : "group-hover:text-blue-400 text-[#A8A9B4]"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-Poppins text-[16px] ml-2">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
