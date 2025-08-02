import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { RiDashboardFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router";

const SideNavItems = {
  Dashboard: {
    text: 'Dashboard',
    icon: <RiDashboardFill size={20} className="mr-4" />,
    link: '/gym/member/dashboard',
  },
  Profile: {
    text: 'Profile',
    icon: <CgProfile size={20} className="mr-4" />,
    link: '/gym/member/profile/view',
  },
}

const navItemUrlMap: Record<string, keyof typeof SideNavItems> = {
  '/gym/member/dashboard': 'Dashboard',
  '/gym/member/profile/*': 'Profile',
}

// function to match above navItemUrlMap key
const matchNavItemUrl = (url: string) => {
  const keys = Object.keys(navItemUrlMap);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const regex = new RegExp(key.replace('*', '.*'));
    if (regex.test(url)) {
      return navItemUrlMap[key];
    }
  }
  return null;
}

const MemberSideNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState<keyof typeof SideNavItems>('Dashboard');

  const location = useLocation();

  useEffect(() => {
    setSelectedNavItem(matchNavItemUrl(location.pathname) || 'Dashboard');
  }, [location]);

  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`p-3 fixed top-0 left-0 h-full bg-primary text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-30 lg:translate-x-0`}
      >
        <div className="flex justify-between lg:justify-center p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold">My App</h1>
          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={toggleSidenav}
          >
            ✕
          </button>
        </div>
        <nav className="mt-6 min-h-screen flex flex-col justify-between mx-3">
          <ul className="space-y-2">
            {(Object.keys(SideNavItems) as (keyof typeof SideNavItems)[]).map(navItemKey => <li
              key={navItemKey}
            >
              <Link
                to={SideNavItems[navItemKey].link}
                className={`text-sm px-4 py-3 mb-3 rounded-sm flex hover:scale-105 transform transition duration-200 hover:text-blue-200 ${selectedNavItem === navItemKey ? 'bg-secondary rounded-xl text-quaternary hover:text-tertiary font-semibold' : ''}`}
              >
                {SideNavItems[navItemKey].icon}
                {SideNavItems[navItemKey].text}
              </Link>
            </li>)}
          </ul>
          <ul className="mb-36">
            <li>
              <span
                className="flex px-4 text-sm py-2 cursor-pointer rounded-sm hover:scale-105 transform transition duration-200 hover:text-red-200"
                onClick={() => {
                  localStorage.removeItem("sctoken");
                  window.location.href = "/";
                }}
              >
                <FiLogOut size={20} className="mr-4" />
                Logout
              </span>
            </li>
          </ul>
        </nav>
      </div>
      <button
        className={`p-4 text-gray-800 lg:hidden z-50 top-0 fixed ${isOpen ? 'hidden' : 'block'}`}
        onClick={toggleSidenav}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
    </>
  );
};

export default MemberSideNav;
