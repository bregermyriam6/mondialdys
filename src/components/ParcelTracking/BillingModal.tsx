import React from 'react';
import { X, AlertTriangle, Clock, MapPin } from 'lucide-react';
import { ASSETS } from '../../config/assets';

interface BillingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BillingModal({ isOpen, onClose }: BillingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl p-0 relative animate-modal-appear"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-red-50 rounded-t-2xl p-6 border-b border-red-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 p-2 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-red-600">
              Livraison échouée
            </h2>
          </div>
          <div className="flex justify-center">
            <img 
              src={ASSETS.LOGO}
              alt="Logo"
              className="h-12 mb-4"
            />
          </div>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-white/80 rounded-full p-1 backdrop-blur-sm transition-all hover:bg-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              Cher client,
            </h3>
            
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">
                Nous regrettons de vous informer que notre livreur est passé à votre domicile mais n'a pas pu effectuer la livraison de votre colis. Il est nécessaire de reprogrammer la livraison.
              </p>

              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                <MapPin className="w-5 h-5 text-[#96154a] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    Etat de votre colis
                  </p>
                  <p className="text-sm text-gray-600">
                    Votre colis est actuellement en attente de reprogrammation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-xl border border-amber-100">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-amber-800">
                    Délai de 24 heures
                  </p>
                  <p className="text-sm text-amber-700">
                    Sans reprogrammation de votre part, le colis sera retourné à l'expéditeur
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-[#96154a] text-white py-4 rounded-xl hover:bg-[#7d1240] transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg font-medium"
          >
            Fermer pour reprogrammer la livraison
          </button>
        </div>
      </div>
    </div>
  );
}