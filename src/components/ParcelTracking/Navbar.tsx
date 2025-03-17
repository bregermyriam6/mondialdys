import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ASSETS } from '../../config/assets';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { text: 'Suivi colis', active: true },
    { text: 'Envoi colis' },
    { text: 'Point Relais® et Lockers' },
    { text: 'Aide' },
    { text: 'Solutions Pro' },
  ];

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="w-full">
        <div className="flex h-16 md:h-20 items-center justify-between px-4 md:px-8">
          <div className="flex items-center">
            <img 
              src={ASSETS.LOGO}
              alt="Logo"
              className="h-8 md:h-12 w-auto"
            />
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#96154a] hover:text-[#ff5c84]"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`px-3 py-2 text-base font-medium transition-all duration-200 font-['Montserrat_Alternates']
                  ${item.active 
                    ? 'text-[#ff5c84] border-b-4 border-[#ff5c84]' 
                    : 'text-[#96154a] hover:text-[#ff5c84] hover:border-b-4 hover:border-[#ff5c84]'
                  }`}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`w-full px-4 py-3 text-base font-medium transition-all duration-200 font-['Montserrat_Alternates']
                  ${item.active 
                    ? 'text-[#ff5c84] bg-gray-50' 
                    : 'text-[#96154a] hover:text-[#ff5c84] hover:bg-gray-50'
                  }`}
              >
                {item.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}