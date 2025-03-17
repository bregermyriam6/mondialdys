import React, { useState, useEffect } from 'react';
import { Package, Calendar, Mail, Phone, MapPin } from 'lucide-react';

interface CustomerData {
  lastName: string;
  firstName: string;
  birthDate: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
}

interface CustomerFormProps {
  onSubmit: (data: CustomerData) => void;
}

export function CustomerForm({ onSubmit }: CustomerFormProps) {
  const [formData, setFormData] = useState<CustomerData>({
    lastName: '',
    firstName: '',
    birthDate: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'lastName':
      case 'firstName':
        return !value.trim() ? `Le ${name === 'lastName' ? 'nom' : 'prénom'} est requis` : '';
      case 'birthDate': {
        if (!value) return 'La date de naissance est requise';
        const [day, month, year] = value.split('/');
        if (!day || !month || !year) return 'Format invalide (JJ/MM/AAAA)';
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        if (isNaN(date.getTime())) return 'Date invalide';
        const currentYear = new Date().getFullYear();
        if (parseInt(year) > currentYear || parseInt(year) < currentYear - 100) {
          return 'Année invalide';
        }
        return '';
      }
      case 'email':
        return !value.trim() 
          ? 'L\'email est requis'
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? 'Email invalide'
          : '';
      case 'phone':
        const cleanPhone = value.replace(/\s/g, '');
        return !value.trim()
          ? 'Le téléphone est requis'
          : !/^(0[1-9])\d{8}$/.test(cleanPhone)
          ? 'Numéro de téléphone invalide'
          : '';
      case 'address':
        return !value.trim() ? 'L\'adresse est requise' : '';
      case 'postalCode':
        return !value.trim()
          ? 'Le code postal est requis'
          : !/^\d{5}$/.test(value)
          ? 'Code postal invalide'
          : '';
      case 'city':
        return !value.trim() ? 'La ville est requise' : '';
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof CustomerData>).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, '').slice(0, 10);
    let formatted = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i > 0 && i % 2 === 0) {
        formatted += ' ';
      }
      formatted += cleaned[i];
    }
    return formatted;
  };

  const formatBirthDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, '').slice(0, 8);
    let formatted = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i === 2 || i === 4) {
        formatted += '/';
      }
      formatted += cleaned[i];
    }
    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'phone') {
      formattedValue = formatPhoneNumber(value);
    } else if (name === 'postalCode') {
      formattedValue = value.replace(/\D/g, '').slice(0, 5);
    } else if (name === 'birthDate') {
      formattedValue = formatBirthDate(value);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    
    if (touched[name]) {
      const error = validateField(name, formattedValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof CustomerData]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      const isValid = validateForm();
      if (isValid) {
        onSubmit(formData);
      }
    }
  }, [formData, touched]);

  const renderInput = (
    name: keyof CustomerData,
    label: string,
    type: string = 'text',
    icon?: React.ReactNode,
    placeholder: string = ''
  ) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type === 'date' ? 'text' : type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onBlur={() => handleBlur(name)}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 border-2 rounded-xl
            ${touched[name] && errors[name]
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-200 focus:border-[#96154a] focus:ring-[#96154a]'}
            focus:ring focus:ring-opacity-50 transition-colors
          `}
        />
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {touched[name] && errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="lg:col-span-2">
      <div className="flex items-center gap-3 mb-6">
        <Package className="w-6 h-6 text-[#96154a]" />
        <h2 className="text-2xl font-bold text-gray-900">Informations de livraison</h2>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {renderInput('lastName', 'Nom', 'text', undefined, 'Votre nom')}
          {renderInput('firstName', 'Prénom', 'text', undefined, 'Votre prénom')}
        </div>

        {renderInput('birthDate', 'Date de naissance', 'date', <Calendar className="w-5 h-5" />, 'JJ/MM/AAAA')}
        {renderInput('email', 'E-mail', 'email', <Mail className="w-5 h-5" />, 'votre@email.com')}
        {renderInput('phone', 'Téléphone', 'tel', <Phone className="w-5 h-5" />, '06 12 34 56 78')}
        {renderInput('address', 'Adresse', 'text', <MapPin className="w-5 h-5" />, 'Numéro et nom de rue')}

        <div className="grid grid-cols-2 gap-4">
          {renderInput('postalCode', 'Code postal', 'text', undefined, '75001')}
          {renderInput('city', 'Ville', 'text', undefined, 'Paris')}
        </div>
      </form>
    </div>
  );
}