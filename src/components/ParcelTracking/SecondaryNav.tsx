import React, { useState } from 'react';
import { ShoppingCart, ChevronDown, Globe } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  flag: string;
}

export function SecondaryNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: 'FR',
    name: 'France',
    flag: '🇫🇷'
  });

  const countries: Country[] = [
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'BE', name: 'Belgique', flag: '🇧🇪' },
    { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' }
  ];

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  return (
    <div className="bg-[#96154a] h-12">
      <div className="w-full h-full flex justify-end items-center pr-8">
        <div className="flex items-center space-x-6">
          <button className="flex items-center text-white hover:text-gray-200 transition-colors font-['Montserrat_Alternates']">
            Connexion
          </button>

          <button className="flex items-center text-white hover:text-gray-200 transition-colors">
            <ShoppingCart className="w-5 h-5 mr-2" />
            <span className="font-medium">Mon Panier (0,00€)</span>
          </button>

          <div className="relative">
            <button 
              className="flex items-center text-white hover:text-gray-200 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Globe className="w-5 h-5 mr-2" />
              <span className="font-medium">
                {selectedCountry.name}
              </span>
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountrySelect(country)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span className="text-lg mr-2">{country.flag}</span>
                    {country.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}