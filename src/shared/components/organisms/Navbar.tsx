import {
  Home,
  FileText,
  UserPlus,
  Compass,
  Briefcase,
  ShoppingCart,
  Megaphone,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navList = [
    { name: 'Home', path: '/', icon: <Home /> },
    { name: 'Blogs', path: '/blogs', icon: <FileText /> },
    { name: 'Following', path: '/following', icon: <UserPlus /> },
    { name: 'Discover', path: '/discover', icon: <Compass /> },
    { name: 'Commissions', path: '/commissions', icon: <Briefcase /> },
    { name: 'Jobs', path: '/jobs', icon: <Megaphone /> },
    { name: 'Shop', path: '/shop', icon: <ShoppingCart /> },
  ];

  return (
    <nav className="bg-secondary container mx-auto px-10 py-6 rounded-[1.75rem] h-20 shadow-lg">
      <ul className="flex justify-center space-x-4">
        {navList.map((item) => (
          <li
            key={item.name}
            className="flex-1 flex flex-col items-center group"
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `relative flex flex-col items-center text-[#5A70A2] text-center space-y-1 hover:text-[#f5a97f] transition duration-300 ease-in-out ${
                  isActive ? 'text-red-500' : ''
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 ease-in-out">
                    <span className="mr-2">{item.icon}</span>
                    <span className="">{item.name}</span>
                  </div>
                  <div
                    className={`absolute -bottom-[6px] h-[2px] w-[50%] bg-red-500 transition-all duration-300 ease-in-out ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  ></div>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
