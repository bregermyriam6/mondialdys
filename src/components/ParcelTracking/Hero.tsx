import React, { useState } from 'react';
import { Search, Package, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoadingScreen } from './LoadingScreen';

export function Hero() {
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const trackingNumber = 'N°764324233';

  const validateZipCode = (code: string) => {
    const zipCodeRegex = /^\d{5}$/;
    return zipCodeRegex.test(code);
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 5).replace(/\D/g, '');
    setZipCode(value);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateZipCode(zipCode)) {
      setError('Le code postal doit contenir 5 chiffres');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/billing');
    }, 3000);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Package className="w-12 h-12 text-[#96154a]" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Suivre un colis
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Votre colis est précieux pour nous, et tout comme nous, vous pouvez le suivre partout en un clic pour savoir où il se trouve.
          </p>

          <div className="bg-white rounded-xl shadow-xl p-8 max-w-6xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium flex items-center">
                      <span>{trackingNumber}</span>
                      <Package className="h-5 w-5 text-gray-400 ml-auto" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center space-x-2 bg-blue-50 p-2 rounded-lg border border-blue-100">
                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      Le numéro de colis est composé de 8 chiffres
                    </p>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={zipCode}
                      onChange={handleZipCodeChange}
                      maxLength={5}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring focus:ring-opacity-50 transition-colors
                        ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#96154a] focus:ring-[#96154a]'}`}
                      placeholder="Code postal du destinataire"
                    />
                    {error && (
                      <p className="absolute text-sm text-red-500 mt-1">{error}</p>
                    )}
                  </div>
                </div>

                <div className="md:flex-none">
                  <button
                    type="submit"
                    className="w-full md:w-auto h-12 px-8 bg-[#96154a] text-white rounded-lg hover:bg-[#7d1240] transition-all duration-300 flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
                  >
                    <Search className="w-5 h-5" />
                    <span>Rechercher</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center space-x-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <Info className="h-5 w-5 text-[#96154a] flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  Il vous suffit d'entrer votre numéro de colis / d'expédition / suivi (8 chiffres), avec le code postal du destinataire.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}