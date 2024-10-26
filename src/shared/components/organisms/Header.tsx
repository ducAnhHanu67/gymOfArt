import { useState } from 'react';
import { Search, Coffee, ChevronDown, Bell, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="bg-primary text-white h-[80px] relative">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/">
            <h1 className="text-3xl font-bold text-[#f5a97f]">GoA</h1>
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#2c2c3f] text-white pl-12 pr-4 py-3 rounded-full w-80 focus:outline-none focus:ring-2 focus:ring-[#f5a97f] transition duration-300 ease-in-out"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#f5a97f] transition duration-300 ease-in-out hover:text-[#f7c5a5]"
              size={20}
            />
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 bg-[#f5a97f] text-primary px-4 py-2 rounded-full text-base font-medium transition duration-300 ease-in-out hover:bg-[#f7c5a5]">
            <Coffee size={18} />
            <span>Buy GoA a coffee</span>
          </button>
          <button className="flex items-center space-x-2 transition duration-300 ease-in-out hover:text-[#f5a97f]">
            <img
              src="/placeholder.svg?height=24&width=24"
              alt="English flag"
              className="w-6 h-6 rounded-full"
            />
            <span>English</span>
            <ChevronDown size={18} />
          </button>
          <button className="transition duration-300 ease-in-out hover:text-[#f5a97f] rounded-full bg-gray-700 hover:bg-gray-800 p-2">
            <Bell size={24} />
          </button>
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="transition duration-300 ease-in-out hover:text-[#f5a97f] rounded-full bg-gray-700 hover:bg-gray-800 p-2"
            >
              <User size={24} />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#2c2c3f] text-white rounded-lg shadow-lg py-2 z-50">
                <Link to="/library" className="block px-4 py-2 hover:bg-[#3c3c4f]">My library</Link>
                <Link to="/store" className="block px-4 py-2 hover:bg-[#3c3c4f]">My store</Link>
                <Link to="/buy-coffee" className="block px-4 py-2 hover:bg-[#3c3c4f]">Buy GoA a coffee</Link>
                <Link to="/logout" className="block px-4 py-2 hover:bg-[#3c3c4f]">Log Out</Link>
              </div>
            )}
          </div>
          <button className="transition duration-300 ease-in-out hover:text-[#f5a97f]">
            <Menu size={24} />
          </button>
        </div>
      </div>
      <div className="container mx-auto">
        <hr className="border-t-[1px] border-gray-400 opacity-50 mt-2" />
      </div>
    </header>
  );
}
