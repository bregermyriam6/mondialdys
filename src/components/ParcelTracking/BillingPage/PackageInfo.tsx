import React from 'react';
import { Package, Clock, Flag, Truck, MapPin, AlertCircle } from 'lucide-react';

export function PackageInfo() {
  return (
    <div className="lg:col-span-1">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-100">
        <div className="relative flex justify-center mb-12">
          <div className="absolute -top-12 bg-gradient-to-br from-[#96154a] to-[#7d1240] rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-all duration-300">
            <Package className="w-8 h-8 text-white transform hover:rotate-12 transition-transform" />
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
                    En attente de reprogrammation
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#96154a]/5 p-2.5 rounded-xl">
                    <Flag className="w-5 h-5 text-[#96154a]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">
                      Destination
                    </p>
                    <p className="font-medium text-gray-900">France</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <Truck className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">
                    N° de suivi
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">764324233</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#96154a]/10 text-[#96154a]">
                      Actif
                    </span>
                  </div>
                </div>
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
                  Délai de 24 heures
                </p>
                <p className="text-sm text-red-700">
                  Sans reprogrammation, le colis sera retourné à l'expéditeur
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}