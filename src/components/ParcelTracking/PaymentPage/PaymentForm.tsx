import React from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';
import { useFormValidation } from '../../../hooks/useFormValidation';

interface PaymentFormProps {
  onSubmit: (data: any) => void;
  isProcessing: boolean;
}

export function PaymentForm({ onSubmit, isProcessing }: PaymentFormProps) {
  const {
    formData,
    errors,
    handleChange,
    validateForm,
    touched,
    setTouched
  } = useFormValidation({
    initialValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolder: ''
    },
    validationRules: {
      cardNumber: (value) => {
        if (!value) return 'Le numéro de carte est requis';
        if (!/^\d{16}$/.test(value.replace(/\s/g, ''))) return 'Numéro de carte invalide';
        return '';
      },
      expiryDate: (value) => {
        if (!value) return 'La date d\'expiration est requise';
        if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value)) return 'Date invalide (MM/YY)';
        return '';
      },
      cvv: (value) => {
        if (!value) return 'Le code de sécurité est requis';
        if (!/^\d{3}$/.test(value)) return 'Code de sécurité invalide';
        return '';
      },
      cardHolder: (value) => !value ? 'Le nom du titulaire est requis' : ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-6 h-6 text-[#96154a]" />
        <h2 className="text-2xl font-bold text-gray-900">Informations de paiement</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de carte
          </label>
          <div className="relative">
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              maxLength={19}
              value={formatCardNumber(formData.cardNumber)}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, '').slice(0, 16);
                handleChange({ target: { name: 'cardNumber', value } } as any);
              }}
              onBlur={() => handleBlur('cardNumber')}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring focus:ring-opacity-50 transition-colors ${
                touched.cardNumber && errors.cardNumber
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-200 focus:border-[#96154a] focus:ring-[#96154a]'
              }`}
              placeholder="1234 5678 9012 3456"
            />
            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          {touched.cardNumber && errors.cardNumber && (
            <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
              Date d'expiration
            </label>
            <div className="relative">
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                maxLength={5}
                value={formData.expiryDate}
                onChange={(e) => {
                  const value = formatExpiryDate(e.target.value);
                  handleChange({ target: { name: 'expiryDate', value } } as any);
                }}
                onBlur={() => handleBlur('expiryDate')}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring focus:ring-opacity-50 transition-colors ${
                  touched.expiryDate && errors.expiryDate
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                    : 'border-gray-200 focus:border-[#96154a] focus:ring-[#96154a]'
                }`}
                placeholder="MM/YY"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {touched.expiryDate && errors.expiryDate && (
              <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
            )}
          </div>

          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
              Code de sécurité
            </label>
            <div className="relative">
              <input
                type="text"
                id="cvv"
                name="cvv"
                maxLength={3}
                value={formData.cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                  handleChange({ target: { name: 'cvv', value } } as any);
                }}
                onBlur={() => handleBlur('cvv')}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring focus:ring-opacity-50 transition-colors ${
                  touched.cvv && errors.cvv
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                    : 'border-gray-200 focus:border-[#96154a] focus:ring-[#96154a]'
                }`}
                placeholder="123"
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {touched.cvv && errors.cvv && (
              <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
            Titulaire de la carte
          </label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleChange}
            onBlur={() => handleBlur('cardHolder')}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring focus:ring-opacity-50 transition-colors ${
              touched.cardHolder && errors.cardHolder
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-200 focus:border-[#96154a] focus:ring-[#96154a]'
            }`}
            placeholder="JEAN DUPONT"
          />
          {touched.cardHolder && errors.cardHolder && (
            <p className="mt-1 text-sm text-red-500">{errors.cardHolder}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full px-8 py-4 bg-[#96154a] text-white rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg font-medium flex items-center justify-center gap-2 ${
            isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[#7d1240]'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Traitement en cours...</span>
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              <span>Payer 1,99 €</span>
            </>
          )}
        </button>

        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Lock className="w-4 h-4" />
          <span>Paiement sécurisé SSL</span>
        </div>
      </form>
    </div>
  );
}