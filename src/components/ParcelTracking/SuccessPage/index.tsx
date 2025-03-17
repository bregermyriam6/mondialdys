import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { SecondaryNav } from '../SecondaryNav';
import { Footer } from '../Footer';
import { CheckCircle2, Package, MapPin, Calendar, Clock, Truck } from 'lucide-react';

export function SuccessPage() {
  const navigate = useNavigate();
  const customerData = JSON.parse(localStorage.getItem('customerData') || '{}');

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem('customerData');
    }, 5000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SecondaryNav />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 overflow-hidden">
          <div className="flex flex-col items-center mb-12 opacity-0 animate-[fadeIn_0.5s_ease-out_0.2s_forwards]">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping"></div>
              <div className="relative bg-green-500 rounded-full p-4">
                <CheckCircle2 className="w-12 h-12 text-white animate-success" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
              Paiement confirmé !
            </h1>
            <p className="text-gray-600 text-center">
              Votre colis sera reprogrammé pour livraison
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6 opacity-0 animate-[fadeIn_0.5s_ease-out_0.4s_forwards] translate-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#96154a]" />
                Informations de livraison
              </h2>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#96154a] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Adresse de livraison</p>
                    <p className="font-medium text-gray-900">
                      {customerData.firstName} {customerData.lastName}<br />
                      {customerData.address}<br />
                      {customerData.postalCode} {customerData.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#96154a] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Date de livraison estimée</p>
                    <p className="font-medium text-gray-900">
                      {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 opacity-0 animate-[fadeIn_0.5s_ease-out_0.6s_forwards] translate-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#96154a]" />
                Suivi du colis
              </h2>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-[#96154a] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Numéro de suivi</p>
                    <p className="font-medium text-gray-900">764324233</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Statut</p>
                    <p className="font-medium text-green-600">
                      Reprogrammation confirmée
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 opacity-0 animate-[fadeIn_0.5s_ease-out_0.8s_forwards] translate-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Prochaines étapes</h2>
            <div className="bg-blue-50 rounded-xl p-4 space-y-2">
              <p className="text-blue-800">
                • Vous recevrez un email de confirmation avec les détails de la livraison
              </p>
              <p className="text-blue-800">
                • Un SMS vous sera envoyé la veille de la livraison
              </p>
              <p className="text-blue-800">
                • Vous pouvez suivre votre colis avec le numéro de suivi fourni
              </p>
            </div>
          </div>

          <div className="mt-8 text-center opacity-0 animate-[fadeIn_0.5s_ease-out_1s_forwards] translate-y-4">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-[#96154a] text-white rounded-xl hover:bg-[#7d1240] transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}