import React from 'react';
import { ASSETS } from '../../config/assets';
import { Navigation, Package, MapPin } from 'lucide-react';

export function AppBanner() {
  return (
    <div className="w-[95%] md:w-[85%] lg:w-[72%] mx-auto my-4">
      <div className="bg-[#FCCDD4] rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row relative min-h-[500px]">
          <div className="w-full md:w-1/2 relative flex items-end justify-center">
            <img
              src={ASSETS.MOBILE_APP}
              alt="Mobile App Interface"
              className="w-[40%] md:w-[55%] relative z-10 translate-y-4"
            />
          </div>
          
          <div className="w-full md:w-1/2 flex items-center">
            <div className="p-6 md:p-12 w-full">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#8b1850] mb-4">
                APP'SOLUMENT INDISPENSABLE!
              </h2>
              
              <div className="h-1 w-20 bg-[#8b1850] mb-6"></div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Navigation className="w-5 h-5 text-[#8b1850] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-base md:text-lg">
                    Suivez vos colis en temps réel
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Package className="w-5 h-5 text-[#8b1850] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-base md:text-lg">
                    Envoyez vos colis facilement
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#8b1850] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-base md:text-lg">
                    Trouvez le Point Relais® proche
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="transform hover:scale-105 transition-transform"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Download on the App Store"
                    className="h-8 md:h-10"
                  />
                </a>
                <a 
                  href="#" 
                  className="transform hover:scale-105 transition-transform"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-8 md:h-10"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}