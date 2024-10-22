import { Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1b1c24] text-white py-8 px-4 border-t border-[#37B6BD]">
      <div className="container mx-auto flex flex-wrap justify-between">
        {/* Logo and Brand */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <div className="flex items-center mb-2">
            <svg className="w-12 h-12 mr-2" viewBox="0 0 48 48">
              <polygon
                points="24,4 36,12 36,36 24,44 12,36 12,12"
                fill="#37B6BD"
              />
              <rect x="18" y="16" width="12" height="4" fill="#FFF3E0" />
              <rect x="18" y="24" width="12" height="4" fill="#FFF3E0" />
              <rect x="18" y="32" width="12" height="4" fill="#FFF3E0" />
            </svg>
            <div>
              <h2 className="text-4xl font-bold text-[#E73C3C]">GoA</h2>
              <p className="text-[#37B6BD] text-sm">GYM OF ART</p>
            </div>
          </div>
        </div>

        {/* Links Columns */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">About Us</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="#"
                className="hover:text-[#E73C3C] transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-[#E73C3C] transition-colors duration-300"
              >
                Follow Us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-[#E73C3C] transition-colors duration-300"
              >
                <Facebook size={20} className="inline-block mr-2" />
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="#"
                className="hover:text-[#E73C3C] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-[#E73C3C] transition-colors duration-300"
              >
                Copyright Policy
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-[#E73C3C] transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-[#E73C3C] transition-colors duration-300"
              >
                Get Help
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-2">More</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="#"
                className="hover:text-[#E73C3C] transition-colors duration-300"
              >
                Daily News
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-[#E73C3C] transition-colors duration-300"
              >
                Become a Premium GoA
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>All rights reserved</p>
        <p>@2024GymOfArt</p>
      </div>
    </footer>
  );
}
