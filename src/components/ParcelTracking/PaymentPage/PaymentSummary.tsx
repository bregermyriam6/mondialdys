import React from 'react';
import { Package, Clock, MapPin, AlertCircle } from 'lucide-react';

export function PaymentSummary() {
  const customerData = JSON.parse(localStorage.getItem('customerData') || '{}');

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-100">
      <div className="relative flex justify-center mb-12">
        <div className="absolute -top-12 bg-gradient-to-br from-[#96154a] to-[#7d1240] rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-all duration-300 group">
          <Package className="w-8 h-8 text-white transform group-hover:rotate-12 transition-transform" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <div className="absolute -left-2 top-0 bottom-0 w-1 bg-amber-200 rounded-full" />
          <div className="bg-gradient-to-r from-amber-50 to-white rounded-xl p-4 shadow-sm border border-amber-100">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2.5 rounded-xl">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-0.5">
                  État actuel
                </p>
                <p className="font-medium text-amber-700">
                  En attente de paiement
                </p>
              </div>
            </div>
          </div>
        </div>

        {customerData.address && (
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg mt-0.5">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-900 mb-1">
                  Adresse de livraison
                </p>
                <p className="text-sm text-blue-700">
                  {customerData.firstName} {customerData.lastName}<br />
                  {customerData.address}<br />
                  {customerData.postalCode} {customerData.city}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Frais de reprogrammation</span>
              <span className="font-semibold">1,99 €</span>
            </div>
          </div>

          <div className="bg-[#96154a]/5 rounded-xl p-4 border border-[#96154a]/10">
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#96154a]">Total à payer</span>
              <span className="text-xl font-bold text-[#96154a]">1,99 €</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-white rounded-xl p-4 border border-red-100">
          <div className="flex items-start gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-red-900 mb-1">
                Délai de paiement
              </p>
              <p className="text-sm text-red-700">
                Veuillez effectuer le paiement dans les plus brefs délais pour éviter le retour du colis à l'expéditeur
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}